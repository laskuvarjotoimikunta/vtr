AutoForm.hooks({
  newVtr: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      FlashMessages.sendSuccess('Vaaratilanneraportti lähetetty.');
      Router.go('listVtr');
    }, 
  }
});

Template.newVtr.helpers({
  nameHelper: function() {
    // fill first name and last name
   return Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;
  }
});

Template.newVtr.events({
    'click #today': function(event) {
        event.stopPropagation();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd} 
        if(mm<10){mm='0'+mm} 
        today = yyyy+'-'+mm+'-'+dd;  
        $('input[name=date]').val(today);
        return true;
    },
    'click #yesterday': function(event) {
        event.stopPropagation();
        var today = new Date();
        var yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        var dd = yesterday.getDate();
        var mm = yesterday.getMonth()+1;
        var yyyy = yesterday.getFullYear();
        if(dd<10){dd='0'+dd} 
        if(mm<10){mm='0'+mm} 
        yesterday = yyyy+'-'+mm+'-'+dd;  
        $('input[name=date]').val(yesterday);
        return true;
    },  
});