SimpleSchema.messages({
  required: "[label] tarvitaan",
  minString: "[label] tulee olla vähintään [min] merkkiä",
  maxString: "[label] ei voi ylittää [max] merkkiä",
  minNumber: "[label] tulee olla vähintään [min]",
  maxNumber: "[label] ei voi ylittää [max]",
  minDate: "[label] tulee olla sama tai myöhemmin kuin [min]",
  maxDate: "[label] ei voi olla jälkeen [max]",
  badDate: "[label] ei ole oikea päivämäärä",
  minCount: "Sinun tulee määrittää vähintään [minCount] arvo",
  maxCount: "Et voi määrittää enempää kuin [maxCount] arvoa",
  noDecimal: "[label] tulee olla numero",
  notAllowed: "[value] ei ole sallittu arvo",
  expectedString: "[label] pitää olla merkkijono",
  expectedNumber: "[label] pitää olla numero",
  expectedBoolean: "[label] pitää olla kyllä/ei",
  expectedArray: "[label] pitää olla array",
  expectedObject: "[label] pitää olla objekti",
  expectedConstructor: "[label] pitää olla [type]",
  regEx: [
    {msg: "[label] failed regular expression validation"},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] tulee olla oikea sähköpostiosoite"},
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] tulee olla oikea sähköpostiosoite"},
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] tulee olla oikea domain"},
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] tulee olla oikea domain"},
    {exp: SimpleSchema.RegEx.IP, msg: "[label] tulee olla oikea IPv4 or IPv6 osoite"},
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] tulee olla oikea IPv4 osoite"},
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] tulee olla oikea IPv6 osoite"},
    {exp: SimpleSchema.RegEx.Url, msg: "[label] tulee olla oikea URL"},
    {exp: SimpleSchema.RegEx.Id, msg: "[label] tulee olla oikea alphanumeerinen ID"}
  ],
  keyNotInSchema: "[key] ei ole sallittu skeeman mukaan",
  moreJumpsinThreeMonthsThanTotal: "Hyppyjä ei voi olla viimeisen 3kk aikana enempää kuin totaalihyppymäärä on"
});