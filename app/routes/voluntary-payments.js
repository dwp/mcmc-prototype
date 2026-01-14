const router = require('express').Router();
const dayjs =  require('dayjs');
/* Voluntary payment reported by other payment*/

router.post('/pages/voluntary-payment/start', (req, res, next) => {
  const voluntaryPaymentGroup = [];
  req.session.data['voluntary-payment'].sort((a,b) => {
    const dateA = dayjs(a.paymentDate, 'MM/DD/YYYY');
    const dateB = dayjs(b.paymentDate, 'MM/DD/YYYY');
    return dateB - dateA;
  });

  for( let i =0; i < req.session.data['voluntary-payment'].length; i++ ) {
    req.session.data['case'] = req.session.data['voluntary-payment'][i].case;
    let vp = [
      {
        text: dayjs(req.session.data['voluntary-payment'][i].paymentDate).format('DD MMMM YYYY')
      },
      {
        text: '£'+req.session.data['voluntary-payment'][i].amount
      }
    ];
    voluntaryPaymentGroup.push(vp);
  }

  req.session.data['vp-reported-by-other-parent'] = voluntaryPaymentGroup;
  req.session.data['show-disagree-reason'] = false;
  res.redirect('/pages/voluntary-payment/reported-by-other-parent');
});

router.post(
  '/pages/voluntary-payment/reported-by-other-parent',
  function (req, res, next) {
    req.session.isPaymentChanged = false;
    const agreeYesNo = req.session.data['agreeYesNo'];
    req.session.data['validation-errors'] = [];

    if (agreeYesNo === 'Yes') {
      res.redirect(
        '/pages/voluntary-payment/agree/check-your-answers'
      );
    } else if (agreeYesNo === 'No') {
      const voluntaryPaymentGroup = [];
      req.session.data['voluntary-payment-reported'] =[];
      req.session.data['voluntary-payment'].sort((a,b) => {
        const dateA = dayjs(a.paymentDate, 'MM/DD/YYYY');
        const dateB = dayjs(b.paymentDate, 'MM/DD/YYYY');
        return dateB - dateA;
      });
      for( let i = 0; i < req.session.data['voluntary-payment'].length; i++ ) {
        let paymentDate = req.session.data['voluntary-payment'][i].paymentDate;
        let paymentAmount = req.session.data['voluntary-payment'][i].amount;
        let vpDay = dayjs(paymentDate).get('date');
        let vpMonth =  dayjs(paymentDate).get('month')+1;
        let vpYear = dayjs(paymentDate).get('year');
        let vp = [
          {
            text: dayjs(paymentDate).format('DD MMMM YYYY')
          },
          {
            text: '£'+paymentAmount
          },
          {
            html: `<a href=/pages/voluntary-payment/disagree/change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Change</a>`
          },
          {
            html: `<a href=/pages/voluntary-payment/disagree/change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Remove</a>`
          }
        ];
        voluntaryPaymentGroup.push(vp);
      }
      req.session.data['voluntary-payment-reported'] = voluntaryPaymentGroup;
      
      res.redirect('/pages/voluntary-payment/disagree/payments-reported-by-other-parent');
    } else {
      //Error message
      req.session.data['validation-errors'] = [
        {
          text:
            'Select yes if you agree with the payment details and that all the payments were made in place if scheduled child maintenance',
          href: '/pages/voluntary-payment/reported-by-other-parent'
        },
      ];
      next();
    } 
  }
);


router.get('/pages/voluntary-payment/disagree/change-remove',
function(req, res, next){
  req.session.data['original-vpAmount'] = req.session.data['vpamount'];
  req.session.data['original-vpDay'] = req.session.data['vpDay'];
  req.session.data['original-vpMonth'] = req.session.data['vpMonth'];
  req.session.data['original-vpYear'] = req.session.data['vpYear'];
   
  let paymentAmount = req.session.data['original-vpAmount'];
  req.session.data['remove-voluntary-payment'] =[];
  let vp = [
    {
      text: dayjs(`${req.session.data['original-vpYear']}-${req.session.data['original-vpMonth']}-${req.session.data['original-vpDay']}`).format('DD MMMM YYYY')
    },
    {
      text: '£'+req.session.data['original-vpAmount']
    }
  ];
  req.session.data['remove-voluntary-payment'].push(vp);
  next();
});

