const router = require('express').Router();

//Case branch
router.post(
  '/pages/report-change/income-and-expenses/income/pp/p1-start',
  function (req, res) {

    switch (req.body.stillWantReport) {
      case 'Yes':
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p2-status');
        break;
      case 'No':
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p1-start');
        break;
      default: 
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p1-start');
        break;
    }
  }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p2-status',
  function (req, res) {

    switch (req.body.employmentStatus) {
      case 'Employed':
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p3-before-you-start');
        break;
      case 'Self Employed':
        res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p3-before-you-start');
        break;
      default: 
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p2-status');
        break;
    }
  }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p4-effective-date',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p5-date-paid');
    }
);


router.post(
  '/pages/report-change/income-and-expenses/income/pp/p5-date-paid',
  function (req, res) {
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p6-income');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p6-income',
  function (req, res) {
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p7-bonus');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p7-bonus',
  function (req, res) {
    switch (req.body.bonus) {
      case 'Yes':
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p8-any-benefits');
        break;
      case 'No':
        req.session.data['bonus-amount'] = 0;
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p8-any-benefits');
        break;
      default: 
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p7-bonus');
        break; 
    }
  }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p8-any-benefits',
  function (req, res) {
    switch (req.body.benefits) {
      case 'Yes':
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p10-pension-contributions');
        break;
      case 'No':
        req.session.data['benefits-amount'] = 0;
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p10-pension-contributions');
        break;
      default: 
        res.redirect('/pages/report-change/income-and-expenses/income/pp/p8-any-benefits');
        break; 
    }
  }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p10-pension-contributions',
  function (req, res) {
    if (req.body.employerPensions == 'No') {
      req.session.data['employer-pension-amount'] = 0;
    }
    if (req.body.privatePension == 'No') {
      req.session.data['private-pension-amount'] = 0;
    }
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p11-pension-income');
  }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p11-pension-income',
  function (req, res) {
    if (req.body.pensionIncome == 'No') {
      req.session.data['pension-income-amount'] = 0;
    }
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p12-total-income');
  }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p12-total-income',
  function (req, res) {
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p12a-same-amount');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p12a-same-amount',
  function (req, res) {
    const income = req.session.data['income'];
    console.log('test', req.body.income)
    if (req.body.paySameOrSimilar == 'No') {
      res.redirect('/pages/report-change/income-and-expenses/income/pp/p13-income-stability');
    }
    if (income < 24369 ) {
      res.redirect('/pages/report-change/income-and-expenses/income/pp/p14-evidence');
    }
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p15-check-your-answers');
  }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p13-income-stability',
  function (req, res) {
    const income = req.session.data['income'];
    if (income < 24369 ) {
      res.redirect('/pages/report-change/income-and-expenses/income/pp/p14-evidence');
    }
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p15-check-your-answers');
    }
);


router.post(
  '/pages/report-change/income-and-expenses/income/pp/p14-evidence',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p15-check-your-answers');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p15-check-your-answers',
  function (req, res) {
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p16-declaration');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/p16-declaration',
  function (req, res) {
  const income = req.session.data['income'];
    if (income < 24369 ) {
      res.redirect('/pages/report-change/income-and-expenses/income/pp/p17-confirmation');
    }
    res.redirect('/pages/report-change/income-and-expenses/income/pp/p17b-confirmation-no-evidence');
    }
);




router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p4-effective-date',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p5-self-assessment');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p5-self-assessment',
  function (req, res) {
    if (req.body.selfAssessment == 'Yes') {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p7b-self-employed-date');
    }
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p6-employment-date');
  }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p7b-self-employed-date',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p7c-self-employed-profit');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p7c-self-employed-profit',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p10-private-pension');
    }
);


router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p6-employment-date',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p7-accounting-ends');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p7-accounting-ends',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p8-income');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p8-income',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p9-expenses');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p9-expenses',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p10-private-pension');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p10-private-pension',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p11-income-pension');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p11-income-pension',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p12-pension-received');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p12-pension-received',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p13-yearly-gross');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p13-yearly-gross',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p14-check-answers');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p14-check-answers',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p15-declaration');
    }
);

router.post(
  '/pages/report-change/income-and-expenses/income/pp/se/p15-declaration',
  function (req, res) {
    console.log('test', req.session.data)
    res.redirect('/pages/report-change/income-and-expenses/income/pp/se/p16-confirmation');
    }
);



module.exports = router;
