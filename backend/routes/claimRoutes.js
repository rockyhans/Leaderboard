const express = require("express");
const router = express.Router();
const { claimPoints } = require("../controllers/claimController");

router.post("/:userId", claimPoints);

module.exports = router;
