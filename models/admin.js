const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema;

const adminSchema = new schema(
  {
    name: {
      type: String,
      minlength: 4,
      required: true
    },
    email: {
      type: String,
      minlength: 5,
      unique: true,
      required: true
    },
    password: {
      type: String,
      minlength: 4,
      required: true
    }
  },
  { timestamps: true }
);

adminSchema.pre("save", function(next) {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

adminSchema.methods.confirmPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

// Exporting The Model Of The Schema
module.exports = Admin;
