var express = require('express');
const router = express.Router();
var helper = require('../controller/capstonecontroller');
router.post("/adminSignin", (req, res) => {

  helper.adminSignin(req).then(result => {
    // console.log("rrrrrrrrrrrrrrr",result)
    res.send(result);
  });
});

router.post("/addProducts", (req, res) => {

    helper.addProducts(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });

  router.post("/updateProducts", (req, res) => {

    helper.updateProducts(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });

  router.post("/deleteProducts", (req, res) => {

    helper.deleteProducts(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });

  router.post("/deleteEmployee", (req, res) => {

    helper.deleteEmployee(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });

  router.post("/addEmployee", (req, res) => {

    helper.addEmployee(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });
  router.post("/adminlogout", (req, res) => {

    helper.adminlogout(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });
  router.post("/userSignup", (req, res) => {

    helper.userSignup(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });
  router.post("/userSignin", (req, res) => {

    helper.userSignin(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });
  router.post("/userProducts", (req, res) => {

    helper.userProducts(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });
  router.post("/deleteuserProducts", (req, res) => {

    helper.deleteuserProducts(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });
  router.post("/userViewproducts", (req, res) => {

    helper.userViewproducts(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });
  router.post("/userCheckout", (req, res) => {

    helper.userCheckout(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });
  router.post("/raiseTicket", (req, res) => {

    helper.raiseTicket(req).then(result => {
      // console.log("rrrrrrrrrrrrrrr",result)
      res.send(result);
    });
  });
module.exports = router;
