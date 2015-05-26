Template.navbar.events({
    'click #logout': function(e,tmpl) {
      Meteor.logout();
    }
});
