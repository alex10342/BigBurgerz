import { DateTime } from "luxon";
import mongoose from "mongoose";

// Configure Mongo Schema
const Schema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    name: String,
    phone: String,
    email: String,
    tableNum: Number,
}, { collection: "bookings"})

// Export new Schema if one does not exist
const model = mongoose.models.Bookings || mongoose.model("Bookings", Schema)
export default model;