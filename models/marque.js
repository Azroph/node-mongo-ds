const mongoose = require("mongoose");

const MarqueSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Marque = mongoose.model("Marque", MarqueSchema);
module.exports = Marque;
