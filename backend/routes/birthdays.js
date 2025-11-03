import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
const birthdaySchema = new mongoose.Schema({
  name: String,
  date: String,
});

const Birthday = mongoose.model('Birthday', birthdaySchema);
router.get('/', async (req, res) => {
  const all = await Birthday.find();
  res.json(all);
});
router.post('/', async (req, res) => {
  const { name, date } = req.body;
  const newB = new Birthday({ name, date });
  await newB.save();
  res.status(201).json(newB);
});
export default router;
