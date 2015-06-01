//Initialize upload-server
Meteor.startup(function () {
  UploadServer.init({
    tmpDir: '/srv/vtr_uploads/tmp/',
    uploadDir: '/srv/vtr_uploads/',
    checkCreateDirectories: true //create the directories for you
  })
});