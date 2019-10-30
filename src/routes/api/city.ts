import express = require("express");
const router: express.Router = express.Router();

router.get("/test", (req, res) => res.send("Testing city route"));
module.exports = router;
