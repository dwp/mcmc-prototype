const router = require('express').Router();

router.post(
  '/pages/report-change/leaving-education/start',
  function (req, res) {
    const userType = req.session.data['userType'];
    const duplicateSR = req.session.data['duplicateSR'];
    const children = req.session.data['children'];

    if (userType === 'PWC') {
      res.redirect(
        '/pages/report-change/leaving-education/which-child-reporting'
      );
    } else if (
      userType === 'NRP' &&
      (children === 'Multiple children (QC selected)' ||
        children === 'Multiple children (ROC selected)')
    ) {
      res.redirect('/pages/report-change/leaving-education/child-left-fte');
    } else if (
      userType === 'NRP' &&
      children === 'Single QC (no ROC)' &&
      duplicateSR === 'No'
    ) {
      res.redirect(
        '/pages/report-change/leaving-education/date-child-leave-fte'
      );
    } else if (
      userType === 'NRP' &&
      children === 'Single QC (no ROC)' &&
      duplicateSR === 'Yes'
    ) {
      res.redirect(
        '/pages/report-change/leaving-education/child-no-longer-in-fte'
      );
    } else if (userType === 'Dual') {
      res.redirect('/pages/report-change/leaving-education/dual-reporting');
    }
  }
);

router.post(
  '/pages/report-change/leaving-education/which-child-reporting',
  function (req, res) {
    const children = req.session.data['children'];
    const childLiveWithYou = req.session.data['childLiveWithYou'];
    const duplicateSR = req.session.data['duplicateSR'];

    if (
      (children === 'Multiple children (QC selected)' ||
        children === 'Multiple children (ROC selected)') &&
      childLiveWithYou === 'yourChild'
    ) {
      res.redirect('/pages/report-change/leaving-education/child-left-fte');
    } else if (
      children === 'Single QC (no ROC)' &&
      childLiveWithYou === 'yourChild' &&
      duplicateSR === 'No'
    ) {
      res.redirect(
        '/pages/report-change/leaving-education/date-child-leave-fte'
      );
    } else if (
      children === 'Single QC (no ROC)' &&
      childLiveWithYou === 'yourChild' &&
      duplicateSR === 'Yes'
    ) {
      res.redirect(
        '/pages/report-change/leaving-education/child-no-longer-in-fte'
      );
    } else if (
      children === 'Single QC and a ROC (ROC found)' &&
      childLiveWithYou === 'anotherChild'
    ) {
      res.redirect('/pages/report-change/leaving-education/confirm-roc-no-fte');
    } else if (
      children === 'Single QC and a ROC (ROC not found)' &&
      childLiveWithYou === 'anotherChild'
    ) {
      res.redirect(
        '/pages/report-change/leaving-education/no-roc-details-for-case'
      );
    }
  }
);

router.post(
  '/pages/report-change/leaving-education/child-left-fte',
  function (req, res) {
    const children = req.session.data['children'];
    const duplicateSR = req.session.data['duplicateSR'];

    if (
      children === 'Multiple children (QC selected)' &&
      duplicateSR === 'No'
    ) {
      res.redirect(
        '/pages/report-change/leaving-education/date-child-leave-fte'
      );
    } else if (
      children === 'Multiple children (QC selected)' &&
      duplicateSR === 'Yes'
    ) {
      res.redirect(
        '/pages/report-change/leaving-education/child-no-longer-in-fte'
      );
    } else if (children === 'Multiple children (ROC selected)') {
      res.redirect(
        '/pages/report-change/leaving-education/date-child-leave-fte'
      );
    }
  }
);

router.post(
  '/pages/report-change/leaving-education/dual-reporting',
  function (req, res) {
    const dualReportingType = req.session.data['dualReportingType'];
    const children = req.session.data['children'];
    const duplicateSR = req.session.data['duplicateSR'];

    if (dualReportingType === 'receive') {
      res.redirect(
        '/pages/report-change/leaving-education/which-child-reporting'
      );
    } else if (
      dualReportingType === 'pay' &&
      (children === 'Multiple children (QC selected)' ||
        children === 'Multiple children (ROC selected)')
    ) {
      res.redirect('/pages/report-change/leaving-education/child-left-fte');
    } else if (
      dualReportingType === 'pay' &&
      children === 'Single QC (no ROC)' &&
      duplicateSR === 'No'
    ) {
      res.redirect(
        '/pages/report-change/leaving-education/date-child-leave-fte'
      );
    } else if (
      dualReportingType === 'pay' &&
      children === 'Single QC (no ROC)' &&
      duplicateSR === 'Yes'
    ) {
      res.redirect(
        '/pages/report-change/leaving-education/child-no-longer-in-fte'
      );
    }
  }
);

router.post(
  '/pages/child-leaving-full-time-education/prototype-start',
  function (req, res) {
    res.redirect('/pages/report-change/leaving-education/start');
  }
);

router.post(
  '/pages/report-change/leaving-education/date-child-leave-fte',
  function (req, res) {
    res.redirect('/pages/report-change/leaving-education/review');
  }
);

router.post(
  '/pages/report-change/leaving-education/confirm-roc-no-fte',
  function (req, res) {
    res.redirect('/pages/report-change/leaving-education/review');
  }
);

router.post(
  '/pages/report-change/leaving-education/child-no-longer-in-fte',
  function (req, res) {
    res.redirect('/pages/welcome');
  }
);

router.post(
  '/pages/report-change/leaving-education/no-roc-details-for-case',
  function (req, res) {
    res.redirect('/pages/welcome');
  }
);

router.post(
  '/pages/report-change/leaving-education/review',
  function (req, res) {
    res.redirect('/pages/report-change/leaving-education/declaration');
  }
);

router.post(
  '/pages/report-change/leaving-education/declaration',
  function (req, res) {
    res.redirect('/pages/report-change/leaving-education/success');
  }
);

module.exports = router;