router.post('/pages/voluntary-payment/disagree/change-remove',
function(req,res,next){
  req.session.isPaymentChanged = true;
  let paymentDate = `${req.session.data['payment-date-toYear']}-${req.session.data['payment-date-toMonth']}-${req.session.data['payment-date-toDay']}`;
  let originalPaymentDate = `${ req.session.data['original-vpYear']}-${req.session.data['original-vpMonth']}-${req.session.data['original-vpDay']}`;

  if (req.session.data['original-vpAmount'] === req.session.data['payment-amount'] && originalPaymentDate === paymentDate) {
    req.session.isPaymentChanged = false;
  }
  const voluntaryPaymentGroup = [];
  req.session.data['voluntary-payment-reported'] =[];
  for( let i = 0; i < req.session.data['voluntary-payment'].length; i++ ) {
    if (req.session.isPaymentChanged && (req.session.data['voluntary-payment'][i].paymentDate === originalPaymentDate || req.session.data['voluntary-payment'][i].amount === req.session.data['original-vpAmount'])) {
      req.session.data['voluntary-payment'][i].amount = req.session.data['payment-amount'];
      req.session.data['voluntary-payment'][i].paymentDate = `${req.session.data['payment-date-toYear']}-${req.session.data['payment-date-toMonth']}-${req.session.data['payment-date-toDay']}`;
    }
  }
  req.session.data['voluntary-payment'].sort((a,b) => {
    const dateA = dayjs(a.paymentDate, 'MM/DD/YYYY');
    const dateB = dayjs(b.paymentDate, 'MM/DD/YYYY');
    return dateB - dateA;
  });
  for( let i = 0; i < req.session.data['voluntary-payment'].length; i++ ) {
    let paymentDate = req.session.data['voluntary-payment'][i].paymentDate;
    let paymentAmount = req.session.data['voluntary-payment'][i].amount;
    let vpDay = dayjs(paymentDate).get('date');
    let vpMonth =  dayjs(paymentDate).get('month')+1;
    let vpYear = dayjs(paymentDate).get('year');
    let vp = [
      {
        text: dayjs(paymentDate).format('DD MMMM YYYY')
      },
      {
        text: '£'+paymentAmount
      },
      {
        html: `<a href=/pages/voluntary-payment/disagree/change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Change</a>`
      },
      {
        html: `<a href=/pages/voluntary-payment/disagree/change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Remove</a>`
      }
    ];
    voluntaryPaymentGroup.push(vp);
  }
  req.session.data['voluntary-payment-reported'] = voluntaryPaymentGroup;
  res.redirect('/pages/voluntary-payment/disagree/payments-reported-by-other-parent');
});



router.post(
  '/pages/voluntary-payment/disagree/no-change-to-payments',
  function (req, res, next) {
    const noChangeAgreeYesNo = req.session.data['noChangeAgreeYesNo'];
    req.session.data['validation-errors'] = [];

    if (noChangeAgreeYesNo === 'Yes') {
      req.session.data['show-disagree-reason'] = false;
      req.session.data['agreeYesNo'] = 'Yes';
      res.redirect(
        '/pages/voluntary-payment/agree/check-your-answers'
      );
    } else if (noChangeAgreeYesNo === 'No') {
      req.session.data['show-disagree-reason'] = true;
      res.redirect('/pages/voluntary-payment/disagree/why-do-you-disagree');
    } else {
      //Error message
      req.session.data['validation-errors'] = [
        {
          text:
            'Select yes if you agree with the payment details and that all the payments were made in place if scheduled child maintenance',
          href: '#agree',
        },
      ];
      next();
    }
   
  }
);

