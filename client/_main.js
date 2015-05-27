Meteor.subscribe('dropzones');

Meteor.subscribe('files');

Meteor.subscribe('vtr'); // when published only vtrs by userid's, this can be probably done like this

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});