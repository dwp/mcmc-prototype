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
    var ctWhichChild = req.body['childrentree-newChild']

    if (ctWhichChild == "Yes"){
  
      res.redirect('/pages/report-change/children-tree/ct-whoPays')
      
    } else {
        res.redirect('/pages/report-change/children-tree/new-child/ct-childsName')
    }
  });

   router.post(
  '/pages/report-change/children-tree/ct-whatToReport',
  function (req, res) {
    var ctWhichReport = req.body['childrentree-primaryOrEqual']

    if (ctWhichReport == "equal"){
  
      res.redirect('/pages/report-change/children-tree/primary-care/ct-equalCareEntrance')
      
    } else if (ctWhichReport == "primary") {
        res.redirect('/pages/report-change/children-tree/primary-care/ct-primaryCareEntrance')
    } else {
        res.redirect('/pages/report-change/children-tree/new-child/ct-whatToReport')
    }
  });


    router.post(
  '/pages/report-change/children-tree/primary-care/ct-primaryCareEntrance',
  function (req, res) {
    var ctPrimOrEqual = req.body['childrentree-whoCares']

    if (ctPrimOrEqual == "me"){
  
      res.redirect('/pages/report-change/children-tree/primary-care/ct-userCares')
      
    } else if (ctPrimOrEqual == "other") {
        res.redirect('/pages/report-change/children-tree/primary-care/ct-otherBYS')
    } else {
        res.redirect('/pages/report-change/children-tree/primary-care/ct-primaryCareEntrance')
    }
  });

    router.post(
  '/pages/report-change/children-tree/primary-care/ct-userPermanent',
  function (req, res) {
    var ctPerm = req.body['childrentree-userPermanent']

    if (ctPerm == "Yes"){
      res.redirect('/pages/report-change/children-tree/primary-care/seven-questions/contact')
    } else if (ctPerm == "No") {
        res.redirect('/pages/report-change/children-tree/primary-care/ct-userPermanentEnd')
    } else {
        res.redirect('/pages/report-change/children-tree/primary-care/ct-userPermanent')
    }
  });

   router.post(
  '/pages/report-change/children-tree/primary-care/ct-otherPermanent',
  function (req, res) {
    var ctPerm = req.body['childrentree-otherPermanent']

    if (ctPerm == "Yes"){
  
      res.redirect('/pages/report-change/children-tree/primary-care/ct-otherChildBenefit')
      
    } else if (ctPerm == "No") {
        res.redirect('/pages/report-change/children-tree/primary-care/ct-otherPermanentEnd')
    } else {
        res.redirect('/pages/report-change/children-tree/primary-care/ct-otherPermanent')
    }
  });

     router.post(
  '/pages/report-change/children-tree/primary-care/seven-questions/needChildcare',
  function (req, res) {
    var ctPerm = req.body['needChildcare']

    if (ctPerm == "Yes"){
  
      res.redirect('/pages/report-change/children-tree/primary-care/seven-questions/childcare')
      
    } else if (ctPerm == "No") {
        res.redirect('/pages/report-change/children-tree/primary-care/seven-questions/items')
    } else {
        res.redirect('/pages/report-change/children-tree/primary-care/seven-questions/needChildcare')
    }
  });

       router.post(
  '/pages/report-change/children-tree/primary-care/seven-questions/needMedical',
  function (req, res) {
    var ctPerm = req.body['needMedical']

    if (ctPerm == "Yes"){
  
      res.redirect('/pages/report-change/children-tree/primary-care/seven-questions/medical')
      
    } else if (ctPerm == "No") {
        res.redirect('/pages/report-change/children-tree/primary-care/seven-questions/futureMedical')
    } else {
        res.redirect('/pages/report-change/children-tree/primary-care/seven-questions/needMedical')
    }
  });

      router.post(
  '/pages/report-change/children-tree/primary-care/seven-questions/needFun',
  function (req, res) {
    var ctPerm = req.body['needFun']

    if (ctPerm == "Yes"){
  
      res.redirect('/pages/report-change/children-tree/primary-care/seven-questions/fun')
      
    } else if (ctPerm == "No") {
        res.redirect('/pages/report-change/children-tree/primary-care/seven-questions/benefit')
    } else {
        res.redirect('/pages/report-change/children-tree/primary-care/seven-questions/needFun')
    }
});




