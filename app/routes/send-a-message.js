const router = require('express').Router();

router.post('/pages/send-a-message/subject', function (req, res, next) {
  req.session.data['validation-errors'] = [];

  req.session.data['subject'] = req.body.subject || null;

  let messageRedirect = '';
  if (req.session.data['multi-case']) {
    messageRedirect = 'case-select';
  } else {
    req.session.data['case'] = req.session.data['single-case-name'];
    messageRedirect = 'write-message';
  }

  switch (req.body.subject) {
    case 'Responding to a request':
      res.redirect(`/pages/send-a-message/${messageRedirect}`);
      break;
    case 'Missing payment':
      res.redirect('/pages/send-a-message/missing-payment'); // missed payments page, via page 8
      break;
    case 'Payments calculation query':
      res.redirect(`/pages/send-a-message/${messageRedirect}`);
      break;
    case 'Payments schedule query':
      res.redirect(`/pages/send-a-message/${messageRedirect}`);
      break;
    case 'General query':
      res.redirect(`/pages/send-a-message/${messageRedirect}`);
      break;
    case 'Method of payment':
      req.session.data['redirect'] = 'report-change';
      res.redirect('/pages/send-a-message/report-immediately'); // report change landing, via page 8
      break;
    case 'Change of income':
      res.redirect('/pages/send-a-message/change-income'); // change of income page, via page 8
      break;
    case 'Change to number of children in your household':
      req.session.data['redirect'] = 'report-change';
      res.redirect('/pages/send-a-message/report-immediately'); // report a change landing, via page 8
      break;
    case 'Change to number of nights you have your child':
      res.redirect('/pages/send-a-message/shared-care'); // share care page, via page 8
      break;
    case 'Other':
      req.session.data['redirect'] = 'report-change';
      res.redirect('/pages/send-a-message/report-immediately'); // report change landing, via page 8
      break;
    case 'Complaint':
      res.redirect(`/pages/send-a-message/${messageRedirect}`);
      break;
    default:
      // send back an error
      res.redirect('/pages/send-a-message/subject#differentSelection');
  }
});

router.post(
  '/pages/send-a-message/report-immediately',
  function (req, res, next) {
    req.session.data['validation-errors'] = [];

    if (req.body.reportOrSendMessage === 'yes') {
      res.redirect('/pages/report-change');
    } else if (req.body.reportOrSendMessage === 'no') {
      if (req.session.data['multi-case']) {
        res.redirect('/pages/send-a-message/case-select');
      } else {
        req.session.data['case'] = req.session.data['single-case-name'];
        res.redirect('/pages/send-a-message/write-message');
      }
    } else {
      res.redirect(
        '/pages/send-a-message/report-immediately#differentSelection'
      );
    }
  }
);

router.post('/pages/send-a-message/missing-payment', function (req, res, next) {
  req.session.data['validation-errors'] = [];

  if (req.body.reportOrSendMessage === 'yes') {
    res.redirect('/pages/report-change/missing-payment/missing-payment-start');
  } else if (req.body.reportOrSendMessage === 'no') {
    if (req.session.data['multi-case']) {
      res.redirect('/pages/send-a-message/which-case');
    } else {
      req.session.data['case'] = 'No case';
      res.redirect('/pages/send-a-message/write-message');
    }
  } else {
    res.redirect('/pages/send-a-message/missing-payment#differentSelection');
  }
});


router.post('/pages/send-a-message/change-income', function (req, res, next) {
  req.session.data['validation-errors'] = [];

  if (req.body.reportOrSendMessage === 'yes') {
    res.redirect('/pages/report-change/change-income/change-income-start');
  } else if (req.body.reportOrSendMessage === 'no') {
    if (req.session.data['multi-case']) {
      res.redirect('/pages/send-a-message/case-select');
    } else {
      req.session.data['case'] = req.session.data['single-case-name'];
      res.redirect('/pages/send-a-message/write-message');
    }
  } else {
    res.redirect('/pages/send-a-message/missing-payment#differentSelection');
  }
});


router.post('/pages/send-a-message/shared-care', function (req, res, next) {
  req.session.data['validation-errors'] = [];

  if (req.body.reportOrSendMessage === 'yes') {
    res.redirect('/pages/report-change/shared-care/shared-care-start');
  } else if (req.body.reportOrSendMessage === 'no') {
    if (req.session.data['multi-case']) {
      res.redirect('/pages/send-a-message/case-select');
    } else {
      req.session.data['case'] = req.session.data['single-case-name'];
      res.redirect('/pages/send-a-message/write-message');
    }
  } else {
    res.redirect('/pages/send-a-message/missing-payment#differentSelection');
  }
});


router.post('/pages/send-a-message/which-case', function (req, res, next) {
    req.session.data['case'] = req.body.whichCase || null;
    if (req.body.whichCase === 'C Smith' || req.body.whichCase === 'M Welch') {
      res.redirect('/pages/send-a-message/write-message');
    } else {
      res.redirect('/pages/send-a-message/which-case#differentSelection'); // show error message
    }
});


router.post('/pages/send-a-message/case-select', (req, res, next) => {
  req.session.data['case'] = req.body.whichCase || null;
    if (req.body.whichCase === 'C Smith' || req.body.whichCase === 'M Welch' || req.body.whichCase === 'No specific case') {
      res.redirect('/pages/send-a-message/write-message');
    } else {
      res.redirect('/pages/send-a-message/which-case#differentSelection'); // show error message
    }
});


router.post('/pages/send-a-message/write-message', (req, res, next) => {
  let formErrorsGovukArray = [];
  if (req.body.writeMessageContent === '') {
    formErrorsGovukArray.push({
      text: 'Enter a message',
      href: '#writeMessageContent',
    });
    req.session.data['validation-errors'] = formErrorsGovukArray;
  }
  if (formErrorsGovukArray == '') {
    req.session.data['messageContent'] = req.body.writeMessageContent;
    res.redirect('/pages/send-a-message/check-message');
  } else if (formErrorsGovukArray.length > 0) {
    next();
  } else {
    res.redirect('/pages/send-a-message/write-message');
  }
});

router.post('/pages/send-a-message/check-message', (req, res, next) => {
  res.redirect('/pages/send-a-message/declaration');
});



module.exports = router;
