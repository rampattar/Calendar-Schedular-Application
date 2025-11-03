import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
  userId: String,
  title: { type: String, required: true },
  description: String,
  deadline: { type: String, required: true }, // format: YYYY-MM-DD
  isComplete: { type: Boolean, default: false },
  type: { type: String, default: 'task' },
  text: { type: String }, // used for display in calendar
});
export default mongoose.model('Task', taskSchema);
