AutoForm.hooks({
  editVtr: {
    onSuccess: function(operation, result) {
      Meteor.call('emailVtr', this.docId, operation);
      FlashMessages.sendSuccess('Ilmoitusta muokattu onnistuneesti, sähköposti lähetetty.');
      Router.go('viewVtr',{_id: this.docId});
    }, 
  }
});