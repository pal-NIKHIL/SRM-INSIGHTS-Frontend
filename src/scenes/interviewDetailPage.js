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
} from "@mui/material";
import bg5 from "../assest/bg5.jpg";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { HiUserCircle, HiXCircle, HiMiniCheckCircle } from "react-icons/hi2";
import { BiBarChart } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sl1 from "../assest/sl1.svg";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUserTie,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";
import bg8 from "../assest/bg8.jpg";
import companyLogos from "../component/companylogo";
import defaultlogo from "../assest/avataricon/robot.png";
const InterviewDetail = () => {
  const { _id } = useParams();
  console.log(_id);
  const theme = useTheme();
  const [jobDetail, setjobDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companylogo, setcompanylogo] = useState(defaultlogo);
  useEffect(() => {
    if (_id) {
      axios
        .get(`https://srm-insights-backend.vercel.app/get-interview/${_id}`)
        .then((response) => {
          setjobDetail(response.data);

          const logoName = response.data.company
            .toLowerCase()
            .replace(/\s/g, "");
          setcompanylogo(companyLogos[logoName]);
          setLoading(false);
        })
        .catch((e) => {
          console.log("error while Fetching Interview Detail");
          setLoading(false);
        });
    }
  }, [_id]);
  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          width: "90vw",
        }}
      >
        <img
          src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif"
          alt="Loading..."
          width={"250px"}
        />
      </Box>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formattedDate = formatDate(jobDetail.date);
  return (
    <Box>
      <Stack>
        <Stack
          py={"8vh"}
          px={"8vw"}
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            backgroundImage: `linear-gradient(to left, white, rgb(185,160,254), rgb(221,180,255,0.3)), url(${bg8})`,

            // backgroundImage: `url(${bg8})`,
            backgroundSize: "contain",
            backgroundPosition: "right",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h1" textAlign={"center"}>
            Interview Details
          </Typography>
          <img src={sl1} height={"300px"} />
        </Stack>

        <Grid2 container spacing={2} mt={2}>
          <Grid2 xs={12} lg={9}>
            <Stack
              sx={{
                borderRadius: "10px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                p: 4,
              }}
              spacing={2}
            >
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack direction="row" alignItems={"center"} spacing={1}>
                  {/* <img src={companylogo} height={"100px"} /> */}

                  <Typography variant="h3">
                    {jobDetail.company + " | " + jobDetail.role}
                  </Typography>
                </Stack>
                <Stack
                  color={jobDetail.offerstatus ? "green" : "red"}
                  direction={"row"}
                  spacing={0.5}
                  alignItems={"center"}
                >
                  <HiMiniCheckCircle />
                  <Typography variant="body1">
                    {jobDetail.offerstatus ? "Selected" : "Rejected"}
                  </Typography>
                </Stack>
              </Stack>

              <Typography variant="subtitle1">{`posted by  ${jobDetail.name} on ${formattedDate}`}</Typography>
              <Divider />
              {jobDetail.content.map((data) => {
                return <Typography variant="body2">{data}</Typography>;
              })}
            </Stack>
          </Grid2>
          <Grid2 xs={12} lg={3}>
            <Stack spacing={2}>
              <Card p={2} sx={{ height: "100px" }}>
                <img
                  src={companylogo}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Card>
              <Card
                sx={{
                  p: 3,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} my={3}>
                  <FaMapMarkerAlt size={20} />
                  <Typography variant="subtitle1">
                    {jobDetail.location}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} my={3}>
                  <FaUserTie size={20} />
                  <Typography variant="subtitle1">{jobDetail.role}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} my={3}>
                  <FaBriefcase size={20} />
                  <Typography variant="subtitle1">
                    {jobDetail.jobtype}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} my={3}>
                  <FaCalendarAlt size={20} />
                  <Typography variant="subtitle1">
                    {jobDetail.yearsofexperience === 0 ||
                    jobDetail.yearsofexperience === undefined
                      ? "Fresher"
                      : `${jobDetail.yearsofexperience} YOE`}
                  </Typography>
                </Stack>
              </Card>
            </Stack>
          </Grid2>
        </Grid2>
      </Stack>
    </Box>
  );
};
export default InterviewDetail;
