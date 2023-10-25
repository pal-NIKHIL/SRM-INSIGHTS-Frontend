import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import { Masonry } from "@mui/lab";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import ReviewCard2 from "../component/reviewCard2";
import "../style.css";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ReviewCardLoading from "../component/reviewCardLoading";

const ReviewPage = () => {
  const [allReview, setallReview] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://srm-insights-backend.vercel.app/get-review")
      .then((response) => {
        setallReview(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("error while Fetching Reviews");
        setLoading(false);
      });
  }, []);

  const colorPattern = [
    "#fde4df",
    "##fffdff",
    "#fff0ce",
    "#efe5ff",
    "#fffdff",
    "#fffdff",
  ];
  return (
    <Box>
      <Grid2 container>
        <Grid xs={12} py={5} px={2}>
          <Typography variant="h2">The Campus Diaries</Typography>
          <Typography variant="subtitle1">
            Get the inside scoop on college life from students who've been there
          </Typography>
        </Grid>

        <Grid xs={12}>
          {loading ? (
            <Grid container>
              {Array.from({ length: 9 }).map((_, index) => (
                <ReviewCardLoading key={index} />
              ))}
            </Grid>
          ) : (
            <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={2}>
              {allReview.map((data, index) => {
                const colorIndex = index % colorPattern.length;
                const backgroundColor = colorPattern[colorIndex];
                return (
                  <ReviewCard2 data={data} backgroundColor={backgroundColor} />
                );
              })}
            </Masonry>
          )}
        </Grid>
      </Grid2>
    </Box>
  );
};

export default ReviewPage;
