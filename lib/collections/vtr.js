
Vtr = new Mongo.Collection('vtr');

Schemas.Vtr = new SimpleSchema({
  whoDidReport: {  
    type: String,
    label: "Ilmoituksen tekijä",
    allowedValues: ['Hyppääjä', 'Vastaava kouluttaja', 'Koulutuspäällikkö', 'Turvallisuuspäällikkö','Muu henkilö'],
    autoform: {
      afFieldInput: {
        firstOption: "(Valitse ilmoituksen tekijä)"
      }
    }
  }, 
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
    max: function () {
      return new Date();
    }
  },
  age: {  
    type: Number,
    label: "Hyppääjän ikä",
    min: 15,
    max: 150
  },
  exitWeight: {  
    type: Number,
    label: "Exit-paino (kg)",
    min: 10,
    max: 200
  },
  license: {  
    type: String,
    label: "Lisenssi",
    allowedValues: ['ALK', 'PK', 'JK', 'A','B','C','D'],
    autoform: {
      afFieldInput: {
        firstOption: "(Valitse lisenssi/koulutusluokka)"
      }
    }
  },
  certifications: {
    type: [String],
    label: "Kelpoisuudet",
    optional: true,
    autoform: { 
      type: "universe-select",
      afFieldInput: {
        type: "universe-select",
        multiple: true,
        options: function(){
          return [
                  {value: 'HM', label: 'Hyppymestari HM'},
                  {value: 'THM', label: 'Tandemhyppymestari THM'},
                  {value: 'NHM', label: 'Novahyppymestari NHM'},
                  {value: 'VPK', label: 'Vapaapudotuskouluttaja VPK'},
                  
                 ]

        }
      }
    }
  },
  typeOfJump: {
    type: String,
    label: "Hypyn laatu",
    allowedValues: ['PL','IA','NOVA','TANDEM','Kerhohyppy','Harjoitus kilpailua varten','Kilpailu','Näytös'],
    autoform: {
      afFieldInput: {
        firstOption: "(Valitse hypyn laatu)"
      }
    }
  },
  numberOfJumps: {
    type: Number,
    label: "Kokonaishyppymäärä"
  },
  numberOfJumpsinThreeMonths: {
    type: Number,
    label: "Hyppymäärä viimeisen 3kk aikana",
    custom: function () {
      if (this.value > this.field('numberOfJumps').value) {
        return "moreJumpsinThreeMonthsThanTotal";
      }
    }
  },
  mainCanopy: {
    type: String,
    label: "Päävarjon merkki/malli"
  },
  mainCanopySize: {
    type: Number,
    label: "Päävarjon koko (sqft)",
    min: 35,
    max: 500
  },
  mainCanopyJumpsApprox: {
    type: Number,
    label: "Arvio kuvun hyppymäärästä"
  },
  jumpsWithCanopy: {
    type: String,
    label: "Hyppykokemus ko. tyyppisellä kuvulla",
    allowedValues: ['1-10','11-50','Yli 50'],
    autoform: {
      afFieldInput: {
        firstOption: "(Valitse hyppykokemus)"
      }
    }
  },
  rig: {
    type: String,
    label: "Valjaiden/repun merkki/malli"
  },
  jumpsWithRig: {
    type: String,
    label: "Hyppykokemus ko. valjailla",
    allowedValues: ['1-10','11-50','Yli 50'],
    autoform: {
      afFieldInput: {
        firstOption: "(Valitse hyppykokemus)"
      }
    }
  },
  openingSystem: {
    type: String,
    label: "Aukaisujärjestelmän sijainti",
    allowedValues: ['IA/Repun pohjassa', 'IA/Vatsahihnassa','IA/Reisihihnassa','PL/Apuvarjo','PL/Suora sisäpussi','PL/JAD','TDM/Oppilaan valjaassa','TDM/HM valjaassa'],
    autoform: {
      afFieldInput: {
        firstOption: "(Valitse avausjärjestelmä)"
      }
    }
  }, 
  pilotChuteType: {
    type: String,
    label: "Apuvarjon tyyppi",
    allowedValues: ['Tukahtuva HD', 'Tukahtumaton HD','Jousi','Ei apuvarjoa','POP','Kuminauha','Drogue'],
    autoform: {
      afFieldInput: {
        firstOption: "(Valitse apuvarjon tyyppi)"
      }
    }
  }, 
  reserveWasUsed: {
    type: Boolean,
    label: "Varavarjoa käytettiin",
    optional: true
  }, 
  reserveCanopy: {
    type: String,
    label: "Varavarjon merkki/malli",
    optional: true
  },
  reserveCanopySize: {
    type: String,
    label: "Varavarjon koko (sqft)",
    optional: true
  },
  personsInjured: {
    type: Boolean,
    label: "Henkilövahinkoja tapahtui",
    optional: true
  },
  avgWind: {
    type: Number,
    label: "Maatuuli (keskiarvo, m/s)",
    optional: true
  },
  gustWind: {
    type: Number,
    label: "Maatuuli (huiput, m/s)",
    optional: true
  },
  factors: {
    type: [String],
    label: "Loukkaantumisen aiheuttaneet tai sitä myötävaikuttaneet tekijät",
    optional: true,
    autoform: { 
      type: "universe-select",
      afFieldInput: {
        type: "universe-select",
        multiple: true,
        options: function(){
          return [
                  {value: 'Maahantulotekniikka', label: 'Huono maahantulotekniikka'},
                  {value: 'Ei jarrutusta', label: 'Varjo ei jarrutuksessa'},
                  {value: 'Heiluri', label: 'Heiluri'},
                  {value: 'Epätasainen alastulopaikka', label: 'Epätasainen alastulopaikka'},
                  {value: 'Väärä/vaihtoehtoinen laskeutumispaikka', label: 'Väärä/vaihtoehtoinen laskeutumispaikka'},
                  {value: 'Muu', label: 'Muu syy (selvitys kohdassa Miksi näin tapahtui)'}                
                 ]

        }
      }
    }
  },
  typeOfInjury: {
    type: [String],
    label: "Loukkaantumisen laatu",
    optional: true,
    autoform: { 
      type: "universe-select",
      afFieldInput: {
        type: "universe-select",
        multiple: true,
        options: function(){
          return [
                  {value: 'Murtuma', label: 'Luunmurtuma'},
                  {value: 'Venähdys/revähdys', label: 'Venähdys/revähdys'},
                 ]

        }
      }
    }
  },
  bodyPartOfInjury: {
    type: [String],
    label: "Loukkaantunut vartalon osa",
    optional: true,
    autoform: { 
      type: "universe-select",
      afFieldInput: {
        type: "universe-select",
        multiple: true,
        create: true,
        options: function(){
          return [
                  {value: 'Ranne/kyynärvarsi', label: 'Ranne/kyynärvarsi'},
                  {value: 'Kyynärpää/olkapää', label: 'Kyynärpää/olkapää'},
                  {value: 'Nilkka/sääri/jalkaterä', label: 'Nilkka/sääri/jalkaterä'},
                  {value: 'Polvi', label: 'Polvi'},
                  {value: 'Reisi', label: 'Reisi'},
                  {value: 'Selkäranka', label: 'Selkäranka'},
                  {value: 'Niska/kaula', label: 'Niska/kaula'},
                  {value: 'Pää', label: 'Pää'}
                 ]

        }
      }
    }
  },
  discipline: {
    type: String,
    label: "Hyppytyyppi",
    allowedValues: ['Oppilas','CF','Freefly','Freestyle','CP','FS','Kuvaus','Lauta','Liitopuku','Taito','Tarkkuus','Vesi','Yö','Muu'],
    autoform: {
      afFieldInput: {
        firstOption: "(Valitse hyppytyyppi)"
      }
    }
  },
  whatHappened: {
    type: String,
    label: "Mitä tapahtui?",
    optional: true,
    autoform: {
      rows: 8
    }
  },
  whyHappened: {
    type: String,
    label: "Miksi näin tapahtui?",
    optional: true,
    autoform: {
      rows: 8
    }
  },  
  howToPrevent: {
    type: String,
    label: "Miten tapahtuma olisi ollut vältettävissä?",
    optional: true,
    autoform: {
      rows: 8
    }
  },
  otherDamages: {
    type: String,
    label: "Muut vahingot?",
    autoform: {
      rows: 4
    },
    optional: true
  },
  attachments: {
  type: String,
  label: "Linkit liitteisiin (dropbox, youtube, jne..)",
  optional: true,
  autoform: {
      rows: 3
    }
  },
  createdBy: {
    type: String,
    autoValue:function(){ return this.userId }
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

Files = new FS.Collection("files", {
  stores: [new FS.Store.FileSystem("files", {path: "/tmp/files"})]
});

Files.allow({
  'insert': function (userId,doc) {
    /* user and doc checks ,
    return true to allow insert */
    return true; 
  },
  'download': function (userId) {
    /* user and doc checks ,
    return true to allow insert */
    return true; 
  }
});