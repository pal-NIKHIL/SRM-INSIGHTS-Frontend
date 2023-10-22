// import { Route, Routes } from "react-router-dom";
// import ReviewPage from "./scenes/reviewPage";
// import LoginPage from "./scenes/loginPage";
// import {
//   Container,
//   CssBaseline,
//   Box,
//   AppBar,
//   Stack,
//   Typography,
//   Drawer,
//   IconButton,
//   Avatar,
//   ButtonBase,
//   Toolbar,
//   Divider,
//   Button,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import { alpha } from "@mui/material";
// import { useEffect, useState } from "react";
// import { HiUserCircle } from "react-icons/hi2";
// import { useTheme } from "@mui/material";
// import community1 from "./assest/community1.png";
// import { HiOutlineBars3 } from "react-icons/hi2";
// import { VscFeedback } from "react-icons/vsc";
// import interviewIcon from "./assest/interview.png";
// import { Link } from "react-router-dom";
// import { PiSuitcaseSimpleBold } from "react-icons/pi";
// import { FaUserAstronaut } from "react-icons/fa";
// import { IoNotifications } from "react-icons/io5";
// import { SlLogout } from "react-icons/sl";
// import { RiArrowDropDownFill } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";
// import { TbLogout2 } from "react-icons/tb";
// import logo from "./assest/logo1.png";
// import axios from "axios";
// import { useContext } from "react";
// import { UserContext } from "./store/userContext";
// function App() {
//   const isUserlogin = localStorage.getItem("token");
//   const activepath = useLocation().pathname;
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const [ismobilescreen, setmobilescreen] = useState(false);
//   const drawerWidth = 240;
//   const minidrawerWidth = 80;
//   const [openprofile, setopenprofile] = useState(true);
//   const [anchorel, setanchorel] = useState(null);

//   const {handlelogin,state}=useContext(UserContext);

//   const handleDrawerToggle = () => {
//     sethoverdrawer(true);
//     setmobilescreen(!ismobilescreen);
//   };
//   const [hoverdrawer, sethoverdrawer] = useState(false);
//   const [userData, setuserData] = useState("");
//   useEffect(() => {
//     if (isUserlogin) {
//       axios
//         .get("http://localhost:3001/get-userlogin", {
//           headers: {
//             "x-access-token": isUserlogin,
//           },
//         })
//         .then((response) => setuserData(response.data))
//         .catch((e) => {
//           console.log("error while fetching userData");
//         });
//     }
//   }, [isUserlogin]);
//   const drawerItem = [
//     {
//       title: "Interview",
//       path: "/interview-experience",
//       icon: <PiSuitcaseSimpleBold size={20} />,
//     },
//     {
//       title: "Campus Life",
//       path: "/",
//       icon: <VscFeedback size={20} />,
//     },
//     {
//       title: "Logout",
//       path: "/login",
//       icon: (
//         <TbLogout2
//           size={21}
//           onClick={() => {
//             localStorage.removeItem("token");
//           }}
//         />
//       ),
//     },
//   ];
//   const drawer = (
//     <Box
//       display={"flex"}
//       flexDirection={"column"}
//       color="white"
//       sx={{
//         justifyContent: "space-between",
//         alignContent: "center",
//         height: "100vh",
//         maxWidth: { drawerWidth },
//       }}
//       p={2}
//     >
//       <Box display={"flex"} flexDirection={"column"}>
//         <img src={logo} />
//         <Toolbar />
//         <Divider color="white" mt={2} />
//         <Stack spacing={2} mt={2}>
//           {drawerItem.map((item) => {
//             return (
//               <ButtonBase
//                 component={Link}
//                 to={item.path}
//                 sx={{
//                   justifyContent: "start",
//                   alignContent: "center",
//                   backgroundColor:
//                     activepath === item.path
//                       ? theme.background.purple
//                       : "transparent",
//                   color: activepath === item.path ? "black" : "white",

