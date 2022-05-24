const mongoose = require("mongoose");

const schemaBook = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		authId: {
			type: mongoose.Types.ObjectId,
			ref: "auth",
		},
	},
	{ timestamps: true }
);

module.exports = new mongoose.model("book", schemaBook);
