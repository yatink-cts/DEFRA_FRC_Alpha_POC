//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const router1 = govukPrototypeKit.requests.setupRouter()
const router2 = govukPrototypeKit.requests.setupRouter()
const router3 = govukPrototypeKit.requests.setupRouter()
const router4 = govukPrototypeKit.requests.setupRouter()
const router5 = govukPrototypeKit.requests.setupRouter()
const router6 = govukPrototypeKit.requests.setupRouter()
const router7 = govukPrototypeKit.requests.setupRouter()
const router8 = govukPrototypeKit.requests.setupRouter()
const router9 = govukPrototypeKit.requests.setupRouter()
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
  // router1.post('/FRC', function (req, res) {

  //   let FRC = new Array();

  //   FRC = req.session.data['FRC'];
  //   let len = FRC.length;   

  //   // Check whether the variable matches a condition
  //   if (FRC == "None of the above") {
  //     // Send user to next page
  //     res.redirect('/ConfirmFRC')
  //   } else {
  //     // Send user to ineligible page
  //     res.redirect('/AnnunalTurnover')
  //   }

  // },
    router1.get('/CommodityVolumeGetController', function (req, res) {


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


      router2.post('/AnnualIncome', function (req, res) {


        var AnnualIncome = req.session.data['AnnualIncome'];
        if (AnnualIncome < 500) {
          //  console.log("AnnualIncome:", AnnualIncome);
          res.redirect('/ParentCompany');
        }
        else if (AnnualIncome >= 500) {
          res.redirect('/PeriodOfExemption');
        }
      },
        router4.post('/ParentCompany', function (req, res) {


          var ParentCompany = req.session.data['ParentCompany'];
          var AnnualIncome = req.session.data['AnnualIncome'];
      
          // Check whether the variable matches a condition
          if (ParentCompany == "No") {


            if (AnnualIncome < 500) { res.redirect('/checkanswers') }
            // Send user to next page

          } else if (ParentCompany == "Yes") {
            // Send user to ineligible page
            res.redirect('/ParentCompanyDetails')
          }

        },
          router5.post('/ParentCompanyAnnualIncome', function (req, res) {


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
            router7.post('/Userjourney', function (req, res) {
              //var Userservice = req.session.data['Userservice'];
               const {Userservice}=req.session.data;
               req.session.data={Userservice};
              //sessionStorage.clear();
              req.session.data['complete'] = 'No';

             

              // console.log("req.session.data['period']='January':", req.session.data['period']='January');
              if (Userservice == "Exemption") {
                res.redirect("/AnnunalTurnover")

              }
              else {
                res.redirect("/amendCommodities")
              }


            },

              router6.post('/commodityvolume', function (req, res) {
                
                let count = 0;
                let FRC = new Array();
                FRC = req.session.data['FRC'];


                var commodityvolume = req.session.data['commodityvolume'];
                var AnnualIncome1 = req.session.data['AnnualIncome'];
                var Descritption = req.session.data['description'];
                let fromYear = req.session.data['fromYear'];
                let toYear = req.session.data['toYear'];
                let count1 = 0;

                //console.log("req.body:", req.body);


                const selectedCommodities = [...req.session.data['selectedCommodities']];

                const error = req.session.data['errors'].commodities

                Object.entries(req.body).forEach(([commodity, value]) => {
                  console.log("commodityvalue", commodity, value);
                  const index = selectedCommodities.findIndex(_config => _config.id === commodity);
                  selectedCommodities[index].value = value
                  selectedCommodities[index].errorMessage = value > 999 ? error.invalid : undefined

                });
                req.session.data['selectedCommodities'] = selectedCommodities

                for (let i = 0; i < req.session.data['selectedCommodities'].length; i++) {
                  if (selectedCommodities[i].errorMessage != undefined) {
                    count1++;
                  }

                }
                if (count1 > 0) {
                  return res.redirect("/CommodityVolumePage")
                }
                else {
                  res.redirect("/Page_7")
                }
              },
                router8.post('/appcomplete', function (req, res) {
                  req.session.data['complete'] = 'Yes';
                  res.redirect("/applicationcomplete");

                },

                  router9.post('/getdata', function (req, res) {
                    console.log("req",req.body);
                    console.log("req.session.data['selectedCommodities']",req.session.data['selectedCommodities'])
                    
console.log(" req.session.data['amendedcommodities']", req.session.data['ac'])

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

