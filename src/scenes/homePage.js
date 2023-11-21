import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CountUp from "react-countup";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import bg10 from "../assest/bg11.jpg";
import rv1 from "../assest/review1.svg";
import ie1 from "../assest/ie1.svg";
import ie2 from "../assest/ie2.png";
import an1 from "../assest/an1.svg";
import hand from "../assest/hand.png";
import { Link } from "react-router-dom";
import github from "../assest/companylogos/github-logo.png";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";
const HomePage = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [totalReview, settotalreview] = useState(0);
  const [totalInterview, settotalInterview] = useState(0);
  useEffect(() => {
    axios
      .get("https://srm-insights-backend.vercel.app/totalCount")
      .then((response) => {
        settotalreview(response.data.totalReview);
        settotalInterview(response.data.totalInterview);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);
  return (
    <Box>
      <Stack spacing={4}>
        <Stack>
          <Stack
            sx={{
              background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)),url(${bg10})`,
              backgroundSize: "cover",
              borderRadius: "20px",
            }}
            justifyContent="center"
            alignItems="center"
            spacing={4}
            py={isLargeScreen ? 8 : 4}
            px={isLargeScreen ? 4 : 1}
          >
            <Typography
              variant={isLargeScreen ? "h1" : "h2"}
              textAlign={"center"}
            >
              Discover Stories and Perspectives
            </Typography>
            <Typography variant="subtitle1" textAlign={"center"}>
              Navigating the complex world of education becomes easier when you
              have the insights of those who have walked the same path
            </Typography>
            <ButtonBase
              component={Link}
              to={"/campus-experience"}
              sx={{
                backgroundColor: "#161313",
                width: "fit-content",
                borderRadius: "20px",
                "&:hover": {
                  boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.2)",
                  backgroundColor: "#161313",
                },
              }}
            >
              <Typography m={1.5} variant="subtitle2" color="white">
                Join the Community
              </Typography>
            </ButtonBase>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "center",
              }}
            >
              <Stack p={2}>
                <Typography textAlign={"center"} variant="body1">
                  Total Review
                </Typography>
                <Typography textAlign={"center"} variant="h3">
                  <CountUp end={totalReview} />+
                </Typography>
              </Stack>
              <Stack p={2}>
                <Typography textAlign={"center"} variant="body1">
                  Total Interview
                </Typography>
                <Typography textAlign={"center"} variant="h3">
                  <CountUp end={totalInterview} />+
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            sx={{}}
            justifyContent="center"
            alignItems="center"
            spacing={2}
            py={isLargeScreen ? 8 : 4}
            px={isLargeScreen ? 4 : 1}
          >
            <Typography variant="subtitle1" textAlign={"center"}>
              Why Choose SRM Insights?
            </Typography>
            <Typography variant="h2" textAlign={"center"}>
              We Offer
            </Typography>
            <Grid2 container spacing={2}>
              <Grid2 xs={12} sm={6} lg={3}>
                <Card
                  sx={{
                    borderRadius: "20px",
                  }}
                >
                  <Stack justifyContent={"center"} spacing={3} p={5}>
                    <img
                      src={ie1}
                      style={{
                        objectFit: "contain",
                        height: "180px",
                      }}
                    />

                    <Typography variant="h3" textAlign={"center"}>
                      Interview Experiences
                    </Typography>
                    <Typography variant="subtitle2" textAlign={"center"}>
                      Authentic insights from successful alumni for confident
                      interview preparations.
                    </Typography>
                  </Stack>
                </Card>
              </Grid2>
              <Grid2 xs={12} sm={6} lg={3}>
                <Card
                  sx={{
                    borderRadius: "20px",
                  }}
                >
                  <Stack justifyContent={"center"} spacing={3} p={5}>
                    <img
                      src={ie2}
                      style={{
                        objectFit: "contain",
                        height: "180px",
                      }}
                    />

                    <Typography variant="h3" textAlign={"center"}>
                      Community Support
                    </Typography>
                    <Typography variant="subtitle2" textAlign={"center"}>
                      Join a supportive community, collaborate, connect, and
                      grow together.
                    </Typography>
                  </Stack>
                </Card>
              </Grid2>
              <Grid2 xs={12} sm={6} lg={3}>
                <Card
                  sx={{
                    borderRadius: "20px",
                  }}
                >
                  <Stack justifyContent={"center"} spacing={3} p={5}>
                    <img
                      src={an1}
                      style={{
                        objectFit: "contain",
                        height: "180px",
                      }}
                    />

                    <Typography variant="h3" textAlign={"center"}>
                      Anonymous Discussions
                    </Typography>
                    <Typography variant="subtitle2" textAlign={"center"}>
                      Ask questions, share your experiences, and engage in
                      candid discussions anonymously
                    </Typography>
                  </Stack>
                </Card>
              </Grid2>
              <Grid2 xs={12} sm={6} lg={3}>
                <Card
                  sx={{
                    borderRadius: "20px",
                  }}
                >
                  <Stack justifyContent={"center"} spacing={3} p={5}>
                    <img
                      src={rv1}
                      style={{
                        objectFit: "contain",
                        height: "180px",
                      }}
                    />

                    <Typography variant="h3" textAlign={"center"}>
                      Explore Campus
                    </Typography>
                    <Typography variant="subtitle2" textAlign={"center"}>
                      Dive into genuine reviews and advice about campus
                      facilities, events, and the vibrant student community.
                    </Typography>
                  </Stack>
                </Card>
              </Grid2>
            </Grid2>
          </Stack>
        </Stack>

        <Box
          sx={{
            backgroundColor: "#f7f7f7",
            padding: "40px 0",
            textAlign: "center",
          }}
        >
          <img src={github} />
          <Typography variant={isLargeScreen ? "h2" : "h3"}>
            Contribute to Our Project
          </Typography>
          <Typography variant="body1">
            Help us improve! Contribute to our project on GitHub.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="https://github.com/pal-NIKHIL/SRM-INSIGHTS"
            target="_blank"
            sx={{
              backgroundColor: "#161313",
              alignItems: "center",
              borderRadius: "30px",
              marginTop: "10px",
              "&:hover": {
                boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.2)",
                backgroundColor: "#161313",
              },
            }}
          >
            <Typography m={1} variant="subtitle2" color="white">
              Contribute on GitHub
            </Typography>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
export default HomePage;
