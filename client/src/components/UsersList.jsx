import React, { useEffect, memo, useState } from 'react'
import { Box, Typography, useTheme, Avatar } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import MessageIcon from '@mui/icons-material/Message';

import API from 'servers/API';
import { toast } from 'react-toastify';
const UsersList = memo(({ userId }) => {
    const navigate = useNavigate();
    const [onlineFriends, setOnlineFriends] = useState([])
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const getUserFriends = async () => {
        try {
            const { data } = await API.get(`users/${userId}/friends`);
            if (data) {
                setOnlineFriends(data);
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getUserFriends();
    }, [])

    const handleStartPrivateChat = async (friendId) => {
        try {
            const { data } = await API.post('chats', { participants: [userId, friendId] });
            if (data) navigate(`/chat/${data._id}/${friendId}`);
        }catch (error) {
            toast.error(error.message)
        }
    };
    return (
        <Box p={"1rem 0"}>
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                Online Friends
            </Typography>
            {
                onlineFriends.map(friend => (
                    <FlexBetween marginBottom={1.5} key={friend._id}>
                        <FlexBetween gap="1rem">
                            <Avatar src={`http://localhost:3001/assets/${friend.picturePath}`} alt='user image' />
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    {friend.firstName} {friend.lastName}
                                </Typography>
                                <Typography color={medium}>{friend.occupation}</Typography>
                            </Box>
                        </FlexBetween>
                        <MessageIcon sx={{ color: main, cursor: 'pointer' }} onClick={() => handleStartPrivateChat(friend._id)} />
                    </FlexBetween>
                ))
            }
        </Box>
    )
})

export default UsersList