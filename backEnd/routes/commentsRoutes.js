const express = require('express');
const router = express.Router({ mergeParams: true }); // added to handle comments

const controlComments = require('../controller/commentsController');

router.post('/', controlComments.postComment);
router.get('/', controlComments.getComment);
router.delete('/:id', controlComments.deleteComment);

module.exports = router;
