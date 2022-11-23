import mongoose from "mongoose";

// Configure Mongo Schema
const Schema = new mongoose.Schema({
    number: Number,
    seats: Number
}, { collection: "tables"})

// Export new Schema if one does not exist
const model = mongoose.models.Table || mongoose.model("Table", Schema)
export default model;