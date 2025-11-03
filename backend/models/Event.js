import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: String, required: true },
  type: { type: String, default: 'event' },
  text: { type: String }
});

export default mongoose.model('Event', eventSchema);
