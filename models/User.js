import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, index: true },
  name: String,
  email: { type: String, lowercase: true, trim: true },
  role: { type: String, default: "volunteer" },
  joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
});

export default mongoose.model("User", userSchema);
