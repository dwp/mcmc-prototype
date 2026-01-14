const router = require('express').Router();
const { isEmpty, isArray } = require('lodash');

router.post(
  '/pages/messages',
  function (req, res) {
    
    var filterCount = 0;
    req.session.data['case_1'] = false;
    req.session.data['case_2'] = false;
    req.session.data['no_cases'] = false;

    if ( !isEmpty(req.body['messages-after']) ) {
      filterCount = filterCount + 1;
    }
    if ( !isEmpty(req.body['messages-before']) ) {
      filterCount = filterCount + 1;
    }
    if ( isArray(req.body['cases']) && !isEmpty(req.body['cases']) ) {
      filterCount = filterCount + req.body['cases'].length;
      req.session.data['cases'] = req.body['cases'];
      req.session.data['cases'].forEach((x) => { 
        switch (x) {
          case '1-CaseId': 
            req.session.data['case_1'] = true;
            break;
          case '2-CaseId': 
            req.session.data['case_2'] = true;
            break;
          case 'No-CaseId': 
            req.session.data['no_cases'] = true;
            break;
        }
      })
    }
    req.session.data['filter-count'] = filterCount;
    res.redirect('/pages/messages');
  }
);

router.post(
  '/pages/messages/upload-evidence/what-to-do',
  function (req, res) {

    switch (req.body.whatToDo) {
      case 'Upload':
        res.redirect('/pages/messages/upload-documents');
        break;
      case 'View':
        res.redirect('/pages/messages/upload-evidence/already-uploaded');
        break;
      default: 
        res.redirect('/pages/messages/upload-evidence/what-to-do');
        break;
    }
  }
);

module.exports = router;
