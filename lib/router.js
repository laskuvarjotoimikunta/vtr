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


})();
