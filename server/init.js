//Initialize upload-server
Meteor.startup(function () {
  UploadServer.init({
    tmpDir: '/srv/vtr_uploads/tmp/',
    uploadDir: '/srv/vtr_uploads/',
    checkCreateDirectories: true //create the directories for you
  })
});

adminemails = [
  'jari.lehti@ilmailuliitto.fi',                // SIL lajipäällikkö
  'johanna.huhtapelto@laskuvarjotoimikunta.fi', // LT pj
  'henri.tyrvainen@laskuvarjotoimikunta.fi',    // LT vpj
  'mari.lehtonen@laskuvarjotoimikunta.fi'       // LT turvallisuusvastaava
  ];

// add everyone one adminemails to admin role
_.each(adminemails, function(email) { 
  if (Meteor.users.findOne({ emails: {$elemMatch: { address: email } } })) // if user has already registered
    {
      var userId = Meteor.users.findOne({ emails: {$elemMatch: { address: email } } })._id;
      Roles.addUsersToRoles(userId,['admin'], Roles.GLOBAL_GROUP);
    }
})