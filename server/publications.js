Meteor.publish('dropzones', function() { // publish dropzones to everyone who are logged in
  if (!this.userId) {
            return this.ready();
        }
  return Dropzones.find();
});

Meteor.publish('myVtrs', function() { // publish vtrs created by user him/herself
  var currentUserId = this.userId;
  if (currentUserId) {
    return Vtr.find({createdBy: currentUserId}, {sort: {date: -1}});
  } else {
    this.ready();
  }
});

Meteor.publish('dzVtrs', function() { // publish vtrs created at dropzone user is responsible at
  if (!this.userId) {
            return this.ready();
        }
  var currentUserEmail = Meteor.users.findOne(this.userId).emails[0].address;
  var currentUserDzs = Dropzones.find({$or:[
                        {headOfTraining: currentUserEmail},
                        {viceHeadOfTraining: currentUserEmail},
                        {headOfSafety: currentUserEmail}]}).fetch();
  var currentUserDzIds = _.map(currentUserDzs,function (value){ return value._id;});
  if (currentUserDzIds) { 
    return Vtr.find({happenedDz: {$in: currentUserDzIds}}, {fields: {phoneNumber: 0, age: 0}, sort: {date: -1}});
  } else {
    this.ready();
  }
});

Meteor.publish('AllVtrs', function() { // publish all vtrs to admins
  if (Roles.userIsInRole(this.userId,['admin'])) { 
    return Vtr.find({}, {sort: {date: -1}}); 
  } else { 
    this.ready(); 
  }
});