const comments = require('../models/comments');


const postComment = async (req, res) => {
  try {
    console.log("REQ PARAMS:", req.params);
    console.log("REQ BODY:", req.body);

    const { blogId } = req.params;
    const { comment } = req.body;

    const result = await comments.create({ comment, blogId });
    console.log("COMMENT CREATED:", result.toJSON());

    res.json(result);
  } catch (err) {
    console.error("ERROR POSTING COMMENT:", err);
    res.status(500).json({ error: err.message });
  }
};



const getComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const result = await comments.findAll({ where: { blogId } });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await comments.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "successfully deleted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postComment,
  getComment,
  deleteComment
};
