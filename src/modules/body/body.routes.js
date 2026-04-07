const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const all = 1000;
  res.render("num.ejs", {
    name: "ahmed",
    number: all,
  });
});

module.exports = router;
