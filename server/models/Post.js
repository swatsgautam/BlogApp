const mongoose = require("mongoose");

//creates a new Mongoose schema
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
},
{ timestamps: true } // Enable timestamps
);

//creates a Mongoose model named Post based on the PostSchema
//allows us to interact with the Posts collection in the MongoDB database
module.exports = mongoose.model("Post", PostSchema);
