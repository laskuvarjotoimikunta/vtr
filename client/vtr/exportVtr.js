Template.exportVtr.helpers({ 
  allVtr: function() {
      return Vtr.find();
  },
  dzName: function(dz) {
    if (dz) {
      return Dropzones.findOne(dz).name;
    } else {
      return null;
    }
  },
  countWingLoad: function(weight,canopySize) {
    canopySizeLbs = canopySize/2.20462262;
    wingLoad = weight/canopySizeLbs;
    return wingLoad.toFixed(2);
  },
  prettyDate: function(date) {
    return moment(date).format('L');
  },
  isFieldValue: function(field,value) { // checking, if field includes value
    if (field) {
      if (field.indexOf(value) > -1) {
        return "1";
      } else {
        return null;
      }
    }
  }
});