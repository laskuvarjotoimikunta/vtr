(function(){Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

// Static pages

Router.route('/', {name: 'home'});

Router.route('/about', {name: 'about'});

// Dropbox

Router.route('/vtr', {name: 'vtr'});

})();
