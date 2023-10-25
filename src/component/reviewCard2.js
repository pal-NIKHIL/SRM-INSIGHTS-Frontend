import React, { useContext, useState } from "react";
import {
  Card,
  Typography,
  useTheme,
  Stack,
  useMediaQuery,
} from "@mui/material";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import axios from "axios";
import { UserContext } from "../store/usercontext";
const ReviewCard2 = ({ data, backgroundColor }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
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
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderRadius: "20px",
              },
            }}
            onClick={() => setreadmore(!readmore)}
            px={1}
          >
            {readmore ? <BiChevronDown /> : <BiChevronUp />}
            {isLargeScreen && (
              <Typography m={1} variant="subtitle1">
                {readmore ? "Read More" : "Read Less"}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
export default ReviewCard2;
