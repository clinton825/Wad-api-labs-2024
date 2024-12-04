import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
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
  }
});

export default mongoose.model('User', UserSchema);