import { useEffect , useMemo } from "react";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
    postId,
    postOwner,
    description,
    location,
    picturePath,
    likes,
    comments,
}) => {
    const [postLikes, setPostLikes] = useState(new Map());
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const patchLike = async () => {
        let newMap = new Map([...postLikes]);
        if (newMap.has(loggedInUserId)) {
            newMap.delete(loggedInUserId);
        } else {
            newMap.set(loggedInUserId, true);
        }
        setPostLikes(newMap)

        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };
    const isLiked = useMemo(()=>{
        return Boolean(postLikes.has(loggedInUserId));
    },[loggedInUserId, postLikes]) 
    const likeCount = postLikes.size;
    useEffect(() => {
        const myMap = new Map();
        for (const key in likes) {
            myMap.set(key, likes[key]);
        }
        setPostLikes(myMap)
    }, [likes]);
    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postOwner._id}
                firstName={postOwner.firstName}
                lastName={postOwner.lastName}
                subtitle={location}
                userPicturePath={postOwner.picturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${Math.random()}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;