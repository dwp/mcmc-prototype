const router = require('express').Router();

router.post(
  '/pages/my-details-and-circumstances/home-address/where-you-live',
  function (req, res, next) {
    res.redirect('/pages/my-details-and-circumstances/home-address/find-address-scenario');
  }
);

router.post(
  '/pages/my-details-and-circumstances/postal-address/where-to-send-letters',
  function (req, res, next) {
    res.redirect('/pages/my-details-and-circumstances/postal-address/find-address-scenario');
  }
);

router.post(
  '/pages/my-details-and-circumstances/home-address/select-the-address-where-you-live',
  function (req, res, next) {
    res.redirect('/pages/my-details-and-circumstances/home-address/check-home-address');
  }
);

router.post(
  '/pages/my-details-and-circumstances/postal-address/select-the-address-where-to-send-letters',
  function (req, res, next) {
    res.redirect('/pages/my-details-and-circumstances/postal-address/check-postal-address');
  }
);

router.post(
  '/pages/my-details-and-circumstances/home-address/find-address-scenario',
  function (req, res, next) {
    const findAddressScenario = req.body['findAddressScenario'];
    if (findAddressScenario === 'addressFound') {
      res.redirect('/pages/my-details-and-circumstances/home-address/select-the-address-where-you-live');
    } else {
      res.redirect('/pages/my-details-and-circumstances/home-address/we-cannot-find-your-address');
    }
  }
);

router.post(
  '/pages/my-details-and-circumstances/postal-address/find-address-scenario',
  function (req, res, next) {
    const findAddressScenario = req.body['findAddressScenario'];
    if (findAddressScenario === 'addressFound') {
      res.redirect('/pages/my-details-and-circumstances/postal-address/select-the-address-where-to-send-letters');
    } else {
      res.redirect('/pages/my-details-and-circumstances/postal-address/we-cannot-find-your-address');
    }
  }
);

// remove email address
router.post(
  '/pages/my-details-and-circumstances/email/remove-email',
  function (req, res, next) {
    const removeEmail = req.body['remove-email'];
    if (removeEmail === 'yes') {
      // clear email data and redirect to somewhere?!
      req.session.data['default-email'] = null;
      req.session.data['md-email'] = null;
      res.redirect('/pages/my-details-and-circumstances/declaration');
    } else {
      res.redirect('/pages/my-details-and-circumstances');
    }
  }
);

// remove mobile number
router.post(
  '/pages/my-details-and-circumstances/mobile-phone/remove-mobile-telephone-number',
  function (req, res) {
    const removeMobile = req.body['remove-mobile-telephone-number'];
    if (removeMobile === 'yes') {
      req.session.data['default-phone'] = null;
      req.session.data['md-mobilePhone'] = null;
      req.session.data['can-we-send-you-sms'] = null;
      res.redirect('/pages/my-details-and-circumstances/declaration');
    } else {
      res.redirect('/pages/my-details-and-circumstances');
    }
  }
);

// remove landline
router.post(
  '/pages/my-details-and-circumstances/landline/remove-landline-telephone-number',
  function (req, res) {
    const removeLandline = req.body['remove-landline-telephone-number'];
    if (removeLandline === 'yes') {
      req.session.data['default-landline'] = null;
      req.session.data['md-landlinePhone'] = null;
      res.redirect('/pages/my-details-and-circumstances/declaration');
    } else {
      res.redirect('/pages/my-details-and-circumstances');
    }
  }
);

router.post(
  '/pages/my-details-and-circumstances/work-phone/remove-work-telephone-number',
  function (req, res) {
    const removeWorkPhone = req.body['remove-work-telephone-number'];
    if (removeWorkPhone === 'yes') {
      req.session.data['default-workphone'] = null;
      req.session.data['md-workPhone'] = null;
      res.redirect('/pages/my-details-and-circumstances/declaration');
    } else {
      res.redirect('/pages/my-details-and-circumstances');
    }
  }
);

// communication
router.post(
  '/pages/my-details-and-circumstances/receive-letters/how',
  function (req, res) {
    res.redirect('/pages/my-details-and-circumstances/receive-letters/email');
  }
);



// email communication
router.post(
  '/pages/my-details-and-circumstances/receive-letters/email',
  function (req, res) {
    const newEmail = req.body['can-we-email'];
    if (newEmail === 'No'){
      res.redirect(
        '/pages/my-details-and-circumstances/receive-letters/new-email');
    } else {
      res.redirect(
        '/pages/my-details-and-circumstances/receive-letters/check-correspondance');
    }
  }
);

