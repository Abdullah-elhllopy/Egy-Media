import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";


const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();

  const friends = useSelector((state) => state.user.friends);



  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
            firstName={friend.firstName}
            lastName={friend.lastName}
 
      
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;