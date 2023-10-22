import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Card,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import bg8 from "../assest/bg8.jpg";
import rv1 from "../assest/review1.svg";
import rv2 from "../assest/review2.svg";
import sl1 from "../assest/sl1.svg";
import ie1 from "../assest/ie1.svg";
import community from "../assest/community2.png";
import ie2 from "../assest/ie2.png";
import campus1 from "../assest/campus1.svg";
import privacybg from "../assest/privacy.jpg";
import an1 from "../assest/an1.svg";
import img1 from "../assest/interview1.png";
import bg5 from "../assest/bg5.jpg";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
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
        <Stack
          sx={{
            backgroundColor: "#ffb840",
            borderRadius: "20px",
            position: "relative",
            height: "300px",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={rv2}
            // width={"100%"}
            height={"100%"}
            objectFit="contain"
            style={{
              borderRadius: "20px",
            }}
          />
          <Stack
            position="absolute"
            bottom="0"
            width="100%"
            textAlign="center"
            padding="20px"
            marginBottom={"-90px"}
          >
            <Typography
              variant={isLargeScreen ? "h1" : "h2"}
              textAlign={"center"}
              color={"white"}
            >
              Discover Stories
            </Typography>
            <Typography
              variant={isLargeScreen ? "h1" : "h2"}
              textAlign={"center"}
            >
              and Perspectives
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{}} justifyContent={"center"} pt={5}>
          {/* <Typography variant="h3" textAlign={"center"}>
            Why Choose SRM Insights ?
          </Typography> */}

          <Grid2 container spacing={2} py={5} px={{ xs: 1, md: 10 }}>
            <Grid2 xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: "20px",
                }}
              >
                <Stack justifyContent={"center"} spacing={3} p={5}>
                  <img
                    src={privacybg}
                    height={"200px"}
                    style={{
                      objectFit: "contain",
                    }}
                  />

                  <Typography variant="h3" textAlign={"center"}>
                    Privacy
                  </Typography>
                  <Typography variant="subtitle2" textAlign={"center"}>
                    Your privacy is our priority. Feel comfortable sharing your
                    thoughts and questions anonymously, creating a judgment-free
                    zone for meaningful conversations
                  </Typography>
                </Stack>
              </Card>
            </Grid2>
            <Grid2 xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: "20px",
                }}
              >
                <Stack justifyContent={"center"} spacing={3} p={5}>
                  <img src={campus1} height={"200px"} />

                  <Typography variant="h3" textAlign={"center"}>
                    Community
                  </Typography>
                  <Typography variant="subtitle2" textAlign={"center"}>
                    Join a community of like-minded students who are passionate
                    about helping each other succeed. Connect, collaborate, and
                    grow together.
                  </Typography>
                </Stack>
              </Card>
            </Grid2>
            <Grid2 xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: "20px",
                }}
              >
                <Stack justifyContent={"center"} spacing={3} p={5}>
                  <img src={rv1} height={"200px"} />

                  <Typography variant="h3" textAlign={"center"}>
                    Authenticity
                  </Typography>
                  <Typography variant="subtitle2" textAlign={"center"}>
                    Feel comfortable sharing your thoughts and questions
                    anonymously, creating a judgment-free zone for meaningful
                    conversations.
                  </Typography>
                </Stack>
              </Card>
            </Grid2>
          </Grid2>
        </Stack>
        <Divider width="100%" height="10px" color="black" />
        <Stack justifyContent={"center"}>
          <Typography variant="h2" textAlign={"center"}>
            Our features
          </Typography>
          <Typography variant="subtitle2" textAlign={"center"}>
            Empowering Your Journey with SRM Insights – Where Every Insight Is a
            Stepping Stone to Your Success!
          </Typography>
          <Grid2 container spacing={2} py={5} px={{ xs: 1, md: 10 }}>
            <Grid2 xs={12}>
              <Card
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#ddb4ff",
                }}
              >
                <Stack direction={{ xs: "column", md: "row" }} p={4}>
                  <Stack justifyContent={"center"} spacing={3}>
                    <Typography variant="h2">Explore Campus Life</Typography>
                    <Typography variant="body2">
                      Dive into genuine reviews and advice about campus
                      facilities, events, and the vibrant student community. Get
                      a firsthand look at the heart of SRM University.
                    </Typography>
                  </Stack>
                  <img src={campus1} width={"100%"} />
                </Stack>
              </Card>
            </Grid2>
            <Grid2 xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#fdb9f4",
                }}
              >
                <Stack justifyContent={"center"} spacing={3} p={4}>
                  <Typography variant="h2">Interview Experiences</Typography>
                  <Typography variant="body2">
                    Prepare for your future with real-time on-campus interview
                    experiences. Learn from the successes and challenges faced
                    by fellow students during placements !
                  </Typography>
                  <img
                    src={ie2}
                    height={"200px"}
                    style={{ objectFit: "contain" }}
                  />
                </Stack>
              </Card>
            </Grid2>
            <Grid2 xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#ffd262",
                }}
              >
                <Stack justifyContent={"center"} spacing={3} p={4}>
                  <Typography variant="h2">Anonymous Discussions</Typography>
                  <Typography variant="body2">
                    Ask questions, share your experiences, and engage in candid
                    discussions anonymously. Create a safe space for open
                    conversations and receive advice from your peers.
                  </Typography>
                  <img src={an1} height={"200px"} />
                </Stack>
              </Card>
            </Grid2>
          </Grid2>
        </Stack>
        <Box
          sx={{
            backgroundColor: "#f7f7f7",
            padding: "40px 0",
            textAlign: "center",
          }}
        >
          <Typography variant="h2">Contribute to Our Project</Typography>
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
