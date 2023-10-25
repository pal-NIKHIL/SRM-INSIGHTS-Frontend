import {
  Box,
  Button,
  IconButton,
  Typography,
  Stack,
  useTheme,
  Dialog,
  TextField,
  Switch,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { useState, useContext } from "react";
import donegif from "../assest/done.gif";
import loadinggif from "../assest/loading.gif";
import { AiOutlineClose } from "react-icons/ai";
import userIcon from "../assest/avataricon/user-avatar.png";
import { UserContext } from "../store/usercontext";
const ReviewInputDialog = ({ handleReviewDialog }) => {
  const theme = useTheme();
  const initialcreatereview = {
    isAnonymous: false,
    content: "",
  };
  const [loading, setLoading] = useState(false);
  const [iserror, seterror] = useState(false);
  const [done, setdone] = useState(false);
  const [errorMesage, seterrorMessage] = useState("");
  const { state } = useContext(UserContext);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handlecreateReview = (data) => {
    setLoading(true);
    axios
      .post("https://srm-insights-backend.vercel.app/create-review", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setdone(true);
        setTimeout(() => {
          setLoading(false);
          handleReviewDialog();
        }, 2000);
      })
      .catch((error) => {
        seterror(!iserror);
        seterrorMessage(error.response.data.message);
      });
  };
  return (
    <Dialog
      open
      onClose={handleReviewDialog}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "10px",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 1)",
        },
      }}
    >
      <Box
        sx={{
          background: `white`,
        }}
        p={isLargeScreen ? 4 : 1}
        // height={"65vh"}
      >
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            {done ? (
              <img src={donegif} width={"100px"} />
            ) : (
              <img src={loadinggif} width={"100px"} />
            )}
          </Box>
        ) : (
          <>
            <Box position={"absolute"} right={1.8}>
              <img
                src={
                  "https://cdn3d.iconscout.com/3d/premium/thumb/sport-girl-pointing-to-down-side-using-both-hand-8509247-6740768.png?f=webp"
                }
                width={"150px"}
              />
            </Box>
            <Formik
              initialValues={initialcreatereview}
              onSubmit={handlecreateReview}
            >
              {({ values, erros, touched, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Stack m={2} gap={1.5} spacing={1}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      spacing={2}
                    >
                      <Typography variant="h4">Create a post</Typography>
                      {iserror && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              border: "1px solid red",
                              borderRadius: "5px",
                              backgroundColor: "#fdece7",
                              textAlign: "center",
                              p: 2,
                            }}
                          >
                            <Typography>{errorMesage}</Typography>
                          </Box>
                        </Grid>
                      )}
                      <IconButton
                        onClick={handleReviewDialog}
                        sx={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                        }}
                      >
                        <AiOutlineClose />
                      </IconButton>
                    </Stack>
                    <Divider />
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <img
                        src={state.avatar === "" ? userIcon : state.avatar}
                        width={"40px"}
                      />
                      <Typography>{state.name}</Typography>
                    </Stack>

                    <TextField
                      variant="outlined"
                      multiline
                      minRows={4}
                      name="content"
                      placeholder="Have something to share xwith the community?"
                      value={values.content}
                      onChange={handleChange}
                    />
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      spacing={2}
                    >
                      <Typography variant="subtitle1">
                        Post anonymously
                      </Typography>
                      <Switch
                        value={values.isAnonymous}
                        onChange={handleChange}
                        name="isAnonymous"
                      />
                    </Stack>
                    <Button
                      type="submit"
                      variant="outlined"
                      sx={{
                        backgroundColor: "#161313",
                        alignItems: "center",
                        "&:hover": {
                          boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.2)",
                          backgroundColor: "#161313",
                        },
                      }}
                    >
                      <Typography
                        m={0.5}
                        color={theme.palette.secondary.main}
                        textAlign={"center"}
                        variant="subtitle1"
                      >
                        Submit
                      </Typography>
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>
          </>
        )}
      </Box>
    </Dialog>
  );
};
export default ReviewInputDialog;
