Vtr.find({}).observeChanges({ // when vtr has changed, save change to Vtrchanges collection
    changed : function (id, fields) {
      console.log("CHANGE: ", id, fields);
      Vtrchanges.insert({"vtr": id, "timestamp": new Date(), "changes": fields});
    }
});