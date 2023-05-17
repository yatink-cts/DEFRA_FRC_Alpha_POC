//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const CommodityVolumeGetController_Router = govukPrototypeKit.requests.setupRouter()
const AnnualIncomeController = govukPrototypeKit.requests.setupRouter()

const ParentCompanyController = govukPrototypeKit.requests.setupRouter()
const ParentCompanyIncomeController = govukPrototypeKit.requests.setupRouter()
const commodityvolumeController = govukPrototypeKit.requests.setupRouter()
const UserjourneyController = govukPrototypeKit.requests.setupRouter()
const applicationcompletionController = govukPrototypeKit.requests.setupRouter()
const AmendedCommodityController = govukPrototypeKit.requests.setupRouter()
const Static_AmendedCommodityController = govukPrototypeKit.requests.setupRouter()
const AppComplete_AmendedCommodityController = govukPrototypeKit.requests.setupRouter()
const ExemptionPeriodController = govukPrototypeKit.requests.setupRouter()
const AmendedExemptionPeriodController = govukPrototypeKit.requests.setupRouter()
const CommodityMethodsController = govukPrototypeKit.requests.setupRouter()
const exmap = new Map();

router.post('/Login-answer', function (req, res) {

  var Accountholder = req.session.data['Accountholder'];


  // Check whether the variable matches a condition
  if (Accountholder == "Yes") {
    // Send user to next page
    res.redirect('/signin')
  } else {
    // Send user to ineligible page
    res.redirect('/create-account')
  }

},
  ExemptionPeriodController.get('/exemptionperiod', function (req, res) {
    req.session.data['ExemptionPeriod_1'] = req.session.data['ExemptionPeriod']
    res.redirect("/FRCcommodities");

  },

    CommodityMethodsController.get('/CommodityMethodsController', function (req, res) {
      res.redirect("/CommodityFileUpload");

    },
      CommodityVolumeGetController_Router.get('/CommodityVolumeGetController', function (req, res) {



        req.session.data['selectedCommodities'] = req.session.data['FRC'].map(commodity => {

          const config = req.session.data['commodities'].find(_config => _config.value === commodity)

          return {

            id: config.value,

            text: config.text,

            errorMessage: undefined

          }

        })
        res.redirect('/CommodityVolumePage')


      },


        AnnualIncomeController.post('/AnnualIncome', function (req, res) {


          var AnnualIncome = req.session.data['AnnualIncome'];
          if (AnnualIncome < 500) {
            res.redirect('/ParentCompany');
          }
          else if (AnnualIncome >= 500) {
            res.redirect('/PeriodOfExemption');
          }
        },
          ParentCompanyController.post('/ParentCompany', function (req, res) {


            var ParentCompany = req.session.data['ParentCompany'];
            var AnnualIncome = req.session.data['AnnualIncome'];


            if (ParentCompany == "No") {


              if (AnnualIncome < 500) { res.redirect('/NoService') }


            } else if (ParentCompany == "Yes") {

              res.redirect('/ParentCompanyDetails')
            }

          },
            ParentCompanyIncomeController.post('/ParentCompanyAnnualIncome', function (req, res) {


              var ParentCompanyAnnualIncome = req.session.data['ParentCompanyAnnualIncome'];

              if (ParentCompanyAnnualIncome < 100) {
                res.redirect('/NoService')
              }


              else {

                res.redirect('/PeriodOfExemption')
              }

            },
              UserjourneyController.post('/Userjourney', function (req, res) {
                const { Userservice } = req.session.data;
                req.session.data = { Userservice };

                req.session.data['complete'] = 'No';
                req.session.data['amendcomplete'] = 'No';




                if (Userservice == "Exemption") {
                  res.redirect("/AnnunalTurnover")

                }
                else {
                  res.redirect("/amendCommodities")
                }



              },

                commodityvolumeController.post('/commodityvolume', function (req, res) {

                  let count = 0;
                  let FRC = new Array();
                  FRC = req.session.data['FRC'];
                  let selcommodities = new Array();


                  var commodityvolume = req.session.data['commodityvolume'];
                  var AnnualIncome1 = req.session.data['AnnualIncome'];
                  var Descritption = req.session.data['description'];
                  let fromYear = req.session.data['fromYear'];
                  let toYear = req.session.data['toYear'];
                  let count1 = 0;


                  const selectedCommodities = [...req.session.data['selectedCommodities']];

                  const error = req.session.data['errors'].commodities

                  Object.entries(req.body).forEach(([commodity, value]) => {

                    const index = selectedCommodities.findIndex(_config => _config.id === commodity);
                    selectedCommodities[index].value = value
                    selectedCommodities[index].errorMessage = value > 999 ? error.invalid : undefined
                    selcommodities[index] = commodity
                  });
                  req.session.data['selectedCommodities'] = selectedCommodities
                  req.session.data['selcommodities'] = selcommodities
                  const sc = [...req.session.data['selcommodities']];

                  for (let i = 0; i < req.session.data['selectedCommodities'].length; i++) {
                    if (selectedCommodities[i].errorMessage != undefined) {
                      count1++;
                    }

                  }
                  if (count1 > 0) {
                    return res.redirect("/CommodityVolumePage")
                  }
                  else {
                    res.redirect("/CommodityDetermination")
                  }
                },
                  applicationcompletionController.post('/appcomplete', function (req, res) {

                    const today = new Date();
                    const yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1; // Months start at 0!
                    let dd = today.getDate();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;

                    const currentDate = dd + '/' + mm + '/' + yyyy;
                    req.session.data['currentdate'] = currentDate;

                    req.session.data['complete'] = 'Yes';
                    res.redirect("/applicationcomplete");

                  },

                    AmendedCommodityController.post('/getdata', function (req, res) {


                      for (let i = 0; i < req.session.data['selectedCommodities'].length; i++) {
                        if (req.session.data['selectedCommodities'][i].value == req.session.data['ac']) {

                          amendedcommodity = req.session.data['selectedCommodities'][i].text
                        }

                      }

                      req.session.data['amendedcommodity'] = amendedcommodity;

                      res.redirect("/thresholdchange");

                    },
                      AmendedExemptionPeriodController.post('/getdata_amended_threshold', function (req, res) {
                        let amendedcommodity = "";
                        req.session.data['amendcomplete'] = 'Yes';

                        let fromMonth_amend = req.session.data['threshold-change-month'];
                        let fromYear_amend = req.session.data['threshold-change-year'];
                        let period = req.session.data['ExemptionPeriod_1'];
                        const myArray = period.split("-");
                        let toperiod = myArray[1];



                        function getMonthName1(monthNumber) {
                          const date = new Date();
                          date.setMonth(monthNumber - 1);

                          return date.toLocaleString('en-US', {
                            month: 'long',
                          });
                        }
                        req.session.data['FromPeriod_amend'] = getMonthName1(fromMonth_amend).concat(" ", fromYear_amend);
                        req.session.data['thresholdchange_Amend'] = getMonthName1(fromMonth_amend).concat(" ", fromYear_amend).concat("-", toperiod);
                        res.redirect("/amendCommodityMethods");
                      },

                        Static_AmendedCommodityController.post('/getdata_amend', function (req, res) {
                          if (req.session.data['static_amend_commodity'] == "Soy") {
                            res.redirect("/thresholdchange_soya");
                          }
                          else {
                            res.redirect("/thresholdchange_rubber");
                          }

                        },

                          AppComplete_AmendedCommodityController.post('/getdata_appcomplete', function (req, res) {
                            if (req.session.data['static_amend_commodity'] == "Soy") {
                              res.redirect("/application_complete_Soy");
                            }
                            else {
                              res.redirect("/application_complete_rubber");
                            }

                          },
                          )
                        )

                      )


                    )
                  )
                )
              )
            )
          )
        )
      )
    )

  )
)