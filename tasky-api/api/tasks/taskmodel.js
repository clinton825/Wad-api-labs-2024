import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: { type: String, required: true }, // Fixing `required`
    description: { type: String },
    deadline: {
      type: Date,
      validate: {
        validator: (date) => date > new Date(), // Ensuring the deadline is in the future
        message: 'Deadline must be a future date.',
      },
    },
    done: { type: Boolean, default: false }, // Default value
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true, // Fixing `required`
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Referencing the User schema
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Exporting the model
export default mongoose.model('Task', TaskSchema);
