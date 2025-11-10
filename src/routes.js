const express = require("express");
const router = express.Router();
const { renderGstarForm, sendGstarEnquiryMail } = require("./gstar");

router.get("/gstar", renderGstarForm);
router.post("/gstar-enquiry", sendGstarEnquiryMail);

module.exports = router;