router.post(
  '/pages/voluntary-payment/disagree/this-is-what-you-told-us',
  function (req, res, next) {
    const whatYouToldUsYesNo = req.session.data['whatYouToldUsYesNo'];
    req.session.data['show-disagree-reason'] = true;
    req.session.data['validation-errors'] = [];

    if (whatYouToldUsYesNo === 'Yes') {

      res.redirect(
        '/pages/voluntary-payment/disagree/check-your-answers'
      );
    } else if (whatYouToldUsYesNo === 'No') {
      res.redirect('/pages/voluntary-payment/disagree/why-do-you-disagree');
    } else {
      //Error message
      req.session.data['validation-errors'] = [
        {
          text:
            'Select yes if you agree with the payment details and that all the payments were made in place if scheduled child maintenance',
          href: '#agree',
        },
      ];
      next();
    }
    
  }
);

router.post(
  '/pages/voluntary-payment/disagree/agree-payments-in-place-of-scheduled-cm',
  function (req, res, next) {
    const paymentInPlaceYesNo = req.session.data['paymentInPlaceYesNo'];
    req.session.data['validation-errors'] = [];

    if (paymentInPlaceYesNo === 'Yes') {
      res.redirect(
        '/pages/voluntary-payment/disagree/check-your-answers'
      );
    } else if (paymentInPlaceYesNo === 'No') {
      res.redirect('/pages/voluntary-payment/disagree/why-do-you-disagree');
    } else {
      //Error message
      req.session.data['validation-errors'] = [
        {
          text:
            'Select yes if you agree with the payment details and that all the payments were made in place if scheduled child maintenance',
          href: '#agree',
        },
      ];
      next();
    }
  
  }
);

router.post('/pages/voluntary-payment/disagree/add-payment', (req, res, next) => {
  req.session.isPaymentChanged = true;
  let paymentDate = dayjs(`${req.body['payment-date-toYear']}-${req.body['payment-date-toMonth']}-${req.body['payment-date-toDay']}`).format('YYYY-MM-DD');
  let vpDay = req.body['payment-date-toDay'];
  let vpMonth =  req.body['payment-date-toMonth'];
  let vpYear = req.body['payment-date-toYear'];
  let paymentAmount = req.body['payment-amount'];

  let addRow = 
    {
    paymentDate: paymentDate,
    case: req.session.data['case'],
    amount: paymentAmount
    };
  req.session.data['voluntary-payment'].push(addRow);
  req.session.data['voluntary-payment'].sort((a,b) => {
    const dateA = dayjs(a.paymentDate, 'MM/DD/YYYY');
    const dateB = dayjs(b.paymentDate, 'MM/DD/YYYY');
    return dateB - dateA;
  });

  const voluntaryPaymentGroup = [];
  req.session.data['voluntary-payment-reported'] =[];
  for( let i = 0; i < req.session.data['voluntary-payment'].length; i++ ) {
    let paymentDate = req.session.data['voluntary-payment'][i].paymentDate;
    let paymentAmount = req.session.data['voluntary-payment'][i].amount;
    let vpDay = dayjs(paymentDate).get('date');
    let vpMonth =  dayjs(paymentDate).get('month')+1;
    let vpYear = dayjs(paymentDate).get('year');
    let vp = [
      {
        text: dayjs(paymentDate).format('DD MMMM YYYY')
      },
      {
        text: '£'+paymentAmount
      },
      {
        html: `<a href=/pages/voluntary-payment/disagree/change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Change</a>`
      },
      {
        html: `<a href=/pages/voluntary-payment/disagree/change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Remove</a>`
      }
    ];
    voluntaryPaymentGroup.push(vp);
  }
  req.session.data['voluntary-payment-reported'] = voluntaryPaymentGroup;

  res.redirect('/pages/voluntary-payment/disagree/payments-reported-by-other-parent');
});

router.post('/pages/voluntary-payment/disagree/no-payments', (req, res, next) => {
  req.session.isPaymentChanged = true;
  res.redirect('/pages/voluntary-payment/disagree/check-your-answers');
});


router.post('/pages/voluntary-payment/agree/check-your-answers', (req, res, next) => {
  res.redirect('/pages/voluntary-payment/agree/declaration');
});

router.post('/pages/voluntary-payment/disagree/check-your-answers', (req, res, next) => {
  res.redirect('/pages/voluntary-payment/disagree/declaration');
});


