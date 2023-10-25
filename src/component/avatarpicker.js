import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
const AvatarPicker = ({ setavatarpicker, avatarpicker, setavatarImage }) => {
  const [avatar, setavatar] = useState([]);
  useEffect(() => {
    axios
      .get("https://srm-insights-backend.vercel.app/profileAvatar")
      .then((response) => setavatar(response.data));
  }, []);
  const theme = useTheme();
  const [addAvatar, setaddAvatar] = useState();
  return (
    <Stack alignItems={"center"} spacing={3}>
      <Typography variant="h3">Pick an Avatar</Typography>
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
        {avatar.map((avatar, index) => (
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
              console.log("step1", avatar);
              setaddAvatar(avatar);
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
          console.log("step2", addAvatar);
          setavatarImage(addAvatar);
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
