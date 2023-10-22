import {
  Card,
  CardHeader,
  Divider,
  Stack,
  Typography,
  Button,
  Box,
  Avatar,
  useTheme,
  ButtonBase,
  CardContent,
} from "@mui/material";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { HiUserCircle, HiXCircle, HiMiniCheckCircle } from "react-icons/hi2";
import { BiMap } from "react-icons/bi";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUserTie,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";
import companyLogos from "./companylogo";
const InterviewCard = (data) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    _id,
    date,
    company,
    role,
    offerstatus,
    location,
    jobtype,
    rounds,
    content,
    yearsofexperience,
  } = data.data;
  const handlecard = () => {
    navigate(`/interview-Experience/${_id}`);
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const logoName = company.toLowerCase().replace(/\s/g, "");
  const companyLogo = companyLogos[logoName];
  const formattedDate = formatDate(date);
  return (
    <Grid2 xs={12} md={6} lg={4}>
      <Card
        onClick={handlecard}
        sx={{
          // backgroundColor: "#FAF0E6",
          borderRadius: "20px",
        }}
      >
        <Stack p={4} spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <img src={companyLogo} height={"70px"} />
            <Stack
              color={offerstatus ? "#5D9C59" : "#FF6464"}
              direction={"row"}
              spacing={0.5}
              alignItems={"center"}
              margin={1}
            >
              <HiMiniCheckCircle />
              <Typography variant="body2">
                {offerstatus ? "Selected" : "Rejected"}
              </Typography>
            </Stack>
          </Stack>

          <Typography
            variant="body1"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {company + " | " + role}
          </Typography>

          <Typography variant={"subtitle2"}>
            Posted Day {formattedDate}
          </Typography>
          <Divider />
          <Stack direction={"row"} spacing={4}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <FaMapMarkerAlt size={15} />
                <Typography variant="subtitle1">{location}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <FaUserTie size={15} />
                <Typography variant="subtitle1">{role}</Typography>
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <FaBriefcase size={15} />
                <Typography variant="subtitle1">{jobtype}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <FaCalendarAlt size={15} />
                <Typography variant="subtitle1">
                  {yearsofexperience === 0 || yearsofexperience === undefined
                    ? "Fresher"
                    : `${yearsofexperience} YOE`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Grid2>
  );
};
export default InterviewCard;