router.post('/pages/voluntary-payment/disagree/why-do-you-disagree', (req, res, next) => {
  req.session.data['reason-to-disagree'] = req.session.data['reason'];
  const truncate = (str, max, suffix) => str.length <= max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
  req.session.data['truncated-reason'] = truncate(req.session.data['reason-to-disagree'], 50, '...');
  res.redirect('/pages/voluntary-payment/disagree/this-is-what-you-told-us');
});

router.post('/pages/voluntary-payment/disagree/remove-payment', (req, res, next) => {
  let originalPaymentDate = `${ req.session.data['original-vpYear']}-${req.session.data['original-vpMonth']}-${req.session.data['original-vpDay']}`;
  for( let i =0; i < req.session.data['voluntary-payment'].length; i++ ) {
    if (req.session.data['voluntary-payment'][i].paymentDate === originalPaymentDate || req.session.data['voluntary-payment'][i].amount === req.session.data['original-vpAmount']) {
      req.session.data['voluntary-payment'].splice(i,1);
    }
  }
  const voluntaryPaymentGroup = [];
  req.session.data['voluntary-payment-reported'] =[];
  for( let i = 0; i < req.session.data['voluntary-payment'].length; i++ ) {
    let paymentDate = req.session.data['voluntary-payment'][i].paymentDate;
    let paymentAmount = req.session.data['voluntary-payment'][i].amount;
    let vpDay = dayjs(paymentDate).get('date');
    let vpMonth =  dayjs(paymentDate).get('month')+1;
    let vpYear = dayjs(paymentDate).get('year');
    let vp = [
      {
        text: dayjs(paymentDate).format('DD MMMM YYYY')
      },
      {
        text: '£'+paymentAmount
      },
      {
        html: `<a href=/pages/voluntary-payment/disagree/change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Change</a>`
      },
      {
        html: `<a href=/pages/voluntary-payment/disagree/change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Remove</a>`
      }
    ];
    voluntaryPaymentGroup.push(vp);
  }
  req.session.data['voluntary-payment-reported'] = voluntaryPaymentGroup;
  req.session.isPaymentChanged = true;
  if (req.session.data['voluntary-payment'].length <= 0){
    req.session.data['show-disagree-reason'] = false;
    res.redirect('/pages/voluntary-payment/disagree/no-payments');
  } else {
    res.redirect('/pages/voluntary-payment/disagree/payments-reported-by-other-parent');
  }
});

router.post('/pages/voluntary-payment/disagree/payments-reported-by-other-parent', (req, res, next) => {
  if (!req.session.isPaymentChanged) {
    res.redirect('/pages/voluntary-payment/disagree/no-change-to-payments');
  } else {
    res.redirect('/pages/voluntary-payment/disagree/agree-payments-in-place-of-scheduled-cm');
  }
});

// Report change -  voluntary payment journey

router.post('/pages/report-change/voluntary-payments/voluntary-payments-start', (req,res,next) => {
  req.session.data['voluntary-payments-details'] = [];
  req.session.isPaymentChanged = true;
  if (req.session.data['userType'] === 'NRP') {
    req.session.data['pp-dual-cases'] = req.session.data['pp-cases'];
    req.session.data['voluntary-payments-userType'] = 'NRP';
  }
  if (req.session.data['userType'] === 'Both') {
    req.session.data['pp-dual-cases'] = req.session.data['both-cases'];
  }
  if (req.session.data['userType'] === 'PWC') {
    req.session.data['pp-dual-cases'] = req.session.data['rp-cases'];
    req.session.data['voluntary-payments-userType'] = 'PWC';
  }

  if (req.session.data['pp-dual-cases'].length === 1) {
    req.session.data['voluntary-payment-case'] = req.session.data['pp-dual-cases'][0].case;
  } else if (req.session.data['pp-dual-cases'].length > 1) {
    req.session.data['dual-cases'] = [];
    for (let i = 0; i <req.session.data['pp-dual-cases'].length; i++ ) {
      let vpCase ={};
      if (req.session.data['pp-dual-cases'][i].userType === 'NRP') {
        vpCase = {
          value: `${req.session.data['pp-dual-cases'][i].case}`,
          text: `Pay child maintenance for ${req.session.data['pp-dual-cases'][i].case}`
        }
      } else {
        vpCase = {
          value: `${req.session.data['pp-dual-cases'][i].case}`,
          text: `Receive child maintenance for ${req.session.data['pp-dual-cases'][i].case}`
        }
      }

      req.session.data['dual-cases'].push(vpCase);
    }
  }


  if (req.session.data['pp-dual-cases'].length === 1) {
    let duplicateSRFound = false;
    for (let i = 0; i < req.session.data['voluntary-payment'].length; i++ ) {
      if (req.session.data['voluntary-payment'][i].case === req.session.data['voluntary-payment-case']) {
        duplicateSRFound = true;
      }
    }
    if (duplicateSRFound) {
      res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-existing');
    } else {
      res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-details');
    }
  } else {
    res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-which-case');
  } 
});



