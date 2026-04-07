const express = require("express");
const router = express.Router();

router.get("/:num1/:num2", (req, res) => {
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);
  const total = num1 + num2;
  res.send(`The sum is: ${total}`);
});

module.exports = router;
