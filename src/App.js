import { Route, Routes } from "react-router-dom";
import ReviewPage from "./scenes/reviewPage";

import {
  Container,
  CssBaseline,
  Box,
  AppBar,
  Stack,
  Typography,
  Drawer,
  IconButton,
  Avatar,
  ButtonBase,
  Toolbar,
  Divider,
  Button,
  Menu,
  MenuItem,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  Switch,
  Card,
  Grid,
  Stepper,
  StepLabel,
  StepContent,
  Step,
  RadioGroup,
  FormControlLabel,
  Radio,
  useMediaQuery,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { alpha } from "@mui/material";
import { useEffect, useState, lazy, Suspense } from "react";
import { HiUserCircle } from "react-icons/hi2";
import { useTheme } from "@mui/material";
import community1 from "./assest/community1.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import { VscFeedback } from "react-icons/vsc";
import interviewIcon from "./assest/interview.png";
import { Link } from "react-router-dom";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { FaHome, FaUserAstronaut } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import logo from "./assest/logo1.png";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./store/usercontext";
import InterviewPage from "./scenes/interviewPage";
import InterviewDetail from "./scenes/interviewDetailPage";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUserTie,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Field, Formik } from "formik";
import { BiUpArrow } from "react-icons/bi";

import HomePage from "./scenes/homePage";
const InterviewInputDialog = lazy(() => import("./component/interviewDialog"));
const ReviewInputDialog = lazy(() => import("./component/reviewDialog"));
const LoginPage = lazy(() => import("./scenes/loginPage"));
function App() {
  const isUserlogin = localStorage.getItem("token");
  const activepath = useLocation().pathname;
  const navigate = useNavigate();
  const theme = useTheme();
  const [ismobilescreen, setmobilescreen] = useState(false);
  const drawerWidth = 240;
  const minidrawerWidth = 80;
  const [openprofile, setopenprofile] = useState(true);
  const [anchorel, setanchorel] = useState(null);

  const { handlelogin, state, handlelogout } = useContext(UserContext);

  const handleDrawerToggle = () => {
    sethoverdrawer(true);
    setmobilescreen(!ismobilescreen);
  };

  const [hoverdrawer, sethoverdrawer] = useState(false);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [openinterviewDialog, setopeninterviewDialog] = useState(false);
  const [openreviewDialog, setopenreviewDialog] = useState(false);
  const [openloginDialog, setopenloginDialog] = useState(false);
  const handleReviewDialog = () => setopenreviewDialog(!openreviewDialog);
  const handleInterviewDialog = () =>
    setopeninterviewDialog(!openinterviewDialog);
  useEffect(() => {
    if (isUserlogin) {
      axios
        .get("https://srm-insights-backend.vercel.app/get-userlogin", {
          headers: {
            "x-access-token": isUserlogin,
          },
        })
        .then((response) => handlelogin(response.data))
        .catch((e) => {
          console.log("error while fetching userData");
        });
    }
  }, [isUserlogin]);
  console.log(state.avatar);
  const drawerItem = [
    {
      title: "HomePage",
      path: "/",
      icon: <FaHome />,
    },
    {
      title: "Interview",
      path: "/interview-experience",
      icon: <FaBriefcase />,
    },
    {
      title: "Campus Life",
      path: "/campus-experience",
      icon: <FaBuilding />,
    },
  ];
  const drawer = (
    <Box
      display={"flex"}
      flexDirection={"column"}
      color="white"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        maxWidth: { drawerWidth },
      }}
      my={2}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems="center"
        width={"100%"}
      >
        <img src={logo} width={"50px"} justifyContent="center" />
        <Toolbar />
        <Divider color="white" mt={2} />
        <Stack spacing={4} mt={2} justifyContent={"center"} width={"100%"}>
          {drawerItem.map((item) => {
            return (
              <ButtonBase
                width="100%"
                component={Link}
                to={item.path}
                sx={{
                  justifyContent: hoverdrawer ? "start" : "center",
                  borderRadius: "0px",
                  color: activepath === item.path ? `white` : "#656671",
                  backgroundColor:
                    activepath === item.path ? `#241f35` : "transparent",
                  borderRight:
                    activepath === item.path
                      ? `5px solid #7e60e3`
                      : "transparent",

                  "&:hover": {
                    borderRight: "5px solid #7e60e3",
                    backgroundColor: "#241f35",
                  },
                  my: 1,
                }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    color: activepath === item.path ? `white` : "#656671",
                  }}
                  spacing={2}
                  m={2}
                >
                  {item.icon}
                  {hoverdrawer && (
                    <Typography
                      variant="subtitle1"
                      color={activepath === item.path ? `white` : "#656671"}
                    >
                      {item.title}
                    </Typography>
                  )}
                </Stack>
              </ButtonBase>
            );
          })}
          <Button
            onClick={() => {
              window.location.reload();
              localStorage.removeItem("token");
              handlelogout();
            }}
            width="100%"
            sx={{
              justifyContent: hoverdrawer ? "start" : "center",
              borderRadius: "0px",
              color: "#656671",
              backgroundColor: "transparent",
              borderRight: "transparent",

              "&:hover": {
                borderRight: "5px solid #7e60e3",
                backgroundColor: "#241f35",
              },
              my: 1,
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                color: "#656671",
              }}
              spacing={2}
              m={1}
            >
              <TbLogout2 size={22} />
              {hoverdrawer && (
                <Typography variant="subtitle1" color={"#656671"}>
                  Logout
                </Typography>
              )}
            </Stack>
          </Button>
        </Stack>
      </Box>
      {hoverdrawer && (
        <Box>
          <Stack textAlign={"center"}>
            <img src={community1} width={"100%"} />
            <Typography variant="subtitle2">Join the community</Typography>
            <Typography variant="subtitle2">and find out more</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );

  console.log(activepath);
  return (
    <Box display={"flex"} bgcolor={"#fefefe"}>
      <Suspense>
        {activepath === "/interview-experience" && openinterviewDialog && (
          <InterviewInputDialog handleInterviewDialog={handleInterviewDialog} />
        )}
        {activepath === "/campus-experience" && openreviewDialog && (
          <ReviewInputDialog handleReviewDialog={handleReviewDialog} />
        )}
        {openloginDialog && (
          <LoginPage
            setopenloginDialog={setopenloginDialog}
            openloginDialog={openloginDialog}
          />
        )}
      </Suspense>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: `calc(100% - ${hoverdrawer ? drawerWidth : minidrawerWidth}px)`,
          },
          ml: { md: `${hoverdrawer ? drawerWidth : minidrawerWidth}px` },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          backdropFilter: "blur(6px)",
          color: "black",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          p={1}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <HiOutlineBars3 />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "block" } }}></Box>

          <Box>
            {activepath === "/interview-experience" && (
              <Button
                type="submit"
                variant="outlined"
                onClick={() => {
                  setopeninterviewDialog(!openinterviewDialog);
                }}
                sx={{
                  backgroundColor: "#161313",
                  alignItems: "center",
                  borderRadius: "30px",
                  "&:hover": {
                    boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.2)",
                    backgroundColor: "#161313",
                  },
                }}
              >
                <Typography m={1} variant="subtitle2" color="white">
                  Share Experience
                </Typography>
              </Button>
            )}
            {activepath === "/campus-experience" && (
              <Button
                type="submit"
                variant="outlined"
                onClick={() => {
                  setopenreviewDialog(!openreviewDialog);
                }}
                sx={{
                  backgroundColor: "#161313",
                  alignItems: "center",
                  borderRadius: "30px",
                  "&:hover": {
                    boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.2)",
                    backgroundColor: "#161313",
                  },
                }}
              >
                <Typography m={1} variant="subtitle2" color="white">
                  Create Review
                </Typography>
              </Button>
            )}

            {!isUserlogin ? (
              <Button
                color="inherit"
                startIcon={<HiUserCircle size={30} />}
                onClick={() => setopenloginDialog(!openloginDialog)}
              >
                Login
              </Button>
            ) : (
              <Button
                color="inherit"
                sx={{
                  "&:hover": {
                    transform: "none",
                    boxShadow: "none", // New shadow on hover
                    backgroundColor: "lightgrey",
                  },
                }}
                startIcon={<img src={state.avatar} width={"40px"} />}
                endIcon={isLargeScreen && <RiArrowDropDownFill />}
              >
                {isLargeScreen && state.name}
              </Button>
            )}
          </Box>
        </Box>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: hoverdrawer ? drawerWidth : minidrawerWidth },
          flexShrink: { md: 0 },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={ismobilescreen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: theme.background.black,
              backdropFilter: "blur(6px)",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          onMouseEnter={() => sethoverdrawer(!hoverdrawer)}
          onMouseLeave={() => sethoverdrawer(!hoverdrawer)}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: hoverdrawer ? drawerWidth : minidrawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: theme.background.black,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          mt: 10,
          mx: 1,
          width: {
            md: `calc(100% - ${hoverdrawer ? drawerWidth : minidrawerWidth}px)`,
          },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Routes>
          <Route path="/campus-experience" element={<ReviewPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/interview-experience" element={<InterviewPage />} />
          <Route
            path="/interview-experience/:_id"
            element={<InterviewDetail />}
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
