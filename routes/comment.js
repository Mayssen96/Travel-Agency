
const express = require('express');
const router = express.Router();
const {addComments,getAllComments} = require('../controller/comment.controller')

router.post('/addComment',addComments);
router.get('/getAllComments',getAllComments);


module.exports = router