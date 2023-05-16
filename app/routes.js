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
const CommodityMethodsController =govukPrototypeKit.requests.setupRouter()
const exmap = new Map();

router.post('/Login-answer', function (req, res) {

  var Accountholder = req.session.data['Accountholder'];
  //console.log("Accountholder:", Accountholder);

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

    let fromMonth = req.session.data['fromMonth'];
    let fromYear = req.session.data['fromYear'];
    let toMonth = req.session.data['toMonth'];
    let toYear = req.session.data['toYear'];

    function getMonthName(monthNumber) {
      const date = new Date();
      date.setMonth(monthNumber - 1);

      return date.toLocaleString('en-US', {
        month: 'long',
      });
    }



    req.session.data['FromPeriod'] = getMonthName(fromMonth).concat(" ", fromYear);
    req.session.data['ToPeriod'] = getMonthName(toMonth).concat(" ", toYear);
    console.log("57", req.session.data['FromPeriod']);
    res.redirect("/FRCcommodities");

  },

  CommodityMethodsController.get('/CommodityMethodsController', function (req, res) {

    console.log("req",req.session.data['description'][1]);
    res.redirect("/CommodityFileUpload");
    // for(var i=0;i<req.session.data['description'].length;i++)
    // {

    // }

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
          //  console.log("AnnualIncome:", AnnualIncome);
          res.redirect('/ParentCompany');
        }
        else if (AnnualIncome >= 500) {
          res.redirect('/PeriodOfExemption');
        }
      },
        ParentCompanyController.post('/ParentCompany', function (req, res) {


          var ParentCompany = req.session.data['ParentCompany'];
          var AnnualIncome = req.session.data['AnnualIncome'];

          // Check whether the variable matches a condition
          if (ParentCompany == "No") {


            if (AnnualIncome < 500) { res.redirect('/NoService') }
            // Send user to next page

          } else if (ParentCompany == "Yes") {
            // Send user to ineligible page
            res.redirect('/ParentCompanyDetails')
          }

        },
          ParentCompanyIncomeController.post('/ParentCompanyAnnualIncome', function (req, res) {


            var ParentCompanyAnnualIncome = req.session.data['ParentCompanyAnnualIncome'];

            if (ParentCompanyAnnualIncome < 500) {
              res.redirect('/checkanswers1')
            }
            // Send user to next page

            else {
              // Send user to ineligible page
              res.redirect('/CommodityVolumePage')
            }

          },
            UserjourneyController.post('/Userjourney', function (req, res) {
              
              //var Userservice = req.session.data['Userservice'];
              const { Userservice } = req.session.data;
              req.session.data = { Userservice };
              //sessionStorage.clear();
              req.session.data['complete'] = 'No';
              req.session.data['amendcomplete'] = 'No';



              // console.log("req.session.data['period']='January':", req.session.data['period']='January');
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


                //console.log("req.body:", req.body);


                const selectedCommodities = [...req.session.data['selectedCommodities']];
                //   let selcommodities=selectedCommodities.commodity;
                const error = req.session.data['errors'].commodities

                Object.entries(req.body).forEach(([commodity, value]) => {
                  console.log("commodityvalue", commodity, value);
                  const index = selectedCommodities.findIndex(_config => _config.id === commodity);
                  selectedCommodities[index].value = value
                  selectedCommodities[index].errorMessage = value > 999 ? error.invalid : undefined
                  selcommodities[index] = commodity
                });
                req.session.data['selectedCommodities'] = selectedCommodities
                req.session.data['selcommodities'] = selcommodities
                const sc = [...req.session.data['selcommodities']];
                console.log("selcommodities", selcommodities)
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
                  req.session.data['complete'] = 'Yes';
                  res.redirect("/applicationcomplete");

                },

                  AmendedCommodityController.post('/getdata', function (req, res) {
                   
                    console.log("req.session.data['selectedCommodities']", req.session.data['selectedCommodities']);
                    for (let i = 0; i < req.session.data['selectedCommodities'].length; i++) {
                      if (req.session.data['selectedCommodities'][i].value == req.session.data['ac']) {
                        console.log(req.session.data['selectedCommodities'][i].text);
                        amendedcommodity = req.session.data['selectedCommodities'][i].text
                      }

                    }

                    req.session.data['amendedcommodity'] = amendedcommodity;

                    //console.log("req.session.data['ac']",req.session.data['ac']);             
                    res.redirect("/thresholdchange");

                  },
                  AmendedExemptionPeriodController.post('/getdata_amended_threshold', function (req, res) {
                    let amendedcommodity = "";
                    req.session.data['amendcomplete'] = 'Yes';
                    console.log(" req.session.data['threshold-change]", req.session.data['threshold-change']);
                    let fromMonth_amend = req.session.data['threshold-change-month'];   
                    let fromYear_amend = req.session.data['threshold-change-year'];   
                    let toMonth = req.session.data['toMonth'];
                      let toYear = req.session.data['toYear'];
                         console.log("fromMonth_amend",fromMonth_amend);
                         console.log("fromYear_amend",fromYear_amend);

                    function getMonthName1(monthNumber) {
                      const date = new Date();
                      date.setMonth(monthNumber - 1);
                
                      return date.toLocaleString('en-US', {
                        month: 'long',
                      });
                    }
                    req.session.data['FromPeriod_amend'] = getMonthName1(fromMonth_amend).concat(" ", fromYear_amend);
                    req.session.data['thresholdchange_Amend']=getMonthName1(fromMonth_amend).concat(" ", fromYear_amend).concat("-",getMonthName1(req.session.data['toMonth'])).concat(" ",req.session.data['toYear']);
                    console.log("Threshold change",req.session.data['thresholdchange_Amend']);
                    res.redirect("/amendCommodityMethods");
                  },

                    Static_AmendedCommodityController.post('/getdata_amend', function (req, res) {
                      console.log("data['static_amend_commodity']", req.session.data['static_amend_commodity']);
                      //res.redirect("/thresholdchange");
                      if (req.session.data['static_amend_commodity'] == "Soy") {
                        res.redirect("/thresholdchange_soya");
                      }
                      else {
                        console.log("rubber");
                        res.redirect("/thresholdchange_rubber");
                      }

                    },

                      AppComplete_AmendedCommodityController.post('/getdata_appcomplete', function (req, res) {
                        //  console.log("data['static_amend_commodity']",req.session.data['static_amend_commodity']) ;            
                        //res.redirect("/thresholdchange");
                        if (req.session.data['static_amend_commodity'] == "Soy") {
                          res.redirect("/application_complete_Soy");
                        }
                        else {
                          console.log("rubber");
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