///// NEW ROUTES SINCE 25.06.26 /////

// MANDATORY RECONSIDERATION JOURNEY

router.post('/pages/track-changes/mandatory-reconsideration/mr-change-circs-answer', function(request, response) {

    var changeCircs = request.session.data['mr-change-circs']
    if (changeCircs == "no"){
        response.redirect("/pages/track-changes/mandatory-reconsideration/ask-us-to-look-again")
    } else {
        response.redirect("/pages/track-changes/mandatory-reconsideration/report-new-change")
    }
})

router.post('/pages/track-changes/mandatory-reconsideration/mr-look-again-answer', function(request, response) {

    var lookAgain = request.session.data['mr-look-again']
    if (lookAgain == "yes"){
        response.redirect("/pages/track-changes/mandatory-reconsideration/triage")
    } else {
        response.redirect("/pages/track-changes/mandatory-reconsideration/decided-not-to-ask")
    }
})

router.post('/pages/track-changes/mandatory-reconsideration/mr-correct-information-answer', function(request, response) {

    var correctInfo = request.session.data['mr-correct-information']
    if (correctInfo == "yes"){
        response.redirect("/pages/track-changes/mandatory-reconsideration/check-evidence")
    } else {
        response.redirect("/pages/track-changes/mandatory-reconsideration/update-information")
    }
})

router.post('/pages/track-changes/mandatory-reconsideration/mr-new-evidence-answer', function(request, response) {

    var newEvidence = request.session.data['mr-new-evidence']
    if (newEvidence == "yes"){
        response.redirect("/pages/track-changes/mandatory-reconsideration/confirmation-new-evidence")
    } else {
        response.redirect("/pages/track-changes/mandatory-reconsideration/ask-again-no-evidence")
    }
})

router.post('/pages/track-changes/mandatory-reconsideration/mr-no-evidence-answer', function(request, response) {

    var noEvidence = request.session.data['mr-no-evidence']
    if (noEvidence == "yes"){
        response.redirect("/pages/track-changes/mandatory-reconsideration/confirmation-no-evidence")
    } else {
        response.redirect("/pages/track-changes/mandatory-reconsideration/decided-not-to-ask")
    }
})

router.post('/pages/track-changes/mandatory-reconsideration/mr-straight-away-answer', function(request, response) {

    var straightAway = request.session.data['mr-straight-away']
    if (straightAway == "yes"){
        response.redirect("/pages/track-changes/mandatory-reconsideration/confirmation-straight-away")
    } else {
        response.redirect("/pages/messages/upload-documents")
    }
})

router.post('/pages/track-changes/mandatory-reconsideration/report-change-answer', function(request, response) {

    var reportChange = request.session.data['stillWantReport']
    if (reportChange == "yes"){
        response.redirect("/pages/track-changes/mandatory-reconsideration/confirmation-new-information")
    } else {
        response.redirect("/pages/track-changes/mandatory-reconsideration/decided-not-to-ask")
    }
})

// TRIAGE PAGE ROUTING

router.post('/pages/track-changes/mandatory-reconsideration/triage-answer', function (request, response) {

  const options = request.session.data['triage-option'] || []

  const hasNone = options.includes('none')
  const hasOtherOption =
    options.includes('information') ||
    options.includes('evidence')

  // Invalid combination
  if (hasNone && hasOtherOption) {
    return response.render(
      'pages/track-changes/mandatory-reconsideration/triage',
      {
        error: true
      }
    )
  }

  if (hasNone) {
    return response.redirect('/pages/track-changes/mandatory-reconsideration/ask-again-no-evidence')
  }

  if (options.includes('information')) {
    return response.redirect('/pages/track-changes/mandatory-reconsideration/update-information')
  }

  if (options.includes('evidence')) {
    return response.redirect('/pages/track-changes/mandatory-reconsideration/upload-new-evidence')
  }

  response.render(
    'pages/track-changes/mandatory-reconsideration/triage',
    {
      error: true
    }
  )
})





    
