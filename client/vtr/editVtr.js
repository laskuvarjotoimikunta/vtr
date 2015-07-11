AutoForm.hooks({
  editVtr: {
    onSuccess: function(operation, result, template) {
      newVtrDoc = Vtr.findOne(this.docId);
      Meteor.call('emailVtr', newVtrDoc, operation);
      FlashMessages.sendSuccess('Ilmoitusta muokattu onnistuneesti.');
      Router.go('viewVtr',{_id: this.docId});
    }, 
  }
});