import mongoose from 'mongoose';

const codeMetadataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  repoName: String,
  files: [
    {
      path: String,
      functions: [String],
      classes: [String],
      comments: [String],
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CodeMetadata', codeMetadataSchema);
