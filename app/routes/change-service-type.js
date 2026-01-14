const router = require('express').Router();

router.post(
  '/pages/report-change/payments/ctst/p5-change-payment-service',
  function (req, res) {

    switch (req.body.changeService) {
      case 'Yes':
        res.redirect('/pages/report-change/payments/ctst/p6-why');
        break;
      case 'No':
        res.redirect('/pages/report-change/payments/ctst/p5b-no');
        break;
      default: 
        res.redirect('/pages/report-change/payments/ctst/p5-change-payment-service');
        break;
    }
  }
);

router.post(
  '/pages/report-change/payments/ctst/p6-why',
  function (req, res) {

    switch (req.body.whyChangeService) {
      case 'Missed or partial payment':
        res.redirect('/pages/report-change/payments/ctst/p7-when-action-taken');
        break;
      case 'Other reason':
        res.redirect('/pages/report-change/payments/ctst/p6-why');
        break;
      default: 
        res.redirect('/pages/report-change/payments/ctst/p6-why');
        break;
    }
  }
);

router.post(
  '/pages/report-change/payments/ctst/p7-when-action-taken',
  function (req, res, next) {
    res.redirect('p9-before-you-start');
    }
);

router.post(
  '/pages/report-change/payments/ctst/p9-before-you-start',
  function (req, res, next) {
    res.redirect('p10-date-of-first-missed');
    }
);

router.post(
  '/pages/report-change/payments/ctst/p10-date-of-first-missed',
  function (req, res) {

    switch (req.body.firstMissedDay) {
      case '5':
        res.redirect('/pages/report-change/payments/ctst/p10a-5-days');
        break;
      default: 
        res.redirect('/pages/report-change/payments/ctst/p11-how-much');
        break;
    }
  }
);

router.post(
  '/pages/report-change/payments/ctst/p11-how-much',
  function (req, res, next) {
    res.redirect('p12-received-any');
    }
);

router.post(
  '/pages/report-change/payments/ctst/p12-received-any',
  function (req, res, next) {
    if (req.session.data['firstMissedAmount'] == '0' && req.body.receivedAny === 'No') {
      res.redirect('/pages/report-change/payments/ctst/p15-bank-account');
    } else if (req.session.data['firstMissedAmount'] !== '0' && req.body.receivedAny === 'No') {
      res.redirect('/pages/report-change/payments/ctst/p15-bank-account');
    } else if (req.body.receivedAny === 'Yes') {
      res.redirect('/pages/report-change/payments/ctst/p13-payment-details-1');
    } else {
      res.redirect('/pages/report-change/payments/ctst/p12-received-any')
    }
  });

  router.post(
    '/pages/report-change/payments/ctst/p13-payment-details-1',
    function (req, res, next) {
      res.redirect('/pages/report-change/payments/ctst/p13-payment-details-2');
      }
  );

  router.post(
    '/pages/report-change/payments/ctst/p13-payment-details-2',
    function (req, res, next) {
      res.redirect('/pages/report-change/payments/ctst/p14-check-payments');
      }
  );

  router.post(
    '/pages/report-change/payments/ctst/p14-check-payments',
    function (req, res, next) {
      res.redirect('/pages/report-change/payments/ctst/p15-bank-account');
      }
  );

  router.post(
    '/pages/report-change/payments/ctst/p15-bank-account',
    function (req, res, next) {
      res.redirect('/pages/report-change/payments/ctst/p16-check-answers');
      }
  );

  router.post(
    '/pages/report-change/payments/ctst/p16-check-answers',
    function (req, res, next) {
      res.redirect('/pages/report-change/payments/ctst/p17-declaration');
      }
  );
  


module.exports = router;