router.post('/pages/report-change/voluntary-payments/voluntary-payments-details', (req, res, next) => {
  
  let paymentDate = dayjs(`${req.body['payment-date-toYear']}-${req.body['payment-date-toMonth']}-${req.body['payment-date-toDay']}`).format('YYYY-MM-DD');
  let paymentAmount = req.body['payment-amount'];
  
  let addRow = 
    {
    case: req.session.data['voluntary-payment-case'],
    paymentDate: paymentDate,
    amount: paymentAmount
    };
  req.session.data['voluntary-payments-details'].push(addRow);

  const voluntaryPaymentsRecorded = [];
  req.session.data['voluntary-payment-reported'] =[];
  for( let i = 0; i < req.session.data['voluntary-payments-details'].length; i++ ) {
    let paymentDate = req.session.data['voluntary-payments-details'][i].paymentDate;
    let paymentAmount = req.session.data['voluntary-payments-details'][i].amount;
    let vpDay = dayjs(paymentDate).get('date');
    let vpMonth =  dayjs(paymentDate).get('month')+1;
    let vpYear = dayjs(paymentDate).get('year');
    let vp = [
      {
        text: dayjs(paymentDate).format('DD MMMM YYYY')
      },
      {
        text: '£'+paymentAmount
      },
      {
        html: `<a href=/pages/report-change/voluntary-payments/voluntary-payments-change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Change</a>`
      },
      {
        html: `<a href=/pages/report-change/voluntary-payments/voluntary-payments-change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Remove</a>`
      }
    ];
    voluntaryPaymentsRecorded.push(vp);
  }
  req.session.data['voluntary-payment-reported'] = voluntaryPaymentsRecorded;

  res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-report-another');
});

router.post('/pages/report-change/voluntary-payments/voluntary-payments-which-case', (req,res,next) => {
  let whichCase = req.body['whichCase'];
  req.session.data['voluntary-payment-case'] = whichCase;
  let duplicateSRFound = false;
  for (let i=0; i < req.session.data['pp-dual-cases'].length; i++) {
    if (req.session.data['pp-dual-cases'][i].case === whichCase ) {
      req.session.data['voluntary-payments-userType'] = req.session.data['pp-dual-cases'][i].userType;
    }
  }

  for (let i = 0; i < req.session.data['voluntary-payment'].length; i++ ) {
    if (req.session.data['voluntary-payment'][i].case === whichCase) {
      duplicateSRFound = true;
    }
  }
  if (duplicateSRFound) {
    res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-existing');
  } else {
    res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-details');
  }
});

router.post(
  '/pages/report-change/voluntary-payments/voluntary-payments-report-another',
  function (req, res, next) {
    const addAnotherYesNo = req.session.data['addAnotherYesNo'];
    req.session.data['validation-errors'] = [];

    if (addAnotherYesNo === 'Yes') {
      res.redirect(
        '/pages/report-change/voluntary-payments/voluntary-payments-add'
      );
    } else if (addAnotherYesNo === 'No') {
      res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-evidence');
    } else {
      //Error message
      req.session.data['validation-errors'] = [
        {
          text:
            'Select yes if you agree with the payment details and that all the payments were made in place if scheduled child maintenance',
          href: '/pages/voluntary-payment/reported-by-other-parent'
        },
      ];
      next();
    } 
  }
);

