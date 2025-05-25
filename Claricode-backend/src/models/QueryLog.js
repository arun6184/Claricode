import mongoose from 'mongoose';

const queryLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  query: String,
  response: String,
  role: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('QueryLog', queryLogSchema);
