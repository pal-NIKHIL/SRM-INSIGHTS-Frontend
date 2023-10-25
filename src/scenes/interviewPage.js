import {
  Box,
  IconButton,
  Typography,
  Stack,
  useTheme,
  TextField,
  Divider,
  Card,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  Pagination,
} from "@mui/material";
import bg4 from "../assest/bg4.jpg";
import { useState, useEffect, lazy, Suspense } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import nofound from "../assest/nofoundbg.jpg";
import axios from "axios";
import InterviewCard from "../component/interviewCard";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { BiSolidXCircle } from "react-icons/bi";
import InterviewCardLoading from "../component/interviewCardLoading";
const Logoslider = lazy(() => import("../component/logoslider"));
const InterviewPage = () => {
  const [loading, setLoading] = useState(true);
  const [allinterview, setinterview] = useState([]);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    axios
      .get("https://srm-insights-backend.vercel.app/get-interview")
      .then((response) => {
        setinterview(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("error while Fetching Interview");
        setLoading(false);
      });
  }, []);

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
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = FilteredInterviews.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
    <Box>
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "end",
          backgroundColor: "rgb(248,64,64)",
          p: 5,
          position: "relative",
          borderRadius: "20px",
          backgroundImage: `url(${bg4})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: isLargeScreen ? "50vh" : "40vh",
        }}
      >
        {isLargeScreen && (
          <Card
            sx={{
              marginBottom: "-70px",
            }}
          >
            <Stack
              direction={isLargeScreen ? "row" : "row"}
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
        )}
      </Stack>
      {!isLargeScreen && (
        <Stack spacing={2} mt={2}>
          <Card>
            <Stack
              direction="row"
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
            </Stack>
          </Card>
          <Card>
            <Stack
              direction="row"
              bgcolor={"#FAF0E6"}
              spacing={1}
              px={1}
              alignItems={"center"}
            >
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
      )}
      <Grid2 container spacing={3} mt={5} mb={3} justifyContent={"center"}>
        {!loading && currentCards.length === 0 && (
          <Stack spacing={1}>
            <img
              src={nofound}
              height="200px"
              style={{
                objectFit: "contain",
              }}
            />
            <Typography textAlign={"center"} variant="h3">
              Result Not Found
            </Typography>
            <Typography textAlign={"center"} variant="subtitle1">
              Whoops... the information is not available for a moment
            </Typography>
          </Stack>
        )}
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <InterviewCardLoading key={index} />
            ))
          : currentCards.map((data) => {
              return <InterviewCard data={data} />;
            })}
      </Grid2>
      <Stack spacing={6} justifyContent={"center"} alignItems={"center"} mt={1}>
        <Pagination
          count={Math.ceil(FilteredInterviews.length / cardsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
        <Divider
          orientation="horizontal"
          style={{
            width: "100%",
          }}
        />
        <Stack spacing={2} justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h3" textAlign={"center"} fontWeight={"600"}>
            With Great Outcomes
          </Typography>
          <Typography variant="subtitle1" textAlign={"center"} mb={3}>
            Various company were this experience worked
          </Typography>
          <Suspense fallback={<div>waiting</div>}>
            <Logoslider />
          </Suspense>
        </Stack>
      </Stack>
    </Box>
  );
};
export default InterviewPage;
