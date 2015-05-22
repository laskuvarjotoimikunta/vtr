AutoForm.hooks({
  editVtr: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      FlashMessages.sendSuccess('Ilmoitusta muokattu onnistuneesti.');
      Router.go('viewVtr',{_id: this.docId});
    }, 
  }
});