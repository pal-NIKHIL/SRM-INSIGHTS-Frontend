import React, { useState } from "react";
import boyAvatar from "../assest/avataricon/boy.png";
import dog1Avatar from "../assest/avataricon/dog (1).png";
import dogAvatar from "../assest/avataricon/dog.png";
import man1Avatar from "../assest/avataricon/man (1).png";
import man2Avatar from "../assest/avataricon/man (2).png";
import manAvatar from "../assest/avataricon/man.png";
import robotAvatar from "../assest/avataricon/robot.png";
import woman1Avatar from "../assest/avataricon/woman (1).png";
import woman2Avatar from "../assest/avataricon/woman (2).png";
import womanAvatar from "../assest/avataricon/woman.png";
import adduser from "../assest/avataricon/user-avatar.png";
import women3Avatar from "../assest/avataricon/indian.png";
import man3Avatar from "../assest/avataricon/man (3).png";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import { FaCircleUser } from "react-icons/fa6";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AiOutlinePlus } from "react-icons/ai";
const AvatarPicker = ({
  setavatarpicker,
  avatarpicker,
  setavatarImage,
  avatarImage,
}) => {
  const avatars = [
    women3Avatar,
    boyAvatar,
    dog1Avatar,
    dogAvatar,
    man3Avatar,
    man1Avatar,
    man2Avatar,
    manAvatar,
    robotAvatar,
    woman1Avatar,
    woman2Avatar,
    womanAvatar,
  ];
  const theme = useTheme();
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      const blob = new Blob([file], { type: file.type });
      reader.readAsDataURL(blob);
    });
  };
  const handleFileUpload = async (avatar) => {
    try {
      const response = await fetch(avatar);
      const blob = await response.blob();
      const base64 = await convertToBase64(blob);
      setavatarImage(base64);
    } catch (error) {
      console.error(error);
    }
  };
  const [addAvatar, setaddAvatar] = useState();
  return (
    <Stack alignItems={"center"} spacing={3}>
      <Typography variant="h3">Pick an Avatar</Typography>
      {/* <IconButton>
        <img src={addavatar} alt={`Add user Avatar`} width={"50px"} />
      </IconButton> */}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "300px",
          border: "2px solid black",
          borderRadius: "10px",
        }}
        p={1}
      >
        {avatars.map((avatar, index) => (
          <IconButton
            sx={{
              flexBasis: "25%",
              "&:hover": {
                transform: "translateY(-4px)",
              },
              backgroundColor:
                addAvatar === avatar ? theme.background.lightpink : "none",
            }}
            onClick={() => {
              setaddAvatar(avatar);
              handleFileUpload(avatar);
            }}
          >
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index}`}
              width={"50px"}
            />
          </IconButton>
        ))}
      </Box>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: "#161313",
          alignItems: "center",
          "&:hover": {
            boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.2)",
            backgroundColor: "#161313",
          },
        }}
        onClick={() => {
          setavatarpicker(!avatarpicker);
        }}
      >
        <Typography
          m={0.5}
          color={theme.palette.secondary.main}
          variant="body2"
        >
          Continue
        </Typography>
      </Button>
    </Stack>
  );
};

export default AvatarPicker;
