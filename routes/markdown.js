let express = require('express');
let router = express.Router();
let marked = require('marked');

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
})

router.post('/', (req, res) => {
  let { md } = req.body;
  let content = marked(md);

  res.success({
    content
  })
})

module.exports = router;