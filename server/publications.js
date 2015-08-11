Meteor.publish('dropzones', function() {
  return Dropzones.find();
});

Meteor.publish('myVtrs', function() {
  var currentUserId = this.userId;
  return Vtr.find({createdBy: currentUserId}, {sort: {date: -1}});
});

Meteor.publish('dzVtrs', function() {
  var currentUserEmail = Meteor.users.findOne(this.userId).emails[0].address;
  var currentUserDzs = Dropzones.find({$or:[
                        {headOfTraining: currentUserEmail},
                        {viceHeadOfTraining: currentUserEmail},
                        {headOfSafety: currentUserEmail}]}).fetch();
  var currentUserDzIds = _.map(currentUserDzs,function (value){ return value._id;});
  return Vtr.find({happenedDz: {$in: currentUserDzIds}}, {fields: {phoneNumber: 0, age: 0}, sort: {date: -1}});
});

Meteor.publish('AllVtrs', function() { // publish all vtrs to admins
  if (Roles.userIsInRole(this.userId,['admin'])) { return Vtr.find({}, {sort: {date: -1}}); } else { return true; }
});