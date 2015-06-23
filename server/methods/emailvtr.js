Meteor.methods({
  emailVtr: function (newVtrDoc) {
    useremail =  Meteor.users.findOne(newVtrDoc.createdBy).emails[0].address;
    this.unblock();
    Email.send({
      from: "Vaaratilanneilmoitus <no-reply@laskuvarjotoimikunta.fi>",
      to: useremail,
      subject: "Uusi vaaratilanneilmoitus tehty",
      text: "Uusi vaaratilanneilmoitus tehty.\n" +
            "Ilmoitus nähtävissä osoitteessa " + Meteor.absoluteUrl() + 'vtr/' + newVtrDoc._id + "\n"
    });
    return true;
  }
});