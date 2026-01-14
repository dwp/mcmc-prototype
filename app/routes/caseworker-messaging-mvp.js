const router = require('express').Router();

// Reporting a change of income
router.post(
  '/pages/caseworker-messaging-mvp/request-start',
  function (req, res) {
    var evidenceContinue = req.body['evidence-confirm']

    if (evidenceContinue == "Yes"){
  
      res.redirect('/pages/messages/upload-evidence/start-messaging-mvp')
      
    } else if (evidenceContinue == "No") {
      
      res.redirect('/pages/caseworker-messaging-mvp/request-no')
   
    } else {
        res.redirect('/pages/caseworker-messaging-mvp/request-later')
    }
  });

   router.post(
    '/pages/my-details-and-circumstances/call-times/call-times',
    function (req, res) {
      var preference = req.body['preference']
  
      if (preference == "none"){
    
        res.redirect('letters')

      } else {
          res.redirect('check-answers')
      }
    });


module.exports = router;
