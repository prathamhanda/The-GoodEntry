import mongoose from "mongoose";

const volunteerFeedbackSchema = new mongoose.Schema({
  volunteerName: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now }
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  quickDescription: String,
  date: Date,
  time: String,
  day: String,
  location: String,
  category: String,
  organizer: String,
  organizationInfo: {
    name: String,
    description: String,
    website: String,
    contactEmail: String
  },
  image: String,
  maxVolunteers: { type: Number, default: 20 },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  volunteerFeedback: [volunteerFeedbackSchema],
  preparationInstructions: String,
  requirements: [String],
  whatToBring: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Event", eventSchema);
