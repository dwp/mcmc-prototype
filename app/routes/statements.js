const router = require('express').Router();

router.post(
  '/pages/payments/statements/pp-22-23-1',
  function (req, res) {
    var arPeriod = req.body['arPeriod']
    if (arPeriod == "December 2021 - December 2022"){
      res.redirect('/pages/payments/statements/pp-21-22-1')
    } else {
      res.redirect('/pages/payments/statements/pp-22-23-1')
    }
  });

    router.post(
        '/pages/payments/statements/pp-21-22-1',
        function (req, res) {
          var arPeriod = req.body['arPeriod']
          if (arPeriod == "December 2022 - December 2023"){
            res.redirect('/pages/payments/statements/pp-22-23-1')
          } else {
            res.redirect('/pages/payments/statements/pp-21-22-1')
          }
        });
      
      router.post(
          '/pages/payments/statements/pp-21-22-2',
          function (req, res) {
          var arPeriod = req.body['arPeriod']
          if (arPeriod == "December 2022 - December 2023"){
              res.redirect('/pages/payments/statements/pp-22-23-1')
          } else {
              res.redirect('/pages/payments/statements/pp-21-22-2')
          }
          });

module.exports = router;