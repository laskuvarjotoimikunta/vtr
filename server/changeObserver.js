Vtr.find({}).observeChanges({
    changed : function (id, fields) {
      console.log("CHANGE: ", id, fields);
    }
});