//                   m: 1,
//                   "&:hover": {
//                     backgroundColor: theme.background.purple,
//                     color: "black",
//                   },
//                 }}
//               >
//                 <Stack
//                   direction={"row"}
//                   sx={{
//                     alignItems: "center",
//                   }}
//                   spacing={2}
//                   m={2}
//                 >
//                   {item.icon}
//                   {hoverdrawer && <Typography>{item.title}</Typography>}
//                 </Stack>
//               </ButtonBase>
//             );
//           })}
//         </Stack>
//       </Box>
//       {hoverdrawer && (
//         <Box>
//           <Stack textAlign={"center"}>
//             <img src={community1} width={"100%"} />
//             <Typography>Join the community</Typography>
//             <Typography>and find out more</Typography>
//           </Stack>
//         </Box>
//       )}
//     </Box>
//   );
//   const handleChange = (event) => {
//     setopenprofile(event.target.checked);
//   };
//   const handlemenu = (event) => {
//     setanchorel(event.currentTarget);
//   };
//   const handleclose = () => {
//     setanchorel(null);
//     localStorage.removeItem("token");
//     navigate("/login");
//   };
//   return (
//     <Box display={"flex"}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: {
//             md: `calc(100% - ${hoverdrawer ? drawerWidth : minidrawerWidth}px)`,
//           },
//           ml: { md: `${hoverdrawer ? drawerWidth : minidrawerWidth}px` },
//           transition: theme.transitions.create("width", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//           backdropFilter: "blur(6px)",
//           color: "black",
//           backgroundColor: (theme) =>
//             alpha(theme.palette.background.default, 0.8),
//         }}
//       >
//         <Box
//           display={"flex"}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//           p={1}
//         >
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { md: "none" } }}
//           >
//             <HiOutlineBars3 />
//           </IconButton>
//           <Box sx={{ display: { xs: "none", md: "block" } }}></Box>

//           <Box>
//             <IconButton color="inherit">
//               <IoNotifications />
//             </IconButton>
//             <Button
//               color="inherit"
//               startIcon={<HiUserCircle size={30} />}
//               endIcon={<RiArrowDropDownFill />}
//             >
//               {userData.name}
//             </Button>
//             <Menu
//               id="menu-appbar"
//               open={anchorel}
//               onClose={handleclose}
//               anchorEl={anchorel}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//             >
//               <MenuItem onClick={handleclose}>Logout</MenuItem>
//             </Menu>
//           </Box>
//         </Box>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{
//           width: { md: hoverdrawer ? drawerWidth : minidrawerWidth },
//           flexShrink: { md: 0 },
//           transition: theme.transitions.create("width", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//           overflowX: "hidden",
//         }}
//         aria-label="mailbox folders"
//       >
//         <Drawer
//           variant="temporary"
//           open={ismobilescreen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: "block", md: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           PaperProps={{
//             sx: {
//               backgroundColor: theme.background.black,
//               backdropFilter: "blur(6px)",
//               transition: theme.transitions.create("width", {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.enteringScreen,
//               }),
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           onMouseEnter={() => sethoverdrawer(!hoverdrawer)}
//           onMouseLeave={() => sethoverdrawer(!hoverdrawer)}
//           sx={{
//             display: { xs: "none", md: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: hoverdrawer ? drawerWidth : minidrawerWidth,
//             },
//           }}
//           PaperProps={{
//             sx: {
//               backgroundColor: theme.background.black,
//               transition: theme.transitions.create("width", {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.enteringScreen,
//               }),
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           mt: 8,
//           width: {
//             md: `calc(100% - ${hoverdrawer ? drawerWidth : minidrawerWidth}px)`,
//           },
//           transition: theme.transitions.create("width", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//         }}
//       >
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route
//             path="/"
//             element={isUserlogin ? <ReviewPage /> : <LoginPage />}
//           />
//         </Routes>
//       </Box>
//     </Box>
//   );
// }

// export default App;
