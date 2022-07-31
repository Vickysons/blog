const Post = require("../models/Post"); //schema post
const router = require("express").Router();

// requests

// this is for a post request

router.post("/post", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// this is a get request

// home page

router.get("/", (req, res) => res.status(200).send("home page"));

// get all posts
router.get("/post", async (req, res) => {
  try {
    Post.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//GET POST
router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post

router.put("/post/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE POST
router.delete("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    try {
      await post.delete();
      res.status(200).send("Post has been deleted...");
    } catch (err) {
      res.status(500).send(err);
    }
  } catch (err) {
    res.status(500).send("post with such id does not exist ");
  }
});
module.exports = router;
