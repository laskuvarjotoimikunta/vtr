Meteor.subscribe('dropzones');

Meteor.subscribe('myVtrs'); // when published only vtrs by userid's, this can be probably done like this

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});