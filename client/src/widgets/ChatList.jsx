import React, { useState, useEffect } from 'react'
import { Box, Typography, useTheme, Avatar } from "@mui/material";
import { ListWrapper } from 'components/WidgetWrapper';
import { useSelector } from "react-redux";
import MessageIcon from '@mui/icons-material/Message';
import API from 'servers/API';
import FlexBetween from 'components/FlexBetween';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const ChatList = () => {
    const navigate = useNavigate();
    const [onlineFriends, setOnlineFriends] = useState([])
    const { _id } = useSelector((state) => state.user);
    const { palette } = useTheme();
    const { chatId } = useParams();

    const getUserFriends = async () => {
        try {
            const { data } = await API.get(`chats/${_id}`);
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

    return (
        <ListWrapper sx={{ border: `solid 1px ${palette.neutral.light}` }} className="new-scrollbar"  >
            <Typography fontSize="1rem" fontWeight="500" >
                Chat List
            </Typography>
            {
                onlineFriends.length > 0 ?
                    <>
                        {
                            onlineFriends.map(friend => (
                                <FlexBetween
                                    padding={'0.5rem'}
                                    marginTop={3}
                                    sx={{ cursor: 'pointer', 
                                    background: chatId === friend._id ? palette.background.alt : palette.background.default,
                                    borderRadius : '5px'
                                
                                }}
                                    key={friend._id}
                                    onClick={() => navigate(`/chat/${friend._id}/${friend.participants[0]._id}`)}

                                >
                                    <FlexBetween gap="1rem"
                                    >

                                        <Avatar src={`http://localhost:3001/assets/${friend.participants[0].picturePath}`} alt='user image' />
                                        <Box>
                                            <Typography fontWeight="500">
                                                {friend.participants[0].firstName} {friend.participants[0].lastName}
                                            </Typography>
                                            <Typography >{friend.participants[0].occupation}</Typography>
                                        </Box>
                                    </FlexBetween>
                                    <MessageIcon />
                                </FlexBetween>
                            ))
                        }
                    </>
                    : null
            }
        </ListWrapper>
    )
}

export default ChatList