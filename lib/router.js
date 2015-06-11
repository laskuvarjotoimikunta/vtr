(function(){Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

// Static pages

Router.route('/', {name: 'home'});

Router.route('/about', {name: 'about'});

Router.route('/vtr/new', {name: 'newVtr'});

Router.route('/vtr/list', {name: 'listVtr'});

Router.route('/vtr/:_id', {
  name: 'viewVtr',
  data: function() { return Vtr.findOne(this.params._id);}
});

Router.route('/vtr/:_id/edit', {
  name: 'editVtr',
  data: function() { return Vtr.findOne(this.params._id);}
});
})();

// Pages that need login

var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
      if (! Meteor.userId()) {
        this.render('home');
      } else {
        this.next();
      }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['newVtr', 'editVtr', 'viewVtr', 'listVtr']
});