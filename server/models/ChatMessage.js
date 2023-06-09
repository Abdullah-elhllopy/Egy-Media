import mongoose from "mongoose";

const chatMessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiver: { type: mongoose.Schema.Types.ObjectId , required: true, ref: 'User' },
    content: {
        type: String,
        required: true
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Chat'
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;