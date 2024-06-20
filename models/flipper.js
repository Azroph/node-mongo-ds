const mongoose = require("mongoose");

const FlipperSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  marque_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Marque",
    required: true,
  },
  annee_sortie: { type: Number, required: true },
  description: { type: String },
  photos: { type: [String] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Flipper = mongoose.model("Flipper", FlipperSchema);
module.exports = Flipper;
