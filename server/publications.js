Meteor.publish('dropzones', function() {
  return Dropzones.find();
});

Meteor.publish('myVtrs', function() {
  var currentUserId = this.userId;
  return Vtr.find({createdBy: currentUserId});
});