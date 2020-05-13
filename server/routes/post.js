const express = require("express");
const mongoose = require("mongoose");
const loginmiddleware = require("../middleware/loginMiddleware");

const Post = mongoose.model("Post");
const router = express.Router();
//const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

router.get("/allpost", (req, res) => {
	Post.find()
		.populate("PostedBy", "_id Name")
		.then((posts) => {
			//console.log(posts[0].Photo.toString("base64"));
			res.json({ photo: posts[0].Photo.toString("base64") });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/mypost", loginmiddleware, (req, res) => {
	Post.find({ PostedBy: req.user._id })
		.populate("PostedBy", "_id Name")
		.then((myposts) => {
			res.json(myposts);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post(
	"/createpost",
	/* loginmiddleware,*/ (req, res) => {
		const { title, body, photoEncode, photoType, postedBy } = req.body;
		if (!title || !body || !photoEncode) {
			return res.json({
				error: "Please submit all the required fields.",
			});
		}
		const post = new Post({
			Title: title,
			Body: body,
			PostedBy: postedBy,
		});

		savePhoto(post, photoEncode, photoType);

		post.save()
			.then((result) => {
				res.json({ post: result });
			})
			.catch((err) => {
				console.log(err);
			});
	}
);

function savePhoto(post, photoEncoded, photoType) {
	if (photoEncoded != null) {
		post.Photo = new Buffer.from(photoEncoded, "base64");
		post.PhotoType = photoType;
	}
}

module.exports = router;