// branch from no email in online correspondance
router.post(
  '/pages/my-details-and-circumstances/email/check-email',
  function (req, res, next) {
    const letterCorresondance = req.session.data['letter-correspondance'];
    if (letterCorresondance) {
      res.redirect(
        '/pages/my-details-and-circumstances/receive-letters/check-correspondance'
      );
    } else {
      next();
    }
  }
);

router.post(
  '/pages/my-details-and-circumstances/home-address/enter-home-address-manually',
  function (req, res) {
    req.session.data['manual-home-address'] = true;
    req.session.data['home-address'] =
      req.session.data['home-address-line-1'] +
      '<br/>' +
      req.session.data['home-town-city'] +
      '<br/>' +
      req.session.data['home-postcode'];
    res.redirect(
      '/pages/my-details-and-circumstances/home-address/check-home-address'
    );
  }
);

router.post(
  '/pages/my-details-and-circumstances/postal-address/enter-postal-address-manually',
  function (req, res) {
    req.session.data['manual-postal-address'] = true;
    req.session.data['postal-address'] =
      req.session.data['postal-address-line-1'] +
      '<br/>' +
      req.session.data['postal-town-city'] +
      '<br/>' +
      req.session.data['postal-postcode'];
    res.redirect(
      '/pages/my-details-and-circumstances/postal-address/check-postal-address'
    );
  }
);

router.post(
  '/pages/my-details-and-circumstances/home-address/enter-home-address-manually-outside-uk',
  function (req, res) {
    req.session.data['manual-home-address-outside-uk'] = true;
    req.session.data['home-address'] =
      req.session.data['home-address-line-1'] +
      '<br/>' +
      req.session.data['home-town-city'] +
      '<br/>' +
      req.session.data['home-postcode'];
    res.redirect(
      '/pages/my-details-and-circumstances/home-address/check-home-address-outside-uk'
    );
  }
);

router.post(
  '/pages/my-details-and-circumstances/postal-address/enter-postal-address-manually-outside-uk',
  function (req, res) {
    req.session.data['manual-postal-address-outside-uk'] = true;
    req.session.data['postal-address'] =
      req.session.data['postal-address-line-1'] +
      '<br/>' +
      req.session.data['postal-town-city'] +
      '<br/>' +
      req.session.data['postal-postcode'];
    res.redirect(
      '/pages/my-details-and-circumstances/postal-address/check-postal-address-outside-uk'
    );
  }
);

router.post(
  '/pages/my-details-and-circumstances/postal-address/where-to-send-letters',
  function (req, res) {
    res.redirect(
      '/pages/my-details-and-circumstances/postal-address/select-postal-address'
    );
  }
);

router.post(
  '/pages/my-details-and-circumstances/home-address/check-home-address',
  function (req, res) {
    res.redirect(
      '/pages/my-details-and-circumstances/declaration'
    );
  }
);

router.post(
  '/pages/my-details-and-circumstances/home-address/check-home-address-outside-uk',
  function (req, res) {
    res.redirect(
      '/pages/my-details-and-circumstances/declaration'
    );
  }
);

router.post(
  '/pages/my-details-and-circumstances/postal-address/check-postal-address',
  function (req, res) {
    res.redirect(
      '/pages/my-details-and-circumstances/declaration'
    );
  }
);

router.post(
  '/pages/my-details-and-circumstances/postal-address/check-postal-address-outside-uk',
  function (req, res) {
    res.redirect(
      '/pages/my-details-and-circumstances/declaration'
    );
  }
);

router.post(
  '/pages/my-details-and-circumstances/declaration',
  function (req, res, next) {
    req.session.data['home-address-line-1'] = '';
    req.session.data['postal-address-line-1'] = '';
    req.session.data['manual-home-address'] = false;
    req.session.data['manual-postal-address'] = false;
    req.session.data['manual-home-address-outside-uk'] = false;
    req.session.data['manual-postal-address-outside-uk'] = false;
    res.redirect('/pages/my-details-and-circumstances/confirmation');
  }
);

router.post(
  '/pages/my-details-and-circumstances/postal-address/remove-address',
  function (req, res, next) {
    const removePostalAddress = req.body['remove-postal-address'];
    if (removePostalAddress === 'yes') {
      req.session.data['postal-address-line-1'] = null;
      req.session.data['postal-town-city'] = null;
      req.session.data['postal-postcode-manual'] = null;
      req.session.data['postal-address-select'] = null;
      req.session.data['postal-postcode'] = null;
      req.session.data['postal-address'] = null;

      res.redirect('/pages/my-details-and-circumstances/declaration');
    } else {
      res.redirect('/pages/my-details-and-circumstances');
    }
  }
);

module.exports = router;
