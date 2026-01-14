const router = require('express').Router();

router.post(
  '/pages/report-change/payments/ctst/p2-change',
  function (req, res) {
    var changeService = req.body['changeService']

    if (changeService == "Yes"){
  
      res.redirect('/pages/report-change/payments/ctst/p3-duedate')
      
    } else if (changeService == "No") {
      
      res.redirect('/pages/report-change/payments/ctst/p2b-keepusing')
   
    } else {
        res.redirect('/pages/report-change/payments/ctst/p2-change')
    }
  });

  router.post(
    '/pages/report-change/payments/ctst/p6-sharedbank',
    function (req, res) {
      var sharedDetails = req.body['sharedDetails']
  
      if (sharedDetails == "Yes"){
    
        res.redirect('/pages/report-change/payments/ctst/p7-missedorpart')
        
      } else if (sharedDetails == "No") {
        
        res.redirect('/pages/report-change/payments/ctst/p6b-needtoshare')
     
      } else {
          res.redirect('/pages/report-change/payments/ctst/p6-sharedbank')
      }
    });

    router.post(
      '/pages/report-change/payments/ctst/p3-duedate',
      function (req, res) {
        var dueDate = req.body['dueDate']
    
        if (dueDate == "Earlier"){
      
          res.redirect('/pages/report-change/payments/ctst/p4-monthdate')
          
        } else if (dueDate == "1 August 2024"  || "24 July 2024" || "17 July 2024" || "10 July 2024" ) {
          
          res.redirect('/pages/report-change/payments/ctst/p6-sharedbank')
       
        } else {
            res.redirect('/pages/report-change/payments/ctst/p3-duedate')
        }
      });

    router.post(
      '/pages/report-change/payments/ctst/p7-missedorpart',
      function (req, res) {
        var partPayment = req.body['partPayment']
    
        if (partPayment == "No"){
      
          res.redirect('/pages/report-change/payments/ctst/p10-otherpayments')
          
        } else if (partPayment == "Yes, part payment") {
          
          res.redirect('/pages/report-change/payments/ctst/p8-howmuch')

        } else if (partPayment == "Yes, full payment but at least 3 working days late") {
          
          res.redirect('/pages/report-change/payments/ctst/p9-whenlate')
       
        } else {
            res.redirect('/pages/report-change/payments/ctst/p6-sharedbank')
        }
      });

      router.post(
        '/pages/report-change/payments/ctst/corroboration/p2-paymentsreported',
        function (req, res) {
          var corroborateAgree = req.body['corroborateAgree']
      
          if (corroborateAgree == "No"){
        
            res.redirect('/pages/report-change/payments/ctst/corroboration/p3-payments')
            
          } else if (corroborateAgree == "Yes") {
            
            res.redirect('/pages/report-change/payments/ctst/corroboration/p11-agree-bankdetails')
         
          } else {
              res.redirect('/pages/report-change/payments/ctst/corroboration/p2-paymentsreported')
          }
        });

        router.post(
          '/pages/report-change/payments/ctst/corroboration/p10-agree',
          function (req, res) {
            var agreeParent = req.body['agreeParent']
        
            if (agreeParent == "No"){
          
              res.redirect('/pages/report-change/payments/ctst/corroboration/p3-payments')
              
            } else if (agreeParent == "Yes") {
              
              res.redirect('/pages/report-change/payments/ctst/corroboration/p11-agree-bankdetails')
           
            } else {
                res.redirect('/pages/report-change/payments/ctst/corroboration/p10-agree')
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