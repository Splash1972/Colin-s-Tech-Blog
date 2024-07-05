const router = require('express').Router();
const { Comment } = require('../../models');

// get
router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

//POST
router.post('/', (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            blog_id: req.body.blog_id,
            //use the id from the session
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => res.status(400).json(err));
    }   else {
        res.status(401).json({ message: 'You must be logged in to post a comment.' });
      }
});

//DELETE
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;