router.post('/pages/report-change/voluntary-payments/voluntary-payments-add', (req, res, next) => {
  
  let paymentDate = dayjs(`${req.body['payment-date-toYear']}-${req.body['payment-date-toMonth']}-${req.body['payment-date-toDay']}`).format('YYYY-MM-DD');
  let paymentAmount = req.body['payment-amount'];
  
  let addRow = 
    {
    paymentDate: paymentDate,
    case: req.session.data['voluntary-payment-case'],
    amount: paymentAmount
    };
  req.session.data['voluntary-payments-details'].push(addRow);
  req.session.data['voluntary-payments-details'].sort((a,b) => {
    const dateA = dayjs(a.paymentDate, 'MM/DD/YYYY');
    const dateB = dayjs(b.paymentDate, 'MM/DD/YYYY');
    return dateB - dateA;
  });

  const voluntaryPaymentsRecorded = [];
  req.session.data['voluntary-payments-reported'] =[];
  for( let i = 0; i < req.session.data['voluntary-payments-details'].length; i++ ) {
    let paymentDate = req.session.data['voluntary-payments-details'][i].paymentDate;
    let paymentAmount = req.session.data['voluntary-payments-details'][i].amount;
    let vpDay = dayjs(paymentDate).get('date');
    let vpMonth =  dayjs(paymentDate).get('month')+1;
    let vpYear = dayjs(paymentDate).get('year');
    let vp = [
      {
        text: dayjs(paymentDate).format('DD MMMM YYYY')
      },
      {
        text: '£'+paymentAmount
      },
      {
        html: `<a href=/pages/report-change/voluntary-payments/voluntary-payments-change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Change</a>`
      },
      {
        html: `<a href=/pages/report-change/voluntary-payments/voluntary-payments-change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Remove</a>`
      }
    ];
    voluntaryPaymentsRecorded.push(vp);
  }
  req.session.data['voluntary-payment-reported'] = voluntaryPaymentsRecorded;
  res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-report-another'); 
});

router.post(
  '/pages/report-change/voluntary-payments/voluntary-payments-evidence',
  function (req, res, next) {
    const evidenceYesNo = req.session.data['evidenceYesNo'];
    req.session.data['validation-errors'] = [];
    
    if (evidenceYesNo === 'Yes' || evidenceYesNo === 'No') {
      res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-review');
    }  else {
      //Error message
      req.session.data['validation-errors'] = [
        {
          text:
            'Select yes if you agree with the payment details and that all the payments were made in place if scheduled child maintenance',
          href: '/pages/voluntary-payment/reported-by-other-parent'
        },
      ];
      next();
    } 
  }
);

router.get('/pages/report-change/voluntary-payments/voluntary-payments-change-remove',
function(req, res, next){
  req.session.data['original-vpAmount'] = req.session.data['vpamount'];
  req.session.data['original-vpDay'] = req.session.data['vpDay'];
  req.session.data['original-vpMonth'] = req.session.data['vpMonth'];
  req.session.data['original-vpYear'] = req.session.data['vpYear'];
   
  let paymentAmount = req.session.data['original-vpAmount'];
  req.session.data['remove-voluntary-payment'] =[];
  let vp = [
    {
      text: dayjs(`${req.session.data['vpYear']}-${req.session.data['vpMonth']}-${req.session.data['vpDay']}`).format('DD MMMM YYYY')
    },
    {
      text: '£'+req.session.data['vpamount']
    }
  ];
  req.session.data['remove-voluntary-payment'].push(vp);
  next();
});

