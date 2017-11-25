const express = require('express');
const router = express.Router();
const { Tag } = require('../model');

router.post('/create', (req, res) => {
  let userSeesion = req.session.user;
  let tag = req.body.tag;

  if (!userSeesion) return res.err('还没有登录');
  Tag.create({
    userId: userSeesion.id,
    tag
  }).then(() => {
    res.success({
      tag
    })
  })
})

module.exports = router;