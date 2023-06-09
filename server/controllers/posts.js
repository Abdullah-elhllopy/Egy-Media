import Post from "../models/Post.js";
import User from "../models/User.js";
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const post = await Post.create({
            userId,
            description,
            picturePath,
            likes: {},
            comments: []
        });
        const result = await post.populate('userId', '_id firstName lastName picturePath occupation location')
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('userId', '_id firstName lastName picturePath occupation location');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId : userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({ message: "Post not found" });
        }
        const isLiked = post.likes.get(userId)
        if (isLiked) post.likes.delete(userId)
        else post.likes.set(userId, true)
        const updatePost = await Post.findByIdAndUpdate(id , {likes : post.likes},{new :true})
        res.status(200).json(updatePost)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}