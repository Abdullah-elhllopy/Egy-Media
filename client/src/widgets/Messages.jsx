import { ListWrapper } from 'components/WidgetWrapper'
import React, { useEffect, useState, useRef } from 'react'
import { Box, useTheme } from "@mui/material";
import API from 'servers/API';
import { useParams } from 'react-router-dom';
import { TextInput } from "components/TextInput";
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import Message from 'components/Message';

const socket = io('http://localhost:5000');

const Messages = () => {
    const { palette } = useTheme();
    const { friendId, chatId } = useParams();
    const { _id } = useSelector((state) => state.user);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const chatBoxRef = useRef(null);
    const hasChat = Boolean(Number(chatId) !== 0);
    const getChatMEssages = async () => {
        try {
            if (hasChat) {
                const { data } = await API.get(`chats/${chatId}/messages`);
                if (data) {
                    setChatMessages(data);
                }
            }

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getChatMEssages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId])
    useEffect(() => {
        if (hasChat) {
            const room = `${chatId}`;
            socket.emit('joinRoom', { room });
            socket.on('newMessage', (newMessage) => {
                setChatMessages((messages) => [...messages, newMessage]);
            });
            return () => {
                socket.emit('leaveRoom', { room });
                socket.off('newMessage');
            };
        }

    }, [_id, chatId, friendId, hasChat]);

    const handleSubmit = (event) => {
        event.preventDefault();
        socket.emit('newMessage', { senderId: _id, receiverId: friendId, content: message, chatId: chatId });
        setMessage('');
    };
    useEffect(() => {
        if (hasChat) {
            chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
        }
    }, [chatId, chatMessages.length, hasChat]);

    return (
        <ListWrapper sx={{ border: `solid 1px ${palette.neutral.light}`, background: palette.background.default }}  >
            {
                !hasChat? null :
                    <>
                        <Box ref={chatBoxRef}
                            sx={{
                                display: 'flex',
                                position: 'relative',
                                flexDirection: 'column', gap: 2,
                                height: '100%', maxHeight: 500, overflowY: 'scroll',
                                scrollbarGutter: 'stable',
                            }}
                            className='custom_scrollbar'
                        >
                            {
                                chatMessages.map((message, index) => (
                                    <React.Fragment key={`${Math.random()}-${index}`} >
                                        <Message message={message} />
                                    </React.Fragment>
                                ))
                            }
                        </Box>
                        <TextInput setText={setMessage} text={message} handleSubmit={handleSubmit} />
                    </>
            }

        </ListWrapper>
    )
}

export default Messages