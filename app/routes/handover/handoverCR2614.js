const router = require('express').Router();

// Reporting a change of income
router.post(
  '/handover/CR2614/journey/P1',
  function (req, res) {
    var wantContinue = req.body['confirm-continue']

    if (wantContinue == "Yes"){
  
      res.redirect('/handover/CR2614/journey/P2')
      
    } else {
      
      res.redirect('#')
    }
  });

// Change of income less than 25%
router.post(
  '/handover/CR2614/journey/P6',
  function (req, res) {
    var wantLetter = req.body['want-letter']

    if (wantLetter == "Yes"){
      
      res.redirect('/handover/CR2614/journey/P7')
    }  
    
    else if (wantLetter == "No"){
      
      res.redirect('#')

    } else {
      
      res.redirect('#')
    }
  });




module.exports = router;
