import React from 'react'
import { Box, useTheme } from "@mui/material";
import { MessageWrapper } from './WidgetWrapper';
import { useSelector } from 'react-redux';
const Message = ({ message }) => {
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const is_sender = message.sender._id === _id;
    return (
        <Box sx={{ display: 'block', marginX: 1 }} >
            <Box sx={{
                display: 'flex', alignItems: 'flex-start',
                flexDirection: is_sender ? 'row-reverse' : ''
            }} >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column', gap: 1,
                }}>
                    <MessageWrapper sx={{
                        background: is_sender ? palette.background.custom : palette.background.alt,
                        color: is_sender ? palette.primary.light :''
                    }}
                    >
                        {
                            message.content
                        }
                    </MessageWrapper>
                </Box>
            </Box>
        </Box>
    )
}

export default Message