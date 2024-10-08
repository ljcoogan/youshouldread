import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  _id: String,
  expires: Date,
  session: Object,
});

export default mongoose.model("Session", sessionSchema);
