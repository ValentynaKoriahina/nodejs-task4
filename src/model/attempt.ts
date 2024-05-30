// export default Attempt;
import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Attempt document
export interface IAttempt extends Document {
  studentId: number;
  timeSpent: string; // ISO 8601 format
  solved: boolean;
  exerciseId: number;
  datetime: Date;
}

// Create schema for Attempt entity
const attemptSchema = new Schema({
  studentId: {
    type: Number,
    required: true,
  },
  timeSpent: {
    type: String,
    required: true,
    validate: {
      validator: function(value: string) {
        // Validate timeSpent format
        const timeSpentRegex = /^PT\d+H\d+M\d+S$/;
        return timeSpentRegex.test(value);
      },
      message: 'Invalid timeSpent format',
    },
  },
  solved: {
    type: Boolean,
    required: true,
  },
  exerciseId: {
    type: Number,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
}, {
  collection: 'attempt', // Explicitly specify collection name
});

// Create model based on schema
const Attempt = mongoose.model<IAttempt>('Attempt', attemptSchema);

export default Attempt;
