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
const router9=govukPrototypeKit.requests.setupRouter()

// Run this code when a form is submitted to 'juggling-balls-answer'
router.post('/Login-answer', function (req, res) {


  var Accountholder = req.session.data['Accountholder'];
  console.log("Accountholder:", Accountholder);

  // Check whether the variable matches a condition
  if (Accountholder == "Yes") {
    // Send user to next page
    res.redirect('/signin')
  } else {
    // Send user to ineligible page
    res.redirect('/create-account')
  }

},

  router1.post('/FRC', function (req, res) {

    let FRC = new Array();
   
    FRC = req.session.data['FRC'];
    let len = FRC.length;


   // console.log("FRC:", FRC);

    // Check whether the variable matches a condition
    if (FRC == "None of the above") {
      // Send user to next page
      res.redirect('/ConfirmFRC')
    } else {
      // Send user to ineligible page
      res.redirect('/Page_3')
    }

  },
  router1.get('/CommodityVolumeGetController', function (req, res) {


 //console.log("commoditydata",req.session.data['commodities']);
    
 c= req.session.data['FRC'].map(commodity=>{

      const config = req.session.data['commodities'].find(_config=>_config.value === commodity)
      
      return {
      
          id: config.value,
      
          text: config.text,
      
          errorMessage: undefined
      
      }
      
      })
     
   // console.log(" req.session.data['selectedCommodities']", req.session.data['selectedCommodities']);
    res.redirect('/CommodityVolumePage')
    

  },


    router2.post('/AnnualIncome', function (req, res) {


      var AnnualIncome = req.session.data['AnnualIncome'];
      if (AnnualIncome < 500) {
        console.log("AnnualIncome:", AnnualIncome);
        res.redirect('/Page_4');
      }
      else if (AnnualIncome >= 500) {
        res.redirect('/PeriodOfExemption');
      }



    },
      router4.post('/ParentCompany', function (req, res) {


        var ParentCompany = req.session.data['ParentCompany'];
        var AnnualIncome = req.session.data['AnnualIncome'];
        //console.log("ParentCompany:", ParentCompany);

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

          console.log("ParentCompanyAnnualIncome:", ParentCompanyAnnualIncome);

          // Check whether the variable matches a condition


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
         
          var Userservice = req.session.data['Userservice'];

          console.log("Exemption:", Userservice);
          if(Userservice=="Exemption")
          {
            res.redirect("/Page_3")

          }
          else{
            res.redirect("/amendCommodities")
          }

          // Check whether the variable matches a condition


         

        },

          router6.post('/commodityvolume', function (req, res) {
            // console.log("dates",req.session.data['passport-issued']);

            let count = 0;
            let FRC = new Array();
            FRC = req.session.data['FRC'];


            var commodityvolume = req.session.data['commodityvolume'];
            var AnnualIncome1 = req.session.data['AnnualIncome'];
            var Descritption = req.session.data['description'];
            let fromYear = req.session.data['fromYear'];
            let toYear = req.session.data['toYear'];
            let count1=0;

          console.log("req.body:", req.body);
            

            const selectedCommodities = [...req.session.data['selectedCommodities']];

            const error = req.session.data['errors'].commodities
            
            Object.entries(req.body).forEach(([commodity, value])=>{
              console.log("commodityvalue",commodity, value);
            
                const index = selectedCommodities.findIndex(_config=>_config.id === commodity);
            console.log("index",index);
            console.log("selectedCommoditiesindex",selectedCommodities[index]);
               selectedCommodities[index].value = value
                selectedCommodities[index].errorMessage = value > 999 ? error.invalid : undefined
            
            });
            req.session.data['selectedCommodities'] = selectedCommodities
            console.log("sc", req.session.data['selectedCommodities']);
            for(let i=0;i<req.session.data['selectedCommodities'].length;i++)
            {
              if(selectedCommodities[i].errorMessage!=undefined)
              {
              count1++;
              }
              console.log("df",count1);
              
            }
            if(count1>0)
            {
              return res.redirect("/CommodityVolumePage")
            }
            else{
              res.redirect("/Page_7")
            }
            // if(req.session.data['selectedCommodities'].find(commodity=>commodity.errorMessage)){
            //   console.log("getsin 171");

            //       return res.redirect("/CommodityVolumePage")
              
            //   }
           
            // res.redirect("/Page_7")
             
                          
            




            // if (AnnualIncome1 >= 500) {
            
            //     res.redirect('/checkanswers7')
              
            // }
           
            //     res.redirect('/checkanswers4')
              
            





          },
          router8.post('/Checkanscontroller', function (req, res) {

       
            let fromYear = req.session.data['fromYear'];
            let toYear = req.session.data['toYear'];
           
            var AnnualIncome = req.session.data['AnnualIncome'];
            var ParentCompany=req.session.data['ParentCompany'];
  
            console.log("ParentCompany:", ParentCompany);
            if(AnnualIncome<500 && ParentCompany =="Yes")
            {
              res.redirect("/checkanswerswithParentCompany")
             // localStorage.setItem("answerpage","/checkanswerswithParentCompany");
  
            }
            else if (AnnualIncome<500 && ParentCompany =="No"){
              res.redirect("/checkanswerswithoutParentCompany")
              //localStorage.setItem("answerpage","/checkanswerswithoutParentCompany");
            }
            else if(AnnualIncome>500)
            {
              res.redirect("/checkanswers7")
             // localStorage.setItem("answerpage","/checkanswers7");
            }
  
            // Check whether the variable matches a condition
  
  
           
  
          },

          router9.post('/getdata', function (req, res) {
        
            const userData = {
              Period: "2023-2024",
              Items: [
                { com: "Soy", name: "Angular" },
                { com: "Coco", name: "Angular" },
                
              ],
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            console.log("userdata",userData);
            var AnnualIncome = req.session.data['AnnualIncome'];
            var ParentCompany=req.session.data['ParentCompany'];
  
            console.log("ParentCompany:", ParentCompany);
            if(AnnualIncome<500 && ParentCompany =="Yes")
            {
              res.redirect("/checkanswerswithParentCompany")
  
            }
            else if (AnnualIncome<500 && ParentCompany =="No"){
              res.redirect("/checkanswerswithoutParentCompany")
            }
            else if(AnnualIncome>500)
            {
              res.redirect("/checkanswers7")
            }
  
            // Check whether the variable matches a condition
  
  
           
  
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
