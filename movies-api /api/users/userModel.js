import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (value) {
        // Regular expression to validate password
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
      },
      message:
        'Password must be at least 8 characters long and include at least one letter, one number, and one special character.',
    },
  },
});

// Instance method for comparing passwords
UserSchema.methods.comparePassword = async function (passw) {
  return await bcrypt.compare(passw, this.password);
};

// Static method for finding a user by username
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

// Pre-save hook for hashing passwords
UserSchema.pre('save', async function (next) {
  const saltRounds = 10;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model('User', UserSchema);
