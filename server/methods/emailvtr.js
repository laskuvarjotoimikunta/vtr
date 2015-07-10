Meteor.methods({
  emailVtr: function (newVtrDoc) {
    useremail =  Meteor.users.findOne(newVtrDoc.createdBy).emails[0].address;
    var ccs = [];
    ccs.push(Dropzones.findOne(newVtrDoc.happenedDz).headOfTraining);
    ccs.push(Dropzones.findOne(newVtrDoc.happenedDz).headOfSafety);
    ccs.push(Dropzones.findOne(newVtrDoc.happenedDz).viceHeadOfTraining);
    ccs.push(adminemails);
    this.unblock();
    Email.send({
      from: "Vaaratilanneilmoitus <no-reply@laskuvarjotoimikunta.fi>",
      to: useremail,
      cc: ccs.join(";"),
      subject: "Uusi vaaratilanneilmoitus tehty",
      text: "Uusi vaaratilanneilmoitus tehty (tai muokattu).\n\n" +
            "Ilmoitus nähtävissä (kirjautumisen jälkeen) osoitteessa " + Meteor.absoluteUrl() + 'vtr/' + newVtrDoc._id + "\n"
    });
    return true;
  }
});