const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/submit', function(req, res) {
  fs.writeFile(`./public/file-${new Date().getTime()}.txt`, JSON.stringify(req.body, null, "\t"), (err) => {
    if (err) {
      throw new Error("Error writing to file");
    }
    
    res.status(200).send(req.body);
  })
});

module.exports = router;
