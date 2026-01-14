const router = require('express').Router();

router.post(
  '/pages/report-change/shared-care/shared-care-P3',
  function (req, res) {
    var numberOfNights = req.body['numberOfNights']

    if (numberOfNights == "Yes"){
  
      res.redirect('/pages/report-change/shared-care/shared-care-P4')
      
    } else if (numberOfNights == "No") {
      
      res.redirect('/pages/report-change/shared-care/shared-care-rejection')
   
    } else {
        res.redirect('/pages/report-change/shared-care/shared-care-P3')
    }
  });

    router.post(
        '/pages/report-change/shared-care/shared-care-declaration',
        function (req, res) {
      
          switch (req.session.data.writtenAgreement) {
            case 'A current court order':
                res.redirect('/pages/report-change/shared-care/shared-care-confirmation-evidence')
              break;
              case 'A formal agreement, for example drawn up by a solicitor':
                res.redirect('/pages/report-change/shared-care/shared-care-confirmation-evidence')
              break;
              case 'Another official document, for example Children and Family Court Advisory and Support Service (CAFCASS) or Social Services reports':
                res.redirect('/pages/report-change/shared-care/shared-care-confirmation-evidence')
              break;
            case 'None':
              res.redirect('/pages/report-change/shared-care/shared-care-confirmation-no-evidence');
              break;
            default: 
              res.redirect('/pages/report-change/shared-care/shared-care-declaration');
              break;
          }
        }
      );

      router.post(
        '/pages/report-change/shared-care/corroboration-declaration',
        function (req, res) {
      
          switch (req.session.data.writtenAgreement) {
            case 'A current court order':
                res.redirect('/pages/report-change/shared-care/corroboration-confirmation')
              break;
              case 'A formal agreement, for example drawn up by a solicitor':
                res.redirect('/pages/report-change/shared-care/corroboration-confirmation')
              break;
              case 'Another official document, for example Children and Family Court Advisory and Support Service (CAFCASS) or Social Services reports':
                res.redirect('/pages/report-change/shared-care/corroboration-confirmation')
              break;
            case 'None':
              res.redirect('/pages/report-change/shared-care/corroboration-confirmation-no-evidence');
              break;
            default: 
              res.redirect('/pages/report-change/shared-care/corroboration-declaration');
              break;
          }
        }
      );

    router.post(
        '/pages/report-change/shared-care/corroboration-start',
        function (req, res) {
          var corroborationAgree = req.body['corroborationAgree']
      
          if (corroborationAgree == "Yes" ){
        
            res.redirect('/pages/report-change/shared-care/corroboration-CA-yes')
            
          } else if (corroborationAgree == "No") {
            
            res.redirect('/pages/report-change/shared-care/corroboration-P1')
         
          } else {
              res.redirect('/pages/report-change/shared-care/corroboration-start')
          }
        });

  
    



module.exports = router;