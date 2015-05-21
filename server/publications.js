Meteor.publish('dropzones', function() {
  return Dropzones.find();
});

Meteor.publish('vtr', function() {
  return Vtr.find();
});