Template.navbar.events({
    'click #logout': function(e,tmpl) {
    Meteor.logout(function (err, res) {
      console.log('logout answered', arguments);
      if(err)
        Session.set('loginPasswordlessMessage', err.error);
      else {
        Session.set('loginPasswordlessMessage', '');
        Session.set('loginPasswordlessState', 'loginPasswordlessLogin');
      }
    });
    }
});
