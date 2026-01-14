const router = require('express').Router();

router.post(
  '/pages/messages/upload-evidence/start',
  function (req, res, next) {

    const files = [];
    const errors = [];
    const reqValues = Object.values(req.body);

    reqValues.forEach(value => {
      if(value.length){
        files.push(value);
      }
    })

    // at this point we should have something like:
    // [
    //   'Screen Shot 2021-07-01 at 13.24.31.png',
    //   'Screen Shot 2021-07-06 at 09.31.01.png'
    // ]
    console.log(files);

    // do some validation
      // if errors return errors
      // next() - return to upload with errors

    // if all is successful....
    res.redirect('/pages/messages/upload-evidence/success')
  }
);

router.post(
  '/pages/messages/upload-evidence/start-alt',
  function (req, res, next) {
    console.log(req.body);
    // assume all is successful....
    res.redirect('/pages/messages/upload-evidence/success')
  }
);

router.post(
  '/pages/messages/upload-evidence/start-messaging-mvp',
  function (req, res, next) {
    console.log(req.body);
    // assume all is successful....
    res.redirect('/pages/messages/upload-evidence/mvp-success')
  }
);

router.post(
  '/pages/messages/upload-evidence/start-nojs',
  function (req, res, next) {
    // assume all is successful....
    res.redirect('/pages/messages/upload-evidence/success')
  }
);

module.exports = router;
