import React, { useEffect, useState } from "react";
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
  InputLabel,
  FormControl,
  Select,
  useMediaQuery,
} from "@mui/material";
import { Field, Formik } from "formik";
import { useTheme } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import donegif from "../assest/done.gif";
import loadinggif from "../assest/loading.gif";
function InterviewInputDialog({ handleInterviewDialog }) {
  const [initialcreatereview, setinitialcreatereview] = useState({
    isAnonymous: false,
    company: "",
    role: "",
    offerstatus: false,
    location: "",
    jobtype: "",
    rounds: "",
    yearsofexperience: "",
    content: [],
  });
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [numSteps, setNumSteps] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [done, setdone] = useState(false);
  const steps = Array.from({ length: numSteps + 1 }, (_, index) => {
    if (index === 0) {
      return "Interview Information";
    } else {
      return `Round ${index}`;
    }
  });

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    setNumSteps(inputValue);
    setFormData(Array.from({ length: inputValue }, () => ""));
  };
  const handleFormChange = (event, stepIndex) => {
    console.log(formData);
    const newFormData = [...formData];
    newFormData[stepIndex] = event.target.value;
    setFormData(newFormData);
  };
  const handlefinalsubmit = (rounddetail) => {
    const updatedReview = {
      ...initialcreatereview,
      content: rounddetail,
    };
    setLoading(true);
    axios
      .post("http://localhost:3001/create-interview", updatedReview, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setdone(true);
        setTimeout(() => {
          setLoading(false);
          handleInterviewDialog();
        }, 2000);
      })
      .catch((error) => {
        seterror(!iserror);
        seterrorMessage(error.response.data.message);
      });
  };
  const handleformsubmit = async (values) => {
    const updatedReview = {
      ...values,
      rounds: numSteps,
    };
    setinitialcreatereview(updatedReview);
    if (numSteps === 0) {
      handlefinalsubmit([]);
    }
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [iserror, seterror] = useState(false);
  const [errorMesage, seterrorMessage] = useState("");

  return (
    <Dialog
      open
      onClose={handleInterviewDialog}
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
          color: "white",
        }}
        py={2}
        px={isLargeScreen ? 4 : 0}
        height={"100%"}
      >
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="341px"
          >
            {done ? (
              <img src={donegif} width={"100px"} />
            ) : (
              <img src={loadinggif} width={"100px"} />
            )}
          </Box>
        ) : (
          <>
            <Stack justifyContent={"space-between"} p={2}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <IconButton
                onClick={handleInterviewDialog}
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                }}
              >
                <AiOutlineClose />
              </IconButton>
              <Stack>
                {activeStep === 0 && (
                  <Formik
                    initialValues={initialcreatereview}
                    onSubmit={(values) => handleformsubmit(values)}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      resetForm,
                      setFieldValue,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Box>
                          <Grid container spacing={3} p={2}>
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
                                  <Typography variant="subtitle1">
                                    {errorMesage}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}
                            <Grid item xs={12} md={6}>
                              <TextField
                                label="Company"
                                variant="outlined"
                                onChange={handleChange}
                                value={values.company}
                                name="company"
                                error={
                                  Boolean(touched.company) &&
                                  Boolean(errors.company)
                                }
                              />
                              {errors.company && (
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    textAlign: "end",
                                    color: "red",
                                  }}
                                >
                                  please select a company
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                onChange={handleChange}
                                value={values.role}
                                name="role"
                                error={
                                  Boolean(touched.role) && Boolean(errors.role)
                                }
                                label="Role"
                                variant="outlined"
                              />

                              {touched.role && errors.role && (
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: "red",
                                    textAlign: "end",
                                  }}
                                >
                                  please select a role
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                error={
                                  Boolean(touched.location) &&
                                  Boolean(errors.location)
                                }
                                label="location"
                                variant="outlined"
                              />

                              {touched.location && errors.location && (
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: "red",
                                    textAlign: "end",
                                  }}
                                >
                                  please Enter a location
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                label="Number of Rounds"
                                variant="outlined"
                                type="number"
                                value={numSteps}
                                onChange={handleInputChange}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                onChange={handleChange}
                                value={values.yearsofexperience}
                                name="yearsofexperience"
                                error={
                                  Boolean(touched.yearsofexperience) &&
                                  Boolean(errors.yearsofexperience)
                                }
                                label="YOE"
                                variant="outlined"
                              />

                              {touched.yearsofexperience &&
                                errors.yearsofexperience && (
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      color: "red",
                                      textAlign: "end",
                                    }}
                                  >
                                    please enter years of experience
                                  </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <FormControl
                                fullWidth
                                sx={{
                                  backgroundColor: "#FAF0E6",
                                  border: "none",
                                  borderRadius: "5px",

                                  "& fieldset": { border: "none" },
                                }}
                              >
                                <InputLabel>JobType</InputLabel>
                                <Select
                                  value={values.jobtype}
                                  label="JobType"
                                  onChange={handleChange}
                                  name="jobtype"
                                  style={{
                                    fontSize: "16px",
                                  }}
                                >
                                  <MenuItem value="fulltime">
                                    Full Time
                                  </MenuItem>
                                  <MenuItem value="hybrid">Hybrid</MenuItem>
                                  <MenuItem value="remote">Remote</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Field name="offerstatus">
                                {({ field }) => (
                                  <RadioGroup
                                    {...field}
                                    row
                                    aria-labelledby="offerstatus"
                                    value={field.value}
                                    onChange={field.onChange}
                                  >
                                    <FormControlLabel
                                      value="selected"
                                      control={<Radio />}
                                      label={
                                        <Typography variant="subtitle1">
                                          Selected
                                        </Typography>
                                      }
                                    />
                                    <FormControlLabel
                                      value="rejected"
                                      control={<Radio />}
                                      label={
                                        <Typography variant="subtitle1">
                                          Rejected
                                        </Typography>
                                      }
                                    />
                                  </RadioGroup>
                                )}
                              </Field>
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                // onClick={() => handleformsubmit(values)}
                                variant="outlined"
                                fullWidth
                                sx={{
                                  backgroundColor: "#161313",
                                  alignItems: "center",
                                  "&:hover": {
                                    boxShadow:
                                      "0px 5px 10px 0px rgba(0,0,0,0.2)",
                                    backgroundColor: "#161313",
                                  },
                                }}
                              >
                                <Typography
                                  m={0.5}
                                  color={theme.palette.secondary.main}
                                  variant="subtitle1"
                                >
                                  {numSteps === 0 ? "Submit" : "Next"}
                                </Typography>
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </form>
                    )}
                  </Formik>
                )}
                {activeStep > 0 && (
                  <TextField
                    multiline
                    minRows={4}
                    label="Share your Interview Experience"
                    variant="outlined"
                    fullWidth
                    value={formData[activeStep - 1]}
                    onChange={(e) => handleFormChange(e, activeStep - 1)}
                    style={{ marginTop: 10 }}
                  />
                )}

                {activeStep > 0 && activeStep < numSteps && (
                  <Stack direction={"row"} mt={2} spacing={2}>
                    <Button
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
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
                        color={theme.palette.secondary.main}
                        variant="subtitle1"
                        m={0.5}
                      >
                        Back
                      </Typography>
                    </Button>
                    <Button
                      onClick={handleNext}
                      variant="outlined"
                      fullWidth
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
                        variant="subtitle1"
                      >
                        Next
                      </Typography>
                    </Button>
                  </Stack>
                )}

                {activeStep === numSteps && numSteps > 0 && (
                  <Stack direction={"row"} mt={2} spacing={2}>
                    <Button
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
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
                        variant="subtitle1"
                      >
                        Back
                      </Typography>
                    </Button>
                    <Button
                      onClick={() => handlefinalsubmit(formData)}
                      variant="outlined"
                      fullWidth
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
                        color={theme.palette.secondary.main}
                        variant="subtitle1"
                        m={0.5}
                      >
                        Submit
                      </Typography>
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </>
        )}
      </Box>
    </Dialog>
  );
}

export default InterviewInputDialog;
