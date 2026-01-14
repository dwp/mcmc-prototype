const router = require('express').Router();
const { isEmpty, isArray } = require('lodash');

router.post(
  '/pages/track-changes',
  function (req, res) {
  
    var filterCount = 0;
    req.session.data['completed'] = false;
    req.session.data['evidence_requested'] = false;
    req.session.data['in_progress'] = false;
    req.session.data['received'] = false;
    req.session.data['rejected'] = false;

    if ( !isEmpty(req.body['report-after']) ) {
      filterCount = filterCount + 1;
    }
    if ( !isEmpty(req.body['report-before']) ) {
      filterCount = filterCount + 1;
    }
    if ( isArray(req.body['report-status']) && !isEmpty(req.body['report-status']) ) {
      filterCount = filterCount + req.body['report-status'].length;
      req.session.data['report-status'] = req.body['report-status'];
      req.session.data['report-status'].forEach((x) => { 
        switch (x) {
          case 'report-completed': 
            req.session.data['completed'] = true;
            break;
          case 'report-evidence-requested': 
            req.session.data['evidence_requested'] = true;
            break;
          case 'report-in-progress': 
            req.session.data['in_progress'] = true;
            break;
          case 'report-received': 
            req.session.data['received'] = true;
            break;
          case 'report-rejected': 
            req.session.data['rejected'] = true;
            break;
        }
      })
    }
    req.session.data['track-changes-filter-count'] = filterCount;
    res.redirect('/pages/track-changes');
  }
);

module.exports = router;
