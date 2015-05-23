Meteor.publish('dropzones', function() {
  return Dropzones.find();
});

Meteor.publish('vtr', function() {
  return Vtr.find();
});

Meteor.publish('files', function() {
  return Files.find();
});