import mongoose from "mongoose";

const chatSchema =  mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
 
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;