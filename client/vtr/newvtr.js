AutoForm.hooks({
  newVtr: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      FlashMessages.sendSuccess('Vaaratilanneraportti lähetetty.');
      Router.go('about',{_id: this.docId});
    }, 
  }
});