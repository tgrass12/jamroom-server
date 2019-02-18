const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true    
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    let hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  } catch(err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function(usedPassword, next) {
  try {
    const isMatch = await bcrypt.compare(usedPassword, this.password);
    return isMatch;
  } catch(err) {
    next(err);
  }
}
const User = mongoose.model('User', userSchema);

module.exports = User;