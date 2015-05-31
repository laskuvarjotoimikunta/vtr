// set to false to skip the form asking the first name and last name
var loginPasswordlessAskFirstNameLastName = true;

Session.setDefault('loginPasswordlessMessage', '');
Session.setDefault('loginPasswordlessState', 'loginPasswordlessLogin');

Tracker.autorun(function () {
  var user = Meteor.user();
  if(user) {
    if(user.username || !loginPasswordlessAskFirstNameLastName)
      Session.set('loginPasswordlessState', 'loginPasswordlessLogout');
    else
      Session.set('loginPasswordlessState', 'loginPasswordlessAskFirstNameLastName');
  }
});

///

Template.registerHelper('loginPasswordlessMessage', function () {
  return Session.get('loginPasswordlessMessage');
});

Template.loginPasswordless.helpers({
  loginPasswordlessState: function () {
    return Session.get('loginPasswordlessState');
  }
});

Template.loginPasswordlessLogin.events({
  'submit #loginPasswordlessLogin': function (event) {
    document.getElementById("continueButton").disabled=true;
    Session.set('loginPasswordlessMessage', 'Vahvistuskoodia lähetetään..');
    var selector = event.target.selector.value.toLowerCase();
    console.log('login', selector);
    Meteor.sendVerificationCode(selector, function (err, res) {
      console.log('sendVerificationCode answered', arguments);
      if(err)
        Session.set('loginPasswordlessMessage', err.error);
      else {
        Session.set('loginPasswordlessMessage', '');
        Session.set('loginPasswordlessState', 'loginPasswordlessVerify');
      }
    });
    return false;
  }
});

///

Template.loginPasswordlessVerify.events({
  'submit #loginPasswordlessVerify': function (event) {
    var code = event.target.code.value;
    console.log('verify', code);
    Meteor.loginWithPasswordless({ code: code }, function (err, res) {
      console.log('loginWithPasswordless answered', arguments);
      if(err)
        Session.set('loginPasswordlessMessage', err.error);
      else {
        Session.set('loginPasswordlessMessage', '');
        if(loginPasswordlessAskFirstNameLastName && !Meteor.user().profile)
          Session.set('loginPasswordlessState', 'loginPasswordlessAskFirstNameLastName');
        else
          Session.set('loginPasswordlessState', 'loginPasswordlessLogout');
      }
    });
    return false;
  },
  'click #loginPasswordlessVerifyBack': function (event) {
    Session.set('loginPasswordlessMessage', '');
    Session.set('loginPasswordlessState', 'loginPasswordlessLogin');
  },
});

///

Template.loginPasswordlessAskFirstNameLastName.events({
  'submit #loginPasswordlessAskFirstNameLastName': function (event) {
    console.log('jee');
    var firstname = event.target.firstname.value;
    var lastname = event.target.lastname.value;
    console.log('firstname', firstname);
    console.log('lastname', lastname);
    Meteor.setFirstNameLastName(firstname, lastname, function (err, res) {
      console.log('setFirstname and Lastname answered', arguments);
      if(err)
        Session.set('loginPasswordlessMessage', err.error);
      else {
        Session.set('loginPasswordlessMessage', '');
        Session.set('loginPasswordlessState', 'loginPasswordlessLogout');
      }
    });
    return false;
  }
});


///

Template.loginPasswordlessLogout.helpers({
  loginPasswordlessUserInfo: function () {
    var user = Meteor.user();
    if(!user) return '';
    if(user.profile.firstName) return user.profile.firstName + ' ' + user.profile.lastName;
    else if(user.emails && user.emails.length > 0) return user.emails[0].address;
    else return user._id;
  }
});

Template.loginPasswordlessLogout.events({
  'submit #loginPasswordlessLogout': function (event) {
    console.log('logout');
    Meteor.logout(function (err, res) {
      console.log('logout answered', arguments);
      if(err)
        Session.set('loginPasswordlessMessage', err.error);
      else {
        Session.set('loginPasswordlessMessage', '');
        Session.set('loginPasswordlessState', 'loginPasswordlessLogin');
      }
    });
    return false;
  }
});
