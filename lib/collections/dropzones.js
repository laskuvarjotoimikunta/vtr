Dropzones = new Mongo.Collection('dropzones');

Schemas.Dropzone = new SimpleSchema({
    name: { // Name of dropzone (Skydive Närpiö)
        type: String,
        label: "Name",
        max: 200
    },
    airfield: { // ICAO-code of airfield, EFHN
        type: String,
        label: "Airfield"
    },
    elevation: { // Elevation of dropzone in meters
        type: Number,
        label: "Elevation (m)",
        optional: true
    },
    website: { // Official website of the dropzone
      type: String,
      label: "Website",
      optional: true
    },
    email: { // Official email of the dropzone
      type: String,
      label: "Email",
      optional: true
    },
    headOfTraining: {
      type: String,
      label: "Koulutuspäällikön sähköposti",
      regEx: SimpleSchema.RegEx.Email,
      optional: true
    },
    viceHeadOfTraining: {
      type: String,
      label: "Puheenjohtajan, AKP:n tms. sähköposti",
      regEx: SimpleSchema.RegEx.Email,
      optional: true
    },
    headOfSafety: {
      type: String,
      label: "Turvallisuuspäällikön sähköposti",
      regEx: SimpleSchema.RegEx.Email,
      optional: true
    }
});

Dropzones.attachSchema(Schemas.Dropzone);

Dropzones.allow({
    'insert': function (userId,doc) {
      // only admins can insert 
      return Roles.userIsInRole(userId,['admin']);
    },
    'update': function (userId,doc) {
      // only admins can update 
      return Roles.userIsInRole(userId,['admin']);
    },
  });
