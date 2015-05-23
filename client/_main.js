Meteor.subscribe('dropzones');

Meteor.subscribe('vtr');

Meteor.subscribe('files');

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});