import mongoose from 'mongoose';

const birthdaySchema = new mongoose.Schema({
  userId: String,
  name: String,
  date: String,
  relation: String
});
export default mongoose.model('Birthday', birthdaySchema);
