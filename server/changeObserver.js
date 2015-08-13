Vtr.find({}).observeChanges({
    changed : function (id, fields) {
      console.log("CHANGE: ", id, fields);
      Vtrchanges.insert({"vtr": id, "timestamp": new Date(), "changes": fields});
    }
});