import React from 'react'
import { Send } from '@mui/icons-material';
import { TextField , Box , useTheme } from '@mui/material';

const wrapForm = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    gap : 10
}
const wrapText = {
    width: "100%",
    borderRadius: '10px'
}
export const TextInput = ({ setText, text, handleSubmit }) => {
    const { palette } = useTheme();

    return (
        <Box position={'absolute'} bottom={0} left={0} right={0} >
            <form style={wrapForm} noValidate autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
                <TextField
                    id="standard-text"
                    label=""
                    placeholder="Enter Your Message Here"
                    value={text}
                    style={wrapText}
                    onChange={(e) => setText(e.target.value)}
                />
                <Box onClick={(event) => handleSubmit(event)} >
                    <Send  sx={{color : palette.background.custom}} />
                </Box>
            </form>
        </Box>
    )
}



