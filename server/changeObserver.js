Vtr.find({}).observeChanges({
    added : function (id, doc) {
      console.log("ADDED: " + id, doc);
    },
    changed : function (id, fields) {
      console.log("CHANGE: ", id, fields);
    }
});