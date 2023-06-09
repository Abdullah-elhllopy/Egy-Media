import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { setFriends } from "state";
import { useState, useEffect } from "react";
import API from "servers/API";
const Friend = ({ friendId, firstName, lastName, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState(false)
  const { _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const is_my_post = friendId !== _id

  useEffect(() => {
    if (friends && is_my_post) {
      if (friends.find((friend) => friend._id === friendId)) {
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
    }
  }, [friendId, friends, is_my_post])
  const patchFriend = async () => {
    API.patch(`users/${_id}/${friendId}`).then(res => {
      if (isFriend) {
        dispatch(setFriends({ friends: friends.filter((friend) => friend._id !== friendId) }))
        setIsFriend(false)
      } else {
        dispatch(setFriends({
          friends: [...friends, {
            _id: friendId,
            lastName: lastName,
            firstName: firstName,
            picturePath: userPicturePath,
            occupation: subtitle
          }]
        }))
        setIsFriend(true)
      }
    })

  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
              },
            }}
          >
            {firstName}  {lastName}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {
        friendId !== _id ?
          <IconButton
            onClick={() => patchFriend()}
            sx={{ p: "0.6rem" }}
          >
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton> : null
      }

    </FlexBetween>
  );
};

export default Friend;