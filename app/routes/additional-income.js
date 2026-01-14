/* Additional Income which case*/
router.post(
  '/pages/additional-income/additional-income-which-case',
  function (req, res, next) {
    req.session.data['validation-errors'] = [];

    if (req.session.data['which-case'] === undefined) {
      req.session.data['validation-errors'] = [
        {
          text: 'Select the case you are reporting additional income for',
          href: '#which-case',
        },
      ];
      next();
    } else {
      if (req.session.data['which-case'] === 'payingParent') {
        req.session.data['additionalIncomeUserType'] = 'NRP';
      } else if (req.session.data['which-case'] === 'receivingParent') {
        req.session.data['additionalIncomeUserType'] = 'PWC';
      }
      res.redirect('/pages/additional-income/additional-income-start');
    }
  }
);

/* Additional Income start*/
router.get(
  '/pages/additional-income/additional-income-start',
  function (req, res) {
    req.session.data['validation-errors'] = [];
    res.render('pages/additional-income/additional-income-start');
  }
);
/* Additional Income How much income page*/
router.post(
  '/pages/additional-income/additional-income-how-much-income',
  function (req, res, next) {
    const typeOfIncome = req.session.data['type-of-income'];
    req.session.data['validation-errors'] = [];
    const additionalIncomeUserType = req.session.data['which-case'];

    if (additionalIncomeUserType === 'alreadyReported') {
      res.redirect(
        '/pages/additional-income/additional-income-already-reported'
      );
    } else if (typeOfIncome === 'earned') {
      res.redirect(
        '/pages/additional-income/earned-income/additional-income-earned-income-value'
      );
    } else if (typeOfIncome === 'diverted') {
      res.redirect(
        '/pages/additional-income/diverted-income/diverted-income-how-much-and-where'
      );
    } else if (typeOfIncome === 'asset') {
      res.redirect('/pages/additional-income/asset-income/asset-income-page');
    } else if (typeOfIncome === 'unearned') {
      res.redirect(
        '/pages/additional-income/unearned-income/unearned-income-page'
      );
    } else {
      //Error message
      req.session.data['validation-errors'] = [
        {
          text: 'Select what sort of additional income you are reporting',
          href: '#type-of-income',
        },
      ];
      next();
    }
  }
);
/* Additional Income earned income page*/
router.post(
  '/pages/additional-income/earned-income/additional-income-earned-income-value',
  function (req, res, next) {
    const incomeEmployment = req.session.data['incomeEmployment'];
    const incomeSelfEmployment = req.session.data['incomeSelfEmployment'];
    const incomePensionEmployment = req.session.data['incomePensionEmployment'];
    const incomeTotal = req.session.data['total'];
    let formErrorsGovukArray = [];
    req.session.data['validation-errors'] = [];
    req.session.data['wantLetter'] = '';

    if (incomeEmployment === '') {
      formErrorsGovukArray.push({
        text: 'Enter the value of your weekly earned income',
        href: '#f-incomeEmployment',
      });
      req.session.data['validation-errors'] = formErrorsGovukArray;
    } else if (!incomeEmployment.match(/^[0-9.]+$/)) {
      formErrorsGovukArray.push({
        text: 'The amount must be a number',
        href: '#f-incomeEmployment',
      });
      req.session.data['validation-errors'] = formErrorsGovukArray;
    } else if (!incomeEmployment.match(/^[0-9]+(\.[0-9]{2})$/)) {
      formErrorsGovukArray.push({
        text: 'The amount must include pence, like 123.45 or 156.00',
        href: '#f-incomeEmployment',
      });
      req.session.data['validation-errors'] = formErrorsGovukArray;
    }
    if (incomeSelfEmployment === '') {
      formErrorsGovukArray.push({
        text: 'Enter the value of your weekly earned income',
        href: '#f-incomeSelfEmployment',
      });
      req.session.data['validation-errors'] = formErrorsGovukArray;
    } else if (!incomeSelfEmployment.match(/^[0-9.]+$/)) {
      formErrorsGovukArray.push({
        text: 'The amount must be a number',
        href: '#f-incomeSelfEmployment',
      });
      req.session.data['validation-errors'] = formErrorsGovukArray;
    } else if (!incomeSelfEmployment.match(/^[0-9]+(\.[0-9]{2})$/)) {
      formErrorsGovukArray.push({
        text: 'The amount must include pence, like 123.45 or 156.00',
        href: '#f-incomeSelfEmployment',
      });
      req.session.data['validation-errors'] = formErrorsGovukArray;
    }
    if (incomePensionEmployment === '') {
      formErrorsGovukArray.push({
        text: 'Enter the value of your weekly earned income',
        href: '#f-incomePensionEmployment',
      });
      req.session.data['validation-errors'] = formErrorsGovukArray;
    } else if (!incomePensionEmployment.match(/^[0-9.]+$/)) {
      formErrorsGovukArray.push({
        text: 'The amount must be a number',
        href: '#f-incomePensionEmployment',
      });
      req.session.data['validation-errors'] = formErrorsGovukArray;
    } else if (!incomePensionEmployment.match(/^[0-9]+(\.[0-9]{2})$/)) {
      formErrorsGovukArray.push({
        text: 'The amount must include pence, like 123.45 or 156.00',
        href: '#f-incomePensionEmployment',
      });
      req.session.data['validation-errors'] = formErrorsGovukArray;
    }
    if (formErrorsGovukArray == '' && incomeTotal < 2500.0) {
      req.session.data['tolerancePassed'] = false;
      res.redirect(
        '/pages/additional-income/additional-income-failed-tolerance'
      );
    } else if (formErrorsGovukArray == '' && incomeTotal >= 2500.0) {
      req.session.data['tolerancePassed'] = true;

      res.redirect(
        '/pages/additional-income/earned-income/additional-income-earned-review'
      );
    } else {
      next();
    }
  }
);

/* Additional Income failed tolerance page*/
router.post(
  '/pages/additional-income/additional-income-failed-tolerance',
  function (req, res, next) {
    const wantLetter = req.session.data['wantLetter'];
    req.session.data['validation-errors'] = [];
    //const additionalIncomeUserType = req.session.data['which-case'];

    if (wantLetter === 'Yes') {
      res.redirect(
        '/pages/additional-income/earned-income/additional-income-earned-review'
      );
    } else if (wantLetter === 'No') {
      res.redirect('/pages/welcome');
    } else {
      //Error message
      req.session.data['validation-errors'] = [
        {
          text:
            'Select yes if you require a letter to confirm we will not consider the additional income at this stage',
          href: '#wantLetter',
        },
      ];
      next();
    }
  }
);

module.exports = router;
