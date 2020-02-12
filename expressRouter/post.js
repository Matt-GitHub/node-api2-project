const express = require("express");
const Post = require("../data/db");
const router = express.Router();

router.get("/", (req, res) => {
  Post.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log("get error", error);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then(response => {
      if (!response[0]) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(error => {
      console.log("user id get error", error);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  Post.findCommentById(id)
    .then(response => {
      if (!response[0]) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        console.log("response", response);
        res.status(200).json(response);
      }
    })
    .catch(error => {
      console.log("comment id error", error);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const createPost = req.body;
  if (!createPost.title || !createPost.contents) {
    res.status(400).json({
      errorMessage: "please add a title and contents before submitting"
    });
  } else {
    Post.insert(createPost)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(error => {
        console.log("post error", error);
        res.status(500).json({ errorMessage: "sorry" });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const createPost = req.body;
  Post.insertComment(createPost)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log("post comment error", error);
      res.status(500).json({ errorMessage: "sorry" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Post.remove(id)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log("delete error", error);
      res
        .status(500)
        .json({ errorMessage: "The specified post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  if (!req.body.title || req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide the title and contents for this post"
    });
  } else {
    Post.update(req.params.id, req.body)
      .then(response => {
        if (response) {
          res.status(200).json(response);
        } else {
          res.status(404).json({ errorMessage: "id does not exist" });
        }
      })
      .catch(error => {
        console.log("edit error", error);
        res.status(500).json({ errorMessage: "sorry" });
      });
  }
});

// ** export server
module.exports = router;
