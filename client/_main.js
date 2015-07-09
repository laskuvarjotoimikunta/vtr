Meteor.subscribe('dropzones');

Meteor.subscribe('myVtrs'); // subscribe to vtrs user has created

Meteor.subscribe('dzVtrs'); // subscribe to vtrs where user is (vice) head of training/safety


$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});