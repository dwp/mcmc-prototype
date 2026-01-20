//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Find an address plugin
// const findAddressPlugin = require("find-an-address-plugin");

// findAddressPlugin(router);

// Logging session data  
// This code shows in the terminal what session data has been saved.
router.use((req, res, next) => {    
    const log = {  
      method: req.method,  
      url: req.originalUrl,  
      data: req.session.data  
    }  
    console.log(JSON.stringify(log, null, 2))  
   
  next()  
})  

// This code shows in the terminal what page you are on and what the previous page was.
router.use('/', (req, res, next) => {  
    res.locals.currentURL = req.originalUrl; //current screen  
    res.locals.prevURL = req.get('Referrer'); // previous screen
  
  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
  
    next();  
  });

  // Routing for the example journey. 
  router.post('/country-answer', function(request, response) {

    var country = request.session.data['country']
    if (country == "England"){
        response.redirect("example/complete")
    } else {
        response.redirect("example/ineligible")
    }
})


  // Add your routes here

  router.post(
  '/pages/report-change/children-tree/',
  function (req, res) {
    var ctWhichChild = req.body['childrentree-whichChild']

    if (ctWhichChild == "New"){
  
      res.redirect('/pages/report-change/children-tree/ct-whichParent')
      
    } else if (ctWhichChild == "Financialsupport") {
      
      res.redirect('/pages/report-change/children-tree/ct-financiallySupports')
   
    } else {
        res.redirect('/pages/report-change/children-tree/ct-whatToReport')
    }
  });

    router.post(
  '/pages/report-change/children-tree/ct-whichParent',
  function (req, res) {
    var ctWhichCParent = req.body['childrentree-whichParent']

    if (ctWhichCParent == "None"){
  
      res.redirect('/pages/report-change/children-tree/ct-apply')
      
    } else {
        res.redirect('/pages/report-change/children-tree/new-child/ct-childsName')
    }
  });


    
