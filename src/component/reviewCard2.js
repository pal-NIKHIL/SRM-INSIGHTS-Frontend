import React, { useContext, useState } from "react";
import { HiUserCircle } from "react-icons/hi2";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  Avatar,
  Box,
  Slider,
  useTheme,
  Stack,
  Button,
  IconButton,
  CardActionArea,
} from "@mui/material";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import axios from "axios";
import { UserContext } from "../store/usercontext";
const ReviewCard2 = ({ data, backgroundColor }) => {
  const theme = useTheme();
  const token = localStorage.getItem("token");
  const { _id, name, date, content, upvotes, downvotes, avatar } = data;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const { state } = useContext(UserContext);
  const handleupvote = () => {
    axios
      .post(
        "https://srm-insights-backend.vercel.app/upvote",
        { _id },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handledownvote = () => {
    axios
      .post(
        "https://srm-insights-backend.vercel.app/downvote",
        { _id },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formattedDate = formatDate(date);
  const [readmore, setreadmore] = useState(true);
  return (
    <Card
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: "20px",
      }}
    >
      <Stack p={4}>
        {/* <Button
          color="inherit"
          startIcon={<BiChevronUp size={30} onClick={handleupvote} />}
          sx={{
            backgroundColor: upvotes.includes(state._id) ? "#6fc6e8" : null,
          }}
        >
          {upvotes.length}
        </Button>
        <Button
          color="inherit"
          startIcon={<BiChevronDown size={30} onClick={handledownvote} />}
          sx={{
            backgroundColor: downvotes.includes(state._id) ? "red" : null,
          }}
        >
          {downvotes.length}
        </Button> */}
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: readmore ? "6" : "unset",
            WebkitBoxOrient: "vertical",
          }}
        >
          {content}
        </Typography>
        <Stack direction={"row"} mt={4} justifyContent={"space-between"}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <img src={avatar} height={"40px"} />
            <Stack>
              <Typography variant="subtitle1">{name}</Typography>
              <Typography variant="subtitle2">{formattedDate}</Typography>
            </Stack>
          </Stack>

          <Button
            endIcon={
              readmore ? (
                <BiChevronDown color="white" />
              ) : (
                <BiChevronUp color="white" />
              )
            }
            variant="outlined"
            onClick={() => setreadmore(!readmore)}
            sx={{
              backgroundColor: "#2E2E2E",
              alignItems: "center",
              borderRadius: "20px",
              "&:hover": {
                transform: "none",
                boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.2)",
                backgroundColor: "#161313",
              },
            }}
          >
            <Typography m={1} variant="subtitle2" color="white">
              Read More
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
export default ReviewCard2;
