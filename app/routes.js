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


router.post('/pages/track-changes/mandatory-reconsideration/ask-us-to-look-again', function(request, response) {

    var askLookAgain = request.session.data['ask-look-again']
    if (askLookAgain == "no"){
        response.redirect("/pages/track-changes/mandatory-reconsideration/decided-not-to-ask")
    } else {
        response.redirect("/pages/track-changes/mandatory-reconsideration/decision-by-automated-system")
    }
})

router.post('/pages/track-changes/mandatory-reconsideration/mr-look-again-answer', function(request, response) {

    var lookAgain = request.session.data['mr-look-again']
    if (lookAgain == "yes"){
        response.redirect("/pages/track-changes/mandatory-reconsideration/triage")
    } else {
        response.redirect("/pages/track-changes/mandatory-reconsideration/triage")
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

// 2026 ENTRY POINTS - change to children entry points

router.post('/pay-or-receive-answer', function(request, response) {

    var country = request.session.data['PayorReceive']
    if (country == "pay"){
        response.redirect("/pages/welcome-pp")
    } else {
        response.redirect("/pages/welcome-rp")
    }
})

router.post('/which-child-answer-pp', function (req, res) {
    var ctWhichChild = req.body['childrentree-whichChild']

    if (ctWhichChild == "New"){
  
      res.redirect('/pages/report-change/children-tree/pp/which-other-child')
         
    } else {
        res.redirect('/pages/report-change/children-tree/pp/qc/what-has-changed')
    }
  });

  router.post('/which-other-child-answer', function (req, res) {
    var whichOtherChild = req.body['whichOtherChild']

    if (whichOtherChild == "new"){
  
      res.redirect('/pages/report-change/children-tree/pp/need-to-use-cms')
         
    } else {
        res.redirect('/pages/report-change/children-tree/pp/roc-cifba/what-has-changed')
    }
  });

router.post('/need-to-use-cms-answer', function (req, res) {
    var useCms = req.body['useCms']

    if (useCms == "yes"){
  
      res.redirect('/pages/report-change/children-tree/pp/roc-cifba/supporting-another-child')
         
    } else {
        res.redirect('/pages/report-change/children-tree/pp/qc/who-will-receive-payments')
    }
  });

router.post('/who-gets-payments-answer', function (req, res) {
    var whoReceives = req.body['whoReceives']

    if (whoReceives == "someone"){
  
      res.redirect('/pages/report-change/children-tree/pp/qc/new-application')
         
    } else {
        res.redirect('/pages/report-change/children-tree/pp/qc/before-you-continue')
    }
  });

router.post('/what-changed-pp-answer',function (req, res) {
    var whatChanged = req.body['whatChanged']

    if (whatChanged == "finance"){
  
      res.redirect('/pages/report-change/children-tree/pp/roc-cifba/primary-care/change-multi-children')
      
    } else if (whatChanged == "adoption") {
      
      res.redirect('/pages/report-change/children-tree/adoption')
   
    } else {
        res.redirect('/pages/report-change/children-tree/fte')
    }
  });

router.post('/what-changed-qc-pp-answer',function (req, res) {
    var whatChangedQCPP = req.body['whatChangedQCPP']

    if (whatChangedQCPP == "overnight"){
  
      res.redirect('/pages/report-change/children-tree/pp/qc/shared-care/change-multi-children')

    } else if (whatChangedQCPP == "main") {
      
      res.redirect('/pages/report-change/children-tree/pp/qc/primary-care/change-multi-children')
         
    } else if (whatChangedQCPP == "adopted") {
      
      res.redirect('/pages/report-change/children-tree/adoption')
   
    } else {
        res.redirect('/pages/report-change/children-tree/fte')
    }
  });

router.post('/which-child-answer-rp', function (req, res) {
    var ctWhichChild2 = req.body['childrentree-whichChild2']

    if (ctWhichChild2 == "New"){
  
      res.redirect('/pages/report-change/children-tree/rp/new-child-cms')
         
    } else {
        res.redirect('/pages/report-change/children-tree/rp/qc/what-has-changed')
    }
  });

 router.post('/what-changed-qc-rp-answer',function (req, res) {
    var whatChangedQCRP = req.body['whatChangedQCRP']

    if (whatChangedQCRP == "overnight"){
  
      res.redirect('/pages/report-change/children-tree/rp/qc/shared-care/change-multi-children')

    } else if (whatChangedQCRP == "carer") {
      
      res.redirect('/pages/report-change/children-tree/rp/qc/primary-care/change-multi-children')
         
    } else if (whatChangedQCRP == "adoption") {
      
      res.redirect('/pages/report-change/children-tree/adoption')
   
    } else {
        res.redirect('/pages/report-change/children-tree/fte')
    }
  });

router.post('/pay-outside-cms-answer', function (req, res) {
    var outsideCms = req.body['outsideCms']

    if (outsideCms == "yes"){
  
      res.redirect('/pages/report-change/children-tree/rp/qc/who-will-make-payments')
         
    } else {
        res.redirect('/pages/report-change/children-tree/rp/roc-cifba/who-financially-supports')
    }
  });


router.post('/who-pays-answer', function (req, res) {
  var whoPays = req.body['whoPays']

  if (whoPays == "someone"){
  
    res.redirect('/pages/report-change/children-tree/rp/qc/new-application')
         
  } else {
        res.redirect('/pages/report-change/children-tree/rp/qc/before-you-continue')
   }
  });

router.post('/child-on-record-answer', function (req, res) {
  var childOnRecord = req.body['childOnRecord']

  if (childOnRecord == "yes"){
  
    res.redirect('/pages/report-change/children-tree/rp/roc-cifba/what-has-changed')
         
  } else {
        res.redirect('/pages/report-change/children-tree/rp/roc-cifba/supporting-another-child')
   }
  });

router.post('/change-other-children-answer', function (req, res) {
  var changeOtherChild = req.body['changeOtherChild']

  if (changeOtherChild == "yes"){
  
    res.redirect('/pages/report-change/children-tree/rp/roc-cifba/what-has-changed')
         
    } else {
        res.redirect('/pages/report-change/children-tree/supporting-another-child')
   }
  });

  router.post('/what-changed-rp-answer',function (req, res) {
    var whatChangedRP = req.body['whatChangedRP']

    if (whatChangedRP == "finance"){
  
      res.redirect('/pages/report-change/children-tree/rp/roc-cifba/primary-care/before-you-continue')
      
    } else if (whatChangedRP== "adoption") {
      
      res.redirect('/pages/report-change/children-tree/adoption')
   
    } else {
        res.redirect('/pages/report-change/children-tree/fte')
    }
  });

  router.post('/what-changed-qc-rp-answer',function (req, res) {
    var whatChanged = req.body['whatChanged']

    if (whatChanged == "finance"){
  
      res.redirect('/pages/report-change/children-tree/change-multi-children')
      
    } else if (whatChanged == "adoption") {
      
      res.redirect('/pages/report-change/children-tree/adoption')
   
    } else {
        res.redirect('/pages/report-change/children-tree/fte')
    }
  });

  router.post('/main-carer-answer',function (req, res) {
    var mainCarer = req.body['mainCarer']

    if (mainCarer == "me"){
  
      res.redirect('/pages/report-change/children-tree/pp/qc/primary-care/before-you-continue')
      
    } else {
      
      res.redirect('#')
    }
  });

  router.post('/when-did-you-stop-multiple', function (req, res) {

    const rocNames = [].concat(req.session.data['rocName'] || [])

    if (rocNames.length > 1) {
    res.redirect('/pages/change-to-main-carer/when-did-you-stop-2')
    } else {
    res.redirect('/pages/change-to-main-carer/check-answers')
    }

  });

  router.post('/when-did-you-stop-multiple-2', function (req, res) {

    const rocNames = [].concat(req.session.data['rocName'] || [])

    if (rocNames.length > 2) {
    res.redirect('/pages/change-to-main-carer/when-did-you-stop-3')
    } else {
    res.redirect('/pages/change-to-main-carer/check-answers')
    }

  });

  router.post('/multiple-children', function (req, res) {
    const rocNames = [].concat(req.session.data['rocName'] || [])

    if (rocNames.length > 1) {
    res.redirect('/pages/change-to-main-carer/did-you-stop-at-same-time')
    } else {
    res.redirect('/pages/change-to-main-carer/when-did-you-stop')
    }

  });

  router.post('/same-stop-answer', function (req, res) {
    var sameStop = req.body['sameStop']
 
    if (sameStop == "yes"){
    
      res.redirect('/pages/change-to-main-carer/when-did-you-stop-same')
          
    } else {
          res.redirect('pages/change-to-main-carer/when-did-you-stop')
    }
    });

  router.post('/stopped-success-answer', function (req, res) {

  if (req.session.data['rocName']) {

    res.redirect('/pages/change-to-main-carer/stopped-success')

  } else {

    res.redirect('/pages/change-to-main-carer/not-stopped-success')
  }


})

  router.post('/have-you-stopped-answer', function (req, res) {
    var stoppedAnswer = req.body['stoppedFinance']
 
    if (stoppedAnswer == "yes"){
    
      res.redirect('/pages/change-to-main-carer/payments-may-change')
          
    } else {
          res.redirect('pages/change-to-main-carer/evidence')
    }
    });   

    
