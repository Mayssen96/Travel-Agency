const mongoose = require("mongoose");

const appliSchema = new mongoose.Schema({
  name: { type: String },
  prix: { type: String },
  vol: { type: String },
  image: { type: String },
  date : {type : String}
});

module.exports = mongoose.model("Application", appliSchema);
