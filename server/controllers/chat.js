import Chat from "../models/Chat.js";
import ChatMessage from "../models/ChatMessage.js";

// create a new chat between two users
export const StartNewChat = async (req, res) => {
    const { participants } = req.body;
    try {
        const existingChat = await Chat.findOne({ participants: { $all: participants } });
        if (existingChat) {
            return res.status(201).json(existingChat);
        } else {
            const newChat = new Chat({ participants });
            await newChat.save();
            return res.status(201).json(newChat);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
// get all chats for a given user
export const getAllChatsForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const chatList = await Chat.find({ participants: userId }).populate({
            path: 'participants',
            match: { _id: { $ne: userId } },
            select: 'firstName lastName picturePath occupation'
        }).sort('-createdAt')
        res.status(200).json(chatList);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
// get all chat messages for a given chat
export const getMessagesForChat = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await ChatMessage.find({ chatId: chatId }).populate('sender', 'firstName lastName').sort({ timestamp: 1 });
        // return messages as array of arrays which contain list if order messages frm the same user
        // const arrayOfArrays = await  ChatMessage.aggregate([
        //     { $lookup: {
        //         from: 'User',
        //         localField: '_id',
        //         foreignField: '_id',
        //         as: 'sender'
        //       }
        //     },
        //     // { $match: {  chatId  } },
        //     { $group: {
        //         _id: '$sender._id',
        //         items: { $push: '$$ROOT' }
        //       }
        //     },
        //     { $project: {
        //         _id: 0,
        //         items: 1
        //       }
        //     }
        //   ])
       
        //   const arrayOfArray = arrayOfArrays.map(group => group.items);
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}