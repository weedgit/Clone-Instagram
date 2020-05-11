const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();
const PORT = 5000;
const URL = "mongodb://localhost:27017/instadb";

mongoose.connect(URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
	console.log("Successfully connected to InstaDB");
});
mongoose.connection.on("error", (err) => {
	console.log("error while connecting to InstaDB : ", err);
});

require("./models/user");
require("./models/post");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen(PORT, () => {
	console.log("Server is running under port 5000 ...");
});