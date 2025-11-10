const express = require("express");
const router = express.Router();
const { renderGstarForm, sendGstarEnquiryMail } = require("./gstar");

router.get("/", renderGstarForm);
router.post("/api/v1/gstar-enquiry", sendGstarEnquiryMail);

module.exports = router;
