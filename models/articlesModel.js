const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please give a article name!"],
  },

  description: {
    type: String,
    required: [true, "Please give a article description!"],
  },

});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
