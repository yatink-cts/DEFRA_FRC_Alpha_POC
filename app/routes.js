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
let food = {
  'ketchup': '5 tbsp',
  'mustard': '1 tbsp',
  'pickle': '0 tbsp'
};

// Run this code when a form is submitted to 'juggling-balls-answer'
router.post('/Login-answer', function (req, res) {

    
    var Accountholder = req.session.data['Accountholder'];
    console.log("Accountholder:",Accountholder);
  
    // Check whether the variable matches a condition
    if (Accountholder == "Yes"){
      // Send user to next page
      res.redirect('/signin')
    } else {
      // Send user to ineligible page
      res.redirect('/create-account')
    }
  
  },

  router1.post('/FRC', function (req, res) {

    let FRC=new Array();
    
   FRC = req.session.data['FRC'];
   let len=FRC.length;

   
    console.log("FRC:",FRC);
  
    // Check whether the variable matches a condition
    if (FRC == "None of the above"){
      // Send user to next page
      res.redirect('/ConfirmFRC')
    } else {
      // Send user to ineligible page
      res.redirect('/Page_3')
    }
  
  },
  
  
  router2.post('/AnnualIncome', function (req, res) {

    
    var AnnualIncome = req.session.data['AnnualIncome'];
    if(AnnualIncome<500)
    {
    console.log("AnnualIncome:",AnnualIncome);
    res.redirect('/Page_4');
  }
  else if(AnnualIncome>=500)
  {
    res.redirect('/CommodityVolumePage');
  }
  
   
  
  },
  router4.post('/ParentCompany', function (req, res) {

    
    var ParentCompany = req.session.data['ParentCompany'];
    var AnnualIncome = req.session.data['AnnualIncome'];
    console.log("ParentCompany:",ParentCompany);
  
    // Check whether the variable matches a condition
    if (ParentCompany =="No" ){
     

      if(AnnualIncome<500)
      {  res.redirect('/checkanswers')}
      // Send user to next page
     
    } else if(ParentCompany =="Yes" ) {
      // Send user to ineligible page
      res.redirect('/ParentCompanyDetails')
    }
  
  },
  router5.post('/ParentCompanyAnnualIncome', function (req, res) {

    
    var ParentCompanyAnnualIncome = req.session.data['ParentCompanyAnnualIncome'];
   
    console.log("ParentCompanyAnnualIncome:",ParentCompanyAnnualIncome);
  
    // Check whether the variable matches a condition
    
    
      if(ParentCompanyAnnualIncome<500)

      { 
        res.redirect('/checkanswers1')
    }
      // Send user to next page
     
    else  {
      // Send user to ineligible page
      res.redirect('/CommodityVolumePage')
    }
  
  },

  router6.post('/commodityvolume', function (req, res) {
    let count=0;
    let FRC=new Array();
    FRC = req.session.data['FRC'];
    
    var commodityvolume = req.session.data['commodityvolume'];
    var AnnualIncome1 = req.session.data['AnnualIncome'];
    var Descritption=req.session.data['description'];
     let fromYear=req.session.data['fromYear'];
     let toYear=req.session.data['toYear'];
     
   console.log("commodityvolume:",commodityvolume);
  
   
  
     
     if(AnnualIncome1>=500) {
      for(var i=0;i<commodityvolume.length;i++)
      {
      if(commodityvolume[i]>=100)
      {
        count++;
      }
    }
    console.log("count",count,commodityvolume.length);
     if(count==commodityvolume.length)
     {
      res.redirect('/checkanswers7')
     }
    }
    else if(AnnualIncome1>=500&&commodityvolume[i]<100) {
      console.log("enters 1 if");
      // Send user to ineligible page
      res.redirect('/checkanswers3')
    }
    else if(AnnualIncome1<500)
    {

      for(var i=0;i<commodityvolume.length;i++)
      {
      if(commodityvolume[i]<100)
      {
        count++;
      }
    }
    console.log("count",count,commodityvolume.length);
     if(count==commodityvolume.length)
     {
      res.redirect('/checkanswers6')
     }
     else{
      res.redirect('/checkanswers4')
    }
     }
      
    
    
  
  
  },
  
  router7.post('/commodityvolume', function (req, res) {

    console.log("commodityvolume:");
    var commodityvolume = req.session.data['commodityvolume'];
    console.log("commodityvolume:",commodityvolume);
    if(commodityvolume<100)
    {
      res.redirect('/Exemption');
    }
    else{}
  
   
  
  }

  )
  )
)
)
  )
  )
)
