import {
  Box,
  Button,
  Typography,
  Stack,
  useTheme,
  Card,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";

import { Masonry } from "@mui/lab";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import ReviewCard2 from "../component/reviewCard2";
import "../style.css";
import axios from "axios";
import bg6 from "../assest/bg6.jpg";
import { UserContext } from "../store/usercontext";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { BiHome } from "react-icons/bi";
import ReviewCardLoading from "../component/reviewCardLoading";

const ReviewPage = () => {
  const theme = useTheme();
  const { state } = useContext(UserContext);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
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
        <Grid2 xs={12}>
          {/* <Stack
            m={1}
            sx={{
              backgroundImage: `url(${bg6})`,
              backgroundColor: "rgb(185,160,254)",
              borderRadius: "20px",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              // backgroundImage: `linear-gradient(rgb(185,160,254),rgb(221,180,255,0.7)), url(https://img.freepik.com/premium-vector/stock-market-concept-3d-isometric-outline-web-design-trading-stock-exchange-analysis_9209-9189.jpg?w=2000)`,
            }}
            py={"16vh"}
            px={"8vw"}
            // height={"60vh"}
            spacing={2}
          >
            <Box>
              <Typography variant={isLargeScreen ? "h1" : "h2"}>
                Your Campus
              </Typography>
              <Typography variant={isLargeScreen ? "h1" : "h2"}>
                Your Stories
              </Typography>
            </Box>
          </Stack> */}
        </Grid2>
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
