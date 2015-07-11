Meteor.methods({
  emailVtr: function (newVtrDoc, operation) {
    if (operation==='update') { 
        var emailSubject = 'Vaaratilanneilmoitusta muokattu';
        var emailBody = 'Vaaratilanneilmoitusta on muokattu.';
    }
    else {
        var emailSubject = 'Uusi vaaratilanneilmoitus tehty';
        var emailBody = 'Uusi vaaratilanneilmoitus on tehty.';
    };
    useremail =  Meteor.users.findOne(this.userId).emails[0].address;
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
      subject: emailSubject,
      text: emailBody + 
            "\n\n" +
            "Ilmoitus nähtävissä (kirjautumisen jälkeen) osoitteessa " + Meteor.absoluteUrl() + 'vtr/' + newVtrDoc._id + "\n"
    });
    return true;
  }
});