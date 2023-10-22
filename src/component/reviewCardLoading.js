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
  Skeleton,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const ReviewCardLoading = ({ data, backgroundColor }) => {
  return (
    <Grid2 xs={12} md={6} lg={4}>
      <Stack p={2} width={"100%"}>
        <Skeleton
          variant="rounded"
          width={"100%"}
          animation="wave"
          height={"200px"}
        />
        <Stack
          direction={"row"}
          mt={4}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            width={"100%"}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rounded" width={"30%"} />
          </Stack>
        </Stack>
      </Stack>
    </Grid2>
  );
};
export default ReviewCardLoading;
