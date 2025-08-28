const mongoose = require("mongoose");
const tokensSchema = new mongoose.Schema({
  username: {
    type: String,
    createdAt: { type: Date, default: Date.now, expires: 60 },
  },
});
const tokensModel = mongoose.model("tokens", tokensSchema);
module.exports = { tokensModel };
