Meteor.startup(function () {
  // list people who are admins
  adminemails = [
    'jari.lehti@ilmailuliitto.fi',                // SIL lajipäällikkö
    'johanna.huhtapelto@laskuvarjotoimikunta.fi', // LT pj
    'henri.tyrvainen@laskuvarjotoimikunta.fi',    // LT vpj
    'timo.kokkonen@pp3.inet.fi',                  // LT turvallisuusvastaava
    'kpaulara@paju.oulu.fi'                       // Vuosikoosteen tekijä
    ];

  // add everyone one adminemails to admin role
  _.each(adminemails, function(email) { 
    if (Meteor.users.findOne({ emails: {$elemMatch: { address: email } } })) // if user has already registered
      {
        var userId = Meteor.users.findOne({ emails: {$elemMatch: { address: email } } })._id;
        Roles.addUsersToRoles(userId,['admin'], Roles.GLOBAL_GROUP);
      }
  });
});
