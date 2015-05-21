
Vtr = new Mongo.Collection('vtr');

Schemas.vtr = new SimpleSchema({
  skydiverDz: {
        label: "Hyppääjän kerho",
        type: SimpleSchema.RegEx.Id,
        optional: true,
        autoform: {
            firstOption: "(Valitse yhteisö)",
            options: function() {
              return _.map(Dropzones.find().fetch(),function (value){
                return {
                    label: value.name, value: value._id};
              })
            }
        }
    },
  happenedDz: {
        label: "Hyppypaikan yhteisö",
        type: SimpleSchema.RegEx.Id,
        optional: true,
        autoform: {
            firstOption: "(Valitse yhteisö)",
            options: function() {
              return _.map(Dropzones.find().fetch(),function (value){
                return {
                    label: value.name, value: value._id};
              })
            }
        }
    },
  location: {  
    type: String,
    label: "Hyppypaikka",
    max: 50
  },
  date: {  
    type: Date,
    label: "Päivämäärä",
    max: 50
  },
  name: {  
    type: String,
    label: "Hyppääjän nimi",
    max: 50
  },
  age: {  
    type: Number,
    label: "Hyppääjän ikä"
  },
  exitWeight: {  
    type: String,
    label: "Name",
    max: 50
  },
  license: {  
    type: String,
    label: "Lisenssi",
    allowedValues: ['ALK', 'PK', 'JK', 'A','B','C','D']
  },
  certifications: {
    type: String,
    label: "Hyppääjän nimi",
    max: 50
  },
  typeOfJump: {
    type: String,
    label: "Hypyn laatu",
    allowedValues: ['PL','IA','NOVA','TANDEM','Kerhohyppy','Harjoitus kilpailua varten','Kilpailu','Näytös']
  },
  numberOfJumps: {
    type: Number,
    label: "Kokonaishyppymäärä"
  },
  numberOfJumpsinThreeMonths: {
    type: Number,
    label: "Hyppymäärä viimeisen 3kk aikana"
  },
  mainCanopy: {
    type: String,
    label: "Päävarjon merkki ja koko"
  },
  mainCanopyJumpsApprox: {
    type: Number,
    label: "Arvio kuvun hyppymäärästä"
  },
  jumpsWithCanopy: {
    type: String,
    label: "Hyppykokemus ko. tyyppisellä kuvulla",
    allowedValues: ['1-10','10-50','Yli 50']
  },
  rig: {
    type: String,
    label: "Valjaiden/repun valmistaja"
  },
  jumpsWithRig: {
    type: String,
    label: "Hyppykokemus ko. valjailla",
    allowedValues: ['1-10','10-50','Yli 50']
  },
  openingSystem: {
    type: String,
    label: "Aukaisujärjestelmän sijainti",
    allowedValues: ['IA/Repun pohjassa', 'IA/Vatsahihnassa','IA/Reisihihnassa','PL/Apuvarjo','PL/Suora sisäpussi','PL/JAD']
  }, 
  pilotChuteType: {
    type: String,
    label: "Apuvarjon tyyppi",
    allowedValues: ['Tukahtuva HD', 'Tukahtumaton HD','Jousi','POP','Kuminauha']
  }, 
  reserveWasUsed: {
    type: Boolean,
    label: "Varavarjoa käytettiin"
  }, 
  reserveCanopy: {
    type: String,
    label: "Varavarjon merkki ja koko"
  },
  reserveCanopyYear: {
    type: Number,
    label: "Arvio kuvun hyppymäärästä"
  },
  personAccidentsHappened: {
    type: Boolean,
    label: "Henkilövahinkoja tapahtui"
  },
  avgWind: {
    type: Number,
    label: "Maatuuli (keskiarvo, m/s)"
  },
  gustWind: {
    type: Number,
    label: "Maatuuli (huiput, m/s)"
  }
});

Vtr.attachSchema(Schemas.Vtr);

Vtr.allow({
  'insert': function (userId,doc) {
    /* user and doc checks ,
    return true to allow insert */
    return true; 
  },
  'update': function (userId,doc) {
    /* user and doc checks ,
    return true to allow insert */
    return true; 
  }
});