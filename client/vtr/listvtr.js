Template.listVtr.helpers({ 
  vtr: function() {
    return Vtr.find();
  },
  prettyDate: function(date) {
    return moment(date).calendar();
    //return date;
  },
});