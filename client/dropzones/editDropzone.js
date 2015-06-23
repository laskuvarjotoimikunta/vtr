AutoForm.hooks({
  editDropzone: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      FlashMessages.sendSuccess('Yhteisöä muokattu onnistuneesti.');
      Router.go('listDropzones');
    }, 
  }
});