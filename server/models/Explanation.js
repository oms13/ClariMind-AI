import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    originalText: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const History = mongoose.model('History', historySchema);
export default History;