import User from "../models/User.js";

export const getUser = async (req, res,) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const userFriends = await User.findById(id).populate('friends', '_id firstName lastName picturePath location occupation');
        res.status(200).json(userFriends.friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        // const userFriend = user.friends.find(friend => friend._id.equals(friendId))

        if (user.friends.includes(friendId)) {
            await user.updateOne({ $pull: { friends: friendId } });
            await friend.updateOne({ $pull: { friends: id } });
            await friend.save()
            await user.save()

        } else {
            await user.updateOne({ $push: { friends: friendId } });
            await friend.updateOne({ $push: { friends: id } });
            await friend.save()
            await user.save()

        }
        res.status(200).json('done');

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}