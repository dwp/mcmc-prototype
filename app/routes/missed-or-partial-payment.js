const router = require('express').Router();

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/mp4-can-you-speak-to-other-parent',
  function (req, res) {

    switch (req.body.speakOtherParent) {
      case 'Yes':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp5-date-of-payment');
        break;
      case 'No':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp5-date-of-payment');
        break;
      default: 
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp4-can-you-speak-to-other-parent');
        break;
    }
  }
);

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/mp5-date-of-payment',
  function (req, res) {

    switch (req.body.continueToReport) {
      case 'Yes':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp6-full-amount');
        break;
      case 'No':
        res.redirect('/pages/welcome');
        break;
      default: 
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp5-date-of-payment');
        break;
    }
  }
);

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/mp6-full-amount',
  function (req, res) {

    switch (req.body.fullAmount) {
      case 'Yes':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp6-full-amount');
        break;
      case 'No':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp7-date-of-first-missed');
        break;
      default: 
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp6-full-amount');
        break;
    }
  }
);

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/mp8-have-you-received-any',
  function (req, res) {

    switch (req.body.receivedAny) {
      case 'Yes':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp10-payment-details-1');
        break;
      case 'No':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp9-recovering-maintenance');
        break;
      default: 
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp8-have-you-received-any');
        break;
    }
  }
);

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/mp9-recovering-maintenance',
  function (req, res) {

    switch (req.body.stillCTST) {
      case 'Yes':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp11-bank-account');
        break;
      case 'No':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp9a-continue-direct-pay');
        break;
      default: 
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp9-recovering-maintenance');
        break;
    }
  }
);

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/mp7-date-of-first-missed',
  function (req, res) {

    switch (req.body.firstMissedPaymentDay) {
      case '26':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp7b-report-a-missed-payment');
        break;
      default:
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp8-have-you-received-any');
        break;
    }  
  }
);
 
router.get(
  '/pages/report-change/payments/missed-or-partial-payment/mp8-have-you-received-any',
  function (req, res, next) {
    console.log('test', req.session.data)
    next()
  }
);

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/mp11-bank-account',
  function (req, res) {
    res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp13-check-answers');
    }
);

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/mp10-payment-details-1',
  function (req, res) {
    res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp10-payment-details-2');
    }
);

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/mp10-payment-details-2',
  function (req, res) {
    res.redirect('/pages/report-change/payments/missed-or-partial-payment/mp10a-check-payment-answers');
    }
);

router.get(
  '/pages/report-change/payments/missed-or-partial-payment/mp10-payment-details-1',
  function (req, res, next) {
    console.log('test', req.session.data)
    next()
  }
);



router.post(
  '/pages/report-change/payments/missed-or-partial-payment/c&p-further-information-1',
  function (req, res) {

    switch (req.body.furtherInformation) {
      case 'Yes':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/c&p-further-information-2');
        break;
      case 'No':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/c&p-legal-enforcement-action');
        break;
      default: 
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/c&p-further-information-1');
        break;
    }
  }
);

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/c&p-legal-enforcement-action',
  function (req, res) {

    switch (req.body.findOut) {
      case 'Yes':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/c&p-enforcement-action-1');
        break;
      case 'No':
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/c&p-check-answers');
        break;
      default: 
        res.redirect('/pages/report-change/payments/missed-or-partial-payment/c&p-legal-enforcement-action');
        break;
    }
  }
);

router.post(
  '/pages/report-change/payments/missed-or-partial-payment/c&p-further-information-2',
  function (req, res) {
    res.redirect('/pages/report-change/payments/missed-or-partial-payment/c&p-legal-enforcement-action');
    }
);

router.post(
  '/pages/payments/missed-payments/c&p-enforcement-action-3',
  function (req, res) {

    switch (req.body.countrySelect) {
      case 'England or Wales':
        res.redirect('/pages/payments/missed-payments/c&p-enforcement-action-4a');
        break;
      case 'Scotland':
        res.redirect('/pages/payments/missed-payments/c&p-enforcement-action-4b');
        break;
      case 'Northern Ireland':
        res.redirect('/pages/payments/missed-payments/c&p-enforcement-action-4c');
        break;
      default: 
        res.redirect('/pages/payments/missed-payments/c&p-enforcement-action-3');
        break;
    }
  }
);

module.exports = router;