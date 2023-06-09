import React from 'react'
import Grid from '@mui/material/Grid';
import ChatList from 'widgets/ChatList';
import Messages from 'widgets/Messages';
import { Box } from "@mui/material";


const Chat = () => {
 
  // useEffect(() => {
  //   chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
  // }, [messages]);
  return (
    <Box sx={{ flexGrow: 1 }} padding={'0rem 4%'} position={'sticky'} top={110} >
      <Grid container >
        <Grid item xs={12} md={3}  sx={{ display: { xs: 'none', md: 'block' } }}  >
          <ChatList />
        </Grid>
        <Grid item xs={12} md={9}  >
          <Messages />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Chat