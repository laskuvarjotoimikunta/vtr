Meteor.publish('dropzones', function() {
  return Dropzones.find();
});

Meteor.publish('vtr', function() {
  var currentUserId = this.userId;
  return Vtr.find({createdBy: currentUserId});
});

Meteor.publish('files', function() {
  return Files.find();
});