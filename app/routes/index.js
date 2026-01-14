const router = require('express').Router();

// import routes
const my_details_routes = require('./my-details-and-circumstances');
const leaving_full_time_education = require('./leaving-full-time-education');
const addtional_income = require('./additional-income');
const send_a_message = require('./send-a-message');
const file_upload = require('./file-upload');
const messages = require('./messages');
const track_changes = require('./track-changes');
const voluntary_payment = require('./voluntary-payments');
const missed_or_partial_payment = require('./missed-or-partial-payment');
const rp_change_income = require('./rp-change-income');
const ctst = require('./change-service-type');
const pp_change_income = require('./pp-change-income');
const statements = require('./statements');
const caseworker_messaging_mvp = require('./caseworker-messaging-mvp');
const shared_care = require('./shared-care');
const changeservice = require('./ctst');

// handover routes
const handoverCR2614 = require('./handover/handoverCR2614');

// homepage routes
router.get('/pages/welcome', function (req, res, next) {
  res.locals.activeLink = 'home';
  next();
});

router.get('/pages/welcome-new', function (req, res, next) {
  res.locals.activeLink = 'home';
  next();
});


router.get('/pages/welcome-pp', function (req, res, next) {
  res.locals.activeLink = 'home';
  next();
});

router.get('/pages/welcome-rp', function (req, res, next) {
  res.locals.activeLink = 'home';
  next();
});

router.get('/pages/welcome-pp-multi', function (req, res, next) {
  res.locals.activeLink = 'home';
  next();
});

router.get('/pages/welcome-rp-B', function (req, res, next) {
  res.locals.activeLink = 'home';
  next();
});

router.get('/pages/messages', function (req, res, next) {
  res.locals.activeLink = 'messages';
  next();
});

router.get('/pages/report-change', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

//Regular expression to get all pages that include pages/payments in the url and set payments to active menu link
router.get(/\pages\/payments/, function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

//Regular expression to get all pages that include pages/payments in the url
router.get(/\pages\/report-change/, function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/payments/which-payments', function (req, res, next) {
  res.locals.activeLink = 'payments';
  return res.render('pages/payments/which-payments/pp-multiple-direct');
});

router.get('/pages/payments/payments-you-make/direct', function (req, res, next) {
  res.locals.activeLink = 'payments';
  return res.redirect('/pages/payments/summary/direct-pay/pp-direct');
});

router.get('/pages/payments/payments-you-make/collect', function (req, res, next) {
  res.locals.activeLink = 'payments';
  return res.redirect('/pages/payments/summary/collect-pay/pp-collect');
});

router.get('/pages/payments/payments-you-receive/direct', function (req, res, next) {
  res.locals.activeLink = 'payments';
  return res.redirect('/pages/payments/summary/direct-pay/rp-direct');
});

router.get('/pages/payments/payments-you-receive/collect', function (req, res, next) {
  res.locals.activeLink = 'payments';
  return res.redirect('/pages/payments/summary/collect-pay/rp-collect');
});

router.get('/pages/payments/summary/collect-pay/pp-collect', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/summary/collect-pay/rp-collect', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/summary/collect-pay/pp-collect-b', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/summary/direct-pay/pp-direct-b', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/which-payments/pp-multiple-b', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/summary/direct-pay/rp-direct-b', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/payment-calculations/pp-calculations', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/payment-calculations/rp-calculations', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/payment-calculations/pp-calculations-multi', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/payment-calculations/rp-calculations-b', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/payment-plan/pp-collect', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/payment-history/pp-collect-all-payments', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/payments/payment-history/rp-collect-all-payments', function (req, res, next) {
  res.locals.activeLink = 'payments';
  next();
});

router.get('/pages/track-changes', function (req, res, next) {
  res.locals.activeLink = 'track-changes';
  next();
});

router.get('/pages/my-case-details', function (req, res, next) {
  res.locals.activeLink = 'my-case-details';
  next();
});

//Missed or partial payment - report a change 

router.get('/pages/report-change/payments', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp2-start', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp2-start', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp4-can-you-speak-to-other-parent', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp5-date-of-payment', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp6-full-amount', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp7-date-of-first-missed', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp7b-report-a-missed-payment', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp8-have-you-received-any', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp9-recovering-maintenance', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp9a-continue-direct-pay', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp10-payment-details', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp10a-check-payment-answers', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp11-bank-account', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp13-check-answer', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp14-declaration', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.get('/pages/report-change/payments/missed-or-partial-payment/mp15-confirmation', function (req, res, next) {
  res.locals.activeLink = 'report-change';
  next();
});

router.post(
  '/pages/payments/missed-payments/scenarios', 
  function (req, res) {

    switch (req.body.scenario) {
      case '1':
        res.redirect('/pages/payments/missed-payments/deo-set-up');
        break;
      case '2':
        res.redirect('/pages/payments/missed-payments/enforcement-action');
        break;
        case '3':
        res.redirect('/pages/payments/missed-payments/c&p-bank-details');
        break;
        
      default: 
        res.redirect('/pages/payments/missed-payments/scenarios');
        break;
    }
  }
  );
  router.post(
  '/pages/payments/missed-payments/enforcement/scenarios',
  function (req, res) {

    switch (req.body.scenario) {
      case '1':
        res.redirect('/pages/payments/missed-payments/enforcement/liability-order');
        break;
      case '2':
        res.redirect('/pages/payments/missed-payments/enforcement/enforce-agents');
        break;
      case '3':
        res.redirect('/pages/welcome-rp');
        break;
      default: 
        res.redirect('/pages/payments/missed-payments/enforcement/scenarios');
        break;
    }
  }
  );


// use routes
router.use('/', my_details_routes);
router.use('/', leaving_full_time_education);
router.use('/', addtional_income);
router.use('/', send_a_message);
router.use('/', file_upload);
router.use('/', messages);
router.use('/', track_changes);
router.use('/', voluntary_payment);
router.use('/', missed_or_partial_payment);
router.use('/', rp_change_income);
router.use('/', ctst);
router.use('/', pp_change_income);
router.use('/', statements);
router.use('/', handoverCR2614);
router.use('/', caseworker_messaging_mvp);
router.use('/', shared_care);
router.use('/', changeservice);


module.exports = router;
