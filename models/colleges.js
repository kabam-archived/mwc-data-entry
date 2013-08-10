//mongoose model

module.exports = exports = function (mongoose, config) {
  var CollegeSchema = new mongoose.Schema({
    'CREATOR':String, //User, who created this document
    'APPROVED':Boolean,//if document is approved, it can be edited only by administrators of moderators
    'INSTNM': String, //Institution (entity) name
    'ADDR': String, //Street address or post office box
    'CITY': String, //City location of institution
    'STABBR': String,//State abbreviation
    'ZIP': String, //Postal Zip Code
    'OBEREG': [
      'N/A',
      'US Service schools',
      'New England CT ME MA NH RI VT',
      'Mid East DE DC MD NJ NY PA',
      'Great Lakes IL IN MI OH WI',
      'Plains IA KS MN MO NE ND SD',
      'Southeast AL AR FL GA KY LA MS NC SC TN VA WV',
      'Southwest AZ NM OK TX',
      'Rocky Mountains CO ID MT UT WY',
      'Far West AK CA HI NV OR WA',
      'Outlying areas AS FM GU MH MP PR PW VI'
    ], //Geographic region
    'CHFNM': String,//Name of chief administrator
    'CHFTITLE': String,//Title of chief administrator
    'GENTELE': String,//General information telephone number
    'EIN': String, //Cont,Employer Identification Number - "The number assigned to an institution by the Internal Revenue Service for tax purposes.
    'OPEID': String, //Cont,Office of Postsecondary Education (OPE) ID Number
    'OPEFLAG': String, //OPE Title IV eligibility indicator code
    'WEBADDR': String, //Institution's internet website address
    'ADMINURL': String, //Admissions office web address
    'FAIDURL': String, //Financial aid office web address
    'APPLURL': String, //Online application web address
    'NPRICURL': String, //Net price calculator web address
    'SECTOR': String, //Sector of institution
    'ICLEVEL': String, //Level of institution
    'CONTROL': String, //Control of institution
    'HLOFFER': String, //Highest level of offering
    'UGOFFER': String, //Undergraduate offering
    'GROFFER': String, //Graduate offering
    'HDEGOFR1': String, //Highest degree offered
    'DEGGRANT': String, //Degree-granting status
    'HBCU': String, //Historically Black College or University
    'HOSPITAL': String, //Institution has hospital
    'MEDICAL': String, //Institution grants a medical degree
    'TRIBAL': String, //Tribal college
    'LOCALE': String, //Degree of urbanization (Urban-centric locale)
    'OPENPUBL': String, //Institution open to the general public
    'ACT': String, //Status of institution
    'NEWID': String, //Cont,UNITID for merged schools
    'DEATHYR': String, //Year institution was deleted from IPEDS
    'CLOSEDAT': String, //Date institution closed
    'CYACTIVE': String, //Institution is active in current year
    'POSTSEC': String, //Primarily postsecondary indicator
    'PSEFLAG': String, //Postsecondary institution indicator
    'PSET4FLG': String, //Postsecondary and Title IV institution indicator
    'RPTMTH': String, //"Reporting method for student charges, graduation rates, retention rates and student financial aid"
    'IALIAS': String, //Institution name alias
    'INSTCAT': String, //Institutional category
    'CCBASIC': String, //Carnegie Classification 2010: Basic
    'CCIPUG': String, //Carnegie Classification 2010: Undergraduate Instructional Program
    'CCIPGRAD': String, //Carnegie Classification 2010: Graduate Instructional Program
    'CCUGPROF': String, //Carnegie Classification 2010: Undergraduate Profile
    'CCENRPRF': String, //Carnegie Classification 2010: Enrollment Profile
    'CCSIZSET': String, //Carnegie Classification 2010: Size and Setting
    'CARNEGIE': String, //Carnegie Classification 2000
    'LANDGRNT': String, //Land Grant Institution
    'INSTSIZE': String, //Institution size category
    'CBSA': String, //Core Based Statistical Area (CBSA)
    'CBSATYPE': String, //CBSA Type Metropolitan or Micropolitan
    'CSA': String, //Combined Statistical Area (CSA)
    'NECTA': String, //New England City and Town Area (NECTA)
    'F1SYSTYP': String, //"System, Governing Board or Corporate Structure"
    'F1SYSNAM': String, //"Name of system, governing board or corporate entity."
    'FAXTELE': String //Fax number
  });

  CollegeSchema.index({
    INSTNM: 1,
    CITY: 1,
    ZIP: 1,
    WEBADDR:1
  });

  return mongoose.model('colleges', CollegeSchema);
};

