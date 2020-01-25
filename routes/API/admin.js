const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const jwt = require("jsonwebtoken");

// Admin Sign-up
router.post("/signup", function(req, res, next) {
  console.log(req.body, "inside admin signup route");
  Admin.create(req.body, (err, admin) => {
    if (err) return next(err);
    if (!admin)
      return res
        .status(401)
        .json({ message: "There is no Admin ", success: false });
    return res.status(200).json({ admin, success: true });
  });
});

//Admin Sign-in
router.post("/login", function(req, res, next) {
  console.log(req.body, "look inside admin login route");
  //   let email = req.body.email
  //   let password = req.body.password
  let { email, password } = req.body;
  Admin.findOne({ email }, (err, admin) => {
    if (err) return next(err);
    if (!admin)
      return res
        .status(400)
        .json({ message: "No admin found", success: false });
    jwt.sign(
      {
        email: admin.email
      },
      "mongo",
      (err, token) => {
        if (err) return next(err);
        res.status(200).json({ message: "Admin is logged in ", success: true });
      }
    );
  });
});
module.exports = router;
