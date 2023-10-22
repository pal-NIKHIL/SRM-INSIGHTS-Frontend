import {
  Box,
  Button,
  IconButton,
  Typography,
  Stack,
  useTheme,
  ButtonBase,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  Switch,
  Divider,
  InputAdornment,
  Card,
  SvgIcon,
  OutlinedInput,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Toolbar,
} from "@mui/material";
import bg4 from "../assest/bg4.jpg";
import { useState, useEffect, useContext } from "react";
import { HiOutlineSearch } from "react-icons/hi";

import axios from "axios";
import { UserContext } from "../store/usercontext";
import InterviewCard from "../component/interviewCard";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style.css";
import { BiSolidXCircle } from "react-icons/bi";
const InterviewPage = () => {
  const images = require.context("../assest/companylogos/", true);
  const imageList = images.keys().map((image) => images(image));
  const theme = useTheme();
  const [opencreateReview, setopencreateReview] = useState(false);
  const handleDialog = () => setopencreateReview(!opencreateReview);
  const [iserror, seterror] = useState(false);
  const [errorMesage, seterrorMessage] = useState("");
  const { state } = useContext(UserContext);
  const [allinterview, setinterview] = useState([]);
  const isXsOrSm = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    axios
      .get("https://srm-insights-backend.vercel.app/get-interview")
      .then((response) => {
        setinterview(response.data);
      })
      .catch((e) => {
        console.log("error while Fetching Interview");
      });
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 6,
          autoplay: true,
          speed: 1000,
          autoplaySpeed: 1000,
          cssEase: "linear",
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 3,
          autoplay: true,
          speed: 1000,
          autoplaySpeed: 1000,
          cssEase: "linear",
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 2,
          autoplay: true,
          speed: 1000,
          autoplaySpeed: 1000,
          cssEase: "linear",
          arrows: false,
        },
      },
    ],
  };
  const [FilteredInterviews, setFilteredInterviews] = useState([]);
  const [searchcompany, setsearchcompany] = useState("");
  const [searchRole, setsearchRole] = useState("");

  useEffect(() => {
    const filteredData = allinterview.filter((interview) => {
      const matchesCompany =
        !searchcompany ||
        interview.company.toLowerCase().includes(searchcompany.toLowerCase());
      const matchesRole =
        !searchRole ||
        interview.role.toLowerCase().includes(searchRole.toLowerCase());
      return matchesCompany && matchesRole;
    });
    setFilteredInterviews(filteredData);
  }, [searchcompany, searchRole, allinterview]);

  const handleRoleChange = (event) => {
    setsearchRole(event.target.value);
  };

  const roles = [
    "Software Developer",
    "Web Developer",
    "Mobile App Developer",
    "Database Administrator",
    "Data Scientist",
    "Data Analyst",
    "Data Engineer",
    "Machine Learning Engineer",
    "Artificial Intelligence Engineer",
    "Computer Programmer",
    "Quality Assurance Engineer",
    "Systems Analyst",
    "Network Engineer",
    "Security Consultant",
    "DevOps Engineer",
    "Cloud Engineer",
    "Game Developer",
    "UI/UX Designer",
    "Embedded Systems Developer",
    "IT Project Manager",
    "Bioinformatics Specialist",
    "Robotics Engineer",
    "Computer Vision Engineer",
    "Blockchain Developer",
    "Quantum Computing Researcher",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FAF0E6",
        bgcolor: "white",
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "end",
          my: 1,
          mx: 1,
          backgroundColor: "rgb(248,64,64)",
          p: 5,
          position: "relative",
          borderRadius: "20px",
          backgroundImage: `url(${bg4})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          // backgroundImage: `linear-gradient(rgb(221,180,255,0.7),rgb(221,180,255,0.7)), url(https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm452-f-014.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=c9a1b1405f77180971ff686041bef281)`,
          height: "50vh",
        }}
      >
        {/* <Box>
            <Typography variant="h2" textAlign={"center"}>
              Share Your Interview Insights
            </Typography>
            <Typography
              variant="subtitle1"
              sx={
                {
                  // color: "white",
                }
              }
              mb={4}
            >
              Help others succeed by sharing your unique interview experiences.
              Contribute to a growing community of job seekers and recruiters
            </Typography>
          </Box> */}
      </Stack>
      <Grid2 container spacing={3} mx={0.5} my={3}>
        <Grid2 xs={12} lg={8}>
          <Grid2 container>
            {FilteredInterviews.map((data) => {
              return <InterviewCard data={data} />;
            })}
          </Grid2>
        </Grid2>
        <Grid2 xs={12} lg={4}>
          <Stack spacing={4}>
            <Typography variant="h2" fontWeight={"600"}>
              Interview Experience
            </Typography>
            <Typography variant="subtitle1">
              Get the inside scoop on college life from students who've been
              there
            </Typography>
            <Card
              sx={
                {
                  // marginBottom: "-70px",
                  // width: "500px",
                }
              }
            >
              <Stack
                direction={"row"}
                bgcolor={"#FAF0E6"}
                spacing={1}
                px={1}
                alignItems={"center"}
              >
                <div style={{ marginLeft: "8px", marginTop: "6px" }}>
                  <HiOutlineSearch />
                </div>
                <TextField
                  value={searchcompany}
                  onChange={(event) => setsearchcompany(event.target.value)}
                  fullWidth
                  placeholder="Company Name"
                  sx={{
                    "& fieldset": { border: "none" },
                  }}
                />

                <IconButton
                  onClick={() => {
                    setsearchcompany("");
                    setsearchRole("");
                  }}
                >
                  <BiSolidXCircle />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <FormControl
                  fullWidth
                  sx={{
                    "& fieldset": { border: "none" },
                  }}
                >
                  <Select
                    value={searchRole}
                    displayEmpty
                    onChange={handleRoleChange}
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    <MenuItem value="">Job Role</MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Card>
          </Stack>
        </Grid2>
      </Grid2>
      <Stack spacing={2} mt={5} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h3" textAlign={"center"} fontWeight={"600"}>
          With Great Outcomes
        </Typography>
        <Typography variant="subtitle1" textAlign={"center"} mb={3}>
          Various company were this experience worked
        </Typography>
        <Slider
          {...settings}
          style={{
            height: "100px",
            width: isXsOrSm ? "100vw" : "88vw",
          }}
        >
          {imageList.map((image, index) => (
            <Card
              key={index}
              sx={{
                width: "80px",
                height: "80px",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <img
                src={image}
                alt={`image-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Card>
          ))}
        </Slider>
        <Slider
          {...settings}
          rtl={true}
          style={{
            height: "100px",
            width: isXsOrSm ? "100vw" : "88vw",
          }}
        >
          {imageList.map((image, index) => (
            <Card
              key={index}
              sx={{
                width: "80px",
                height: "80px",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <img
                src={image}
                alt={`image-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Card>
          ))}
        </Slider>
      </Stack>
    </Box>
  );
};
export default InterviewPage;
