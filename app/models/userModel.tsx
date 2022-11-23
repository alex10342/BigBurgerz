import mongoose from "mongoose";

// Configure Mongo Schema
const Schema = new mongoose.Schema({
    name: String,
    email: String || undefined,
    phone: String || undefined,
    password: String,
    role: {
        type: String,
        default: "customer"
    }

}, { collection: "userdata"})

// Export new Schema if one does not exist
const model = mongoose.models.User || mongoose.model("User", Schema)
export default model;