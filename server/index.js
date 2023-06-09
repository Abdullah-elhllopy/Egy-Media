import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import { fileURLToPath } from "url";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postsRoutes from './routes/posts.js';
import chatRoutes from './routes/chat.js';
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import ChatMessage from "./models/ChatMessage.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const Server_socket = http.createServer(app)

const io = new Server(Server_socket, {
    cors: { origin: '*' }
})

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
app.post('/auth/register', upload.single('picture'), register)
app.post('/posts', verifyToken,  upload.single('picture'), createPost)

// routes 
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postsRoutes);
app.use('/chats', chatRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));



io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('joinRoom', ({ room }) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    // handle leaving a room
    socket.on('leaveRoom', ({ room }) => {
        socket.leave(room);
        console.log(`User ${socket.id} left room ${room}`);
    });
    // handle receiving new messages
    socket.on('newMessage', async ({ senderId, receiverId, content, chatId }) => {
        try {
            const message = new ChatMessage({
                sender: senderId,
                receiver: receiverId,
                content,
                chatId
            });
            await message.save();
            const populatedMessage = await message.populate('sender', 'username');
            const roomId = `${chatId}`;
            io.to(roomId).emit('newMessage', populatedMessage);
        } catch (error) {
            console.error(error);
        }
    });
});

Server_socket.listen(5000, () => console.log(`Listening on port ${5000}`));



