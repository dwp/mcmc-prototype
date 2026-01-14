const router = require('express').Router();

//Case branch
router.post(
  '/pages/report-change/income-and-expenses/income/rp-live-journey/rp-income-which-case',
  function (req, res) {
    var whichCase = req.body['which-case']

  
    if (whichCase == "noah-and-one-more"){
      
      res.redirect('/pages/report-change/income-and-expenses/income/rp-live-journey/rp-income-other-parent-income')
    } else {
      
      res.redirect('/pages/report-change/income-and-expenses/income/rp-live-journey/rp-income-duplicate-check')
    }
  });

// Reporting a change of income
router.post(
  '/pages/report-change/income-and-expenses/income/rp/start',
  function (req, res) {
    var wantContinue = req.body['confirm-continue']

    
    if (wantContinue == "Yes"){
      
      res.redirect('/pages/report-change/income-and-expenses/income/rp/income-emp')
    } else {
      
      res.redirect('/pages/welcome-rp')
    }
  });

  // Change of income less than 25%
  router.post(
  '/pages/report-change/income-and-expenses/income/rp/RTI-income-less-25',
  function (req, res) {
    var wantLetter = req.body['want-letter']

    
    if (wantLetter == "Yes"){
      
      res.redirect('/pages/report-change/income-and-expenses/income/rp/check-answers')
    }  
    
    else if (wantLetter == "No"){
      
      res.redirect('/pages/welcome-rp')

    } else {
      
      res.redirect('#')
    }
  });
  

module.exports = router;