router.post('/pages/report-change/voluntary-payments/voluntary-payments-change-remove',
function(req,res,next){
  let paymentDate = `${req.body['payment-date-toYear']}-${req.body['payment-date-toMonth']}-${req.body['payment-date-toDay']}`;
  let originalPaymentDate = `${ req.session.data['original-vpYear']}-${req.session.data['original-vpMonth']}-${req.session.data['original-vpDay']}`;

  if (req.session.data['original-vpAmount'] === req.session.data['payment-amount'] && originalPaymentDate === paymentDate) {
    req.session.isPaymentChanged = false;
  }
  const voluntaryPaymentsRecorded = [];
  req.session.data['voluntary-payment-reported'] =[];
  for( let i = 0; i < req.session.data['voluntary-payments-details'].length; i++ ) {
    if (req.session.isPaymentChanged && (req.session.data['voluntary-payments-details'][i].paymentDate === originalPaymentDate || req.session.data['voluntary-payments-details'][i].amount === req.session.data['original-vpAmount'])) {
      req.session.data['voluntary-payments-details'][i].amount = req.session.data['payment-amount'];
      req.session.data['voluntary-payments-details'][i].paymentDate = `${req.session.data['payment-date-toYear']}-${req.session.data['payment-date-toMonth']}-${req.session.data['payment-date-toDay']}`;
    }
  }
  req.session.data['voluntary-payments-details'].sort((a,b) => {
    const dateA = dayjs(a.paymentDate, 'MM/DD/YYYY');
    const dateB = dayjs(b.paymentDate, 'MM/DD/YYYY');
    return dateB - dateA;
  });

  for( let i = 0; i < req.session.data['voluntary-payments-details'].length; i++ ) {
    let paymentDate = req.session.data['voluntary-payments-details'][i].paymentDate;
    let paymentAmount = req.session.data['voluntary-payments-details'][i].amount;
    let vpDay = dayjs(paymentDate).get('date');
    let vpMonth =  dayjs(paymentDate).get('month')+1;
    let vpYear = dayjs(paymentDate).get('year');
    let vp = [
      {
        text: dayjs(paymentDate).format('DD MMMM YYYY')
      },
      {
        text: '£'+paymentAmount
      },
      {
        html: `<a href=/pages/report-change/voluntary-payments/voluntary-payments-change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Change</a>`
      },
      {
        html: `<a href=/pages/report-change/voluntary-payments/voluntary-payments-change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Remove</a>`
      }
    ];
    voluntaryPaymentsRecorded.push(vp);
  }
 
  req.session.data['voluntary-payment-reported'] = voluntaryPaymentsRecorded;
  res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-review');
});

router.post('/pages/report-change/voluntary-payments/voluntary-payments-remove', (req, res, next) => {
  let originalPaymentDate = `${ req.session.data['original-vpYear']}-${req.session.data['original-vpMonth']}-${req.session.data['original-vpDay']}`;
  for( let i =0; i < req.session.data['voluntary-payments-details'].length; i++ ) {
    if (req.session.data['voluntary-payments-details'][i].paymentDate === originalPaymentDate || req.session.data['voluntary-payments-details'][i].amount === req.session.data['original-vpAmount']) {
      req.session.data['voluntary-payments-details'].splice(i,1);
    }
  }
  req.session.data['voluntary-payments-details'].sort((a,b) => {
    const dateA = dayjs(a.paymentDate, 'MM/DD/YYYY');
    const dateB = dayjs(b.paymentDate, 'MM/DD/YYYY');
    return dateB - dateA;
  });
  const voluntaryPaymentsRecorded = [];
  req.session.data['voluntary-payment-reported'] =[];
  for( let i = 0; i < req.session.data['voluntary-payments-details'].length; i++ ) {
    let paymentDate = req.session.data['voluntary-payments-details'][i].paymentDate;
    let paymentAmount = req.session.data['voluntary-payments-details'][i].amount;
    let vpDay = dayjs(paymentDate).get('date');
    let vpMonth =  dayjs(paymentDate).get('month')+1;
    let vpYear = dayjs(paymentDate).get('year');
    let vp = [
      {
        text: dayjs(paymentDate).format('DD MMMM YYYY')
      },
      {
        text: '£'+paymentAmount
      },
      {
        html: `<a href=/pages/report-change/voluntary-payments/voluntary-payments-change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Change</a>`
      },
      {
        html: `<a href=/pages/report-change/voluntary-payments/voluntary-payments-change-remove?vpamount=${paymentAmount}&vpDay=${vpDay}&vpMonth=${vpMonth}&vpYear=${vpYear} class='goukuk-link'>Remove</a>`
      }
    ];
    voluntaryPaymentsRecorded.push(vp);
  }
  req.session.data['voluntary-payment-reported'] = voluntaryPaymentsRecorded;
  res.redirect('/pages/report-change/voluntary-payments/voluntary-payments-review');
});

module.exports = router;