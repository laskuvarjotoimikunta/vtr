Accounts.passwordless = {};

if (Meteor.isClient) {
  /**
   * Request a verification code.
   * @param selector The email or username of the user
   * @param [callback]
   */
  Meteor.sendVerificationCode = function (selector, options, callback) {
    if (!callback && typeof options === 'function')
      callback = options;

    // Save the selector in a Session so even if the client reloads, the selector is stored
    Session.set('accounts-passwordless.selector', selector);
    Meteor.call('accounts-passwordless.sendVerificationCode', selector, options, callback);
  };

  /**
   * Login with the verification code.
   * @param options code The verification code. selector The username or email (optional)
   * @param [callback]
   */
  Meteor.loginWithPasswordless = function (options, callback) {
    console.log('lwpl', options);
    Accounts.callLoginMethod({
      methodArguments: [{
        selector: Session.get('accounts-passwordless.selector') || options.selector,
        code: options.code
      }],
      userCallback: callback
    });
  };

  /**
   * Set firstname and lastname. The user must be logged
   * @param firstname First name of user
   * @param lastname Lat name of user
   * @param [callback]
   */
  Meteor.setFirstNameLastName = function (firstname, lastname, callback) {
    Meteor.call('accounts-passwordless.setFirstNameLastName', firstname, lastname, callback);
  };

}


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


if(Meteor.isServer) {

  Accounts.passwordless.emailTemplates = {
    from: "Vaaratilanneilmoitus <no-reply@laskuvarjotoimikunta.fi>",
    siteName: Meteor.absoluteUrl().replace(/^https?:\/\//, '').replace(/\/$/, ''),

    sendVerificationCode: {
      subject: function (code) {
        return "Kirjautumiskoodisi vaaratilanneilmoituskoneeseen on " + code + ".";
      },
      text: function (user, code) {
        var greeting = "Hei,";
        return greeting + "\n"
          + "\n"
          + "Kirjautumiskoodisi " + code + ".\n"
          + "\n"
          + "Blue skies.\n";
      }
    }
  };

  Meteor.methods({
    'accounts-passwordless.sendVerificationCode': function (selector, options) {
      check(selector, String);
      check(options, Match.Optional(Match.Any));
      Accounts.passwordless.sendVerificationCode(selector, options);
    },
    'accounts-passwordless.setFirstNameLastName': function (firstname,lastname) {
      check(firstname, String);
      check(lastname, String);
      if(!this.userId) throw new Meteor.Error('Sinun tulee olla kirjautunut.');
      if(firstname.length < 2) throw new Meteor.Error('Etunimesi lienee pidempi');
      if(lastname.length < 2) throw new Meteor.Error('Sukunimesi lienee pidempi');
      Meteor.users.update(this.userId, { $set: { profile: {firstName: firstname, lastName: lastname }} });
    }
  });

  // Handler to login with passwordless
  Accounts.registerLoginHandler('passwordless', function (options) {
    if (options.code === undefined) return undefined; // don't handle

    check(options, {
      selector: String,
      code: String
    });

    if(!options.selector) throw new Meteor.Error('No selector setuped');

    return Accounts.passwordless.verifyCode(options.selector, options.code);
  });

  var codes = new Meteor.Collection('meteor_accounts_passwordless');

  /**
   * Send a 4 digit verification code by email
   * @param selector The email or username of the user
   */
  Accounts.passwordless.sendVerificationCode = function (selector, options) {
    var email;
    user = Meteor.users.findOne({ 'emails.address': selector });
    // If the user doesn't exists, we'll create it when the user will verify his email
    email = selector;

    var code = Math.floor(Random.fraction() * 1000000) + '';
    // force pin to 4 digits
    code = ('000000' + code).slice(-6);

    // Generate a new code
    codes.upsert({ email: email }, { $set: { code: code }});

    Email.send({
      to: email,
      from: Accounts.passwordless.emailTemplates.from,
      subject: Accounts.passwordless.emailTemplates.sendVerificationCode.subject(code),
      text: Accounts.passwordless.emailTemplates.sendVerificationCode.text(user, code, selector, options)
    });
  };

  // from accounts-password code
  var createUser = function (options) {
    // Unknown keys allowed, because a onCreateUserHook can take arbitrary
    // options.
    check(options, Match.ObjectIncluding({
      username: Match.Optional(String),
      email: Match.Optional(String),
    }));

    var username = options.username;
    var email = options.email;
    if (!username && !email)
      throw new Meteor.Error(400, "Need to set a username or email");

    var user = {services: {}};
    if (options.password) {
      var hashed = hashPassword(options.password);
      user.services.password = { bcrypt: hashed };
    }

    if (username)
      user.username = username;
    if (email)
      user.emails = [{address: email, verified: false}];

    return Accounts.insertUserDoc(options, user);
  };


  /**
   * Verify if the code is valid
   * @param selector The email or username of the user
   * @param code The code the user entered
   */
  Accounts.passwordless.verifyCode = function (selector, code) {
    var email;
    user = Meteor.users.findOne({ 'emails.address': selector });
    email = selector;

    var validCode = codes.findOne({ email: email});
    if (!validCode)
      throw new Meteor.Error('Tuntematon sähköposti');

    var now = new Date().getTime() / 1000;
    var timeToWait;

    if (validCode.lastTry) {
      timeToWait = validCode.lastTry.getTime()/1000 + Math.pow(validCode.nbTry, 2);

      if (timeToWait > now)
        throw new Meteor.Error('Sinun tulee odottaa ' + Math.ceil(timeToWait - now) + ' sekuntia');
    }

     if (validCode.code !== code) {
      codes.update({email: email}, { $set: {lastTry: new Date()}, $inc: {nbTry: 1 }});
      throw new Meteor.Error('Väärä kirjautumiskoodi');
    }
    // Clear the verification code after a succesful login.
    codes.remove({ email: email });

    var uid;
    if(user) {
      uid = user._id;
    } else {
      uid = createUser({ email: email });
      user = Meteor.users.findOne(uid);
      console.log('user created ', uid, user);
    }

    if(user) {
      // Set the email as verified since he validated the code with this email
      var ve = _.find(user.emails, function (e) { return e.address === email; });
      if(ve && !ve.verified) {
        // By including the address in the query, we can use 'emails.$' in the
        // modifier to get a reference to the specific object in the emails
        // array. See
        // http://www.mongodb.org/display/DOCS/Updating/#Updating-The%24positionaloperator)
        // http://www.mongodb.org/display/DOCS/Updating#Updating-%24pull
        Meteor.users.update({ _id: uid, 'emails.address': email }, { $set: { 'emails.$.verified': true } });
      }
    }
    return { userId: uid };
  };


}
