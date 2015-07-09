Template.listVtr.helpers({ 
  ownVtr: function() {
    return Vtr.find({createdBy: Meteor.userId()},{sort: {date: -1}});
  },
  dzVtr: function() {
      var currentUserEmail = Meteor.users.findOne(Meteor.userId()).emails[0].address;
      var currentUserDzs = Dropzones.find({$or:[
                        {headOfTraining: currentUserEmail},
                        {viceHeadOfTraining: currentUserEmail},
                        {headOfSafety: currentUserEmail}]}).fetch();
      var currentUserDzIds = _.map(currentUserDzs,function (value){ return value._id;});
      return Vtr.find({happenedDz: {$in: currentUserDzIds}},{sort: {date: -1}});
  }
});