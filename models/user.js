const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// Do not use an 'if' check here; call the function directly
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
