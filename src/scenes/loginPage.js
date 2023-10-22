import {
  Box,
  IconButton,
  TextField,
  Typography,
  Button,
  Divider,
  Avatar,
  InputAdornment,
  Stack,
  Card,
  Grid,
  Alert,
  Dialog,
  SvgIcon,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import jwtdecode from "jwt-decode";
import { AiOutlineClose } from "react-icons/ai";
import iconsvg from "../assest/icons.svg";
import AvatarPicker from "../component/avatarpicker";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import donegif from "../assest/done.gif";
import loadinggif from "../assest/loading.gif";
const initialloginValues = {
  email: "",
  password: "",
};
const initialregisterValues = {
  firstname: "",
  lastname: "",
  email: "",
  regNo: "",
  password: "",
  confirmpassword: "",
};
const loginSchema = yup.object({
  email: yup
    .string()
    .matches(/^[A-Za-z]{2}\d{4}@srmist\.edu\.in$/, "Enter SRM mail Id")
    .required(),
  password: yup
    .string()
    .min(4, "password must be atleast 4 character")
    .required("Please Enter Password"),
});
const RegisterSchema = yup.object({
  firstname: yup.string().required("Enter Firstname"),
  lastname: yup.string().required("Enter Lastname"),
  email: yup
    .string()
    .matches(/^[A-Za-z]{2}\d{4}@srmist\.edu\.in$/, "Enter SRM mail Id")
    .required(),
  regNo: yup
    .string()
    .matches(/^[A-Za-z]{2}\d{13}/, "Enter Valid Registration No.")
    .required("Please Enter RegistrationNo."),
  password: yup
    .string()
    .min(4, "password must be atleast 4 character")
    .required("Please Enter Password"),
  confirmpassword: yup
    .string()
    .min(4, "password must be atleast 4 character")
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("Please Enter Password"),
});

const LoginPage = ({ setopenloginDialog, openloginDialog }) => {
  const [loading, setLoading] = useState(false);
  const [done, setdone] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const [islogin, setlogin] = useState(true);
  const [iserror, seterror] = useState(false);
  const [errorMesage, seterrorMessage] = useState("");
  const [avatarpicker, setavatarpicker] = useState(false);
  const [avatarImage, setavatarImage] = useState("");

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setLoading(true);
      axios
        .post("https://srm-insights-backend.vercel.app/auth/googlelogin", response)
        .then((response) => {
          setdone(true);
          setTimeout(() => {
            setLoading(false);
            localStorage.setItem("token", response.data.token);
            setopenloginDialog(!openloginDialog);
          }, 2000);
        })
        .catch((error) => {
          seterror(!iserror);
          seterrorMessage(error.response.data.message);
        });
    },
    onError: (error) => {
      console.log(error.response.data.message);
      seterror(!iserror);
      seterrorMessage(error.response.data.message);
    },
  });

  const handlelogin = async (data, event) => {
    setLoading(true);
    axios
      .post("https://srm-insights-backend.vercel.app/auth/login", data)
      .then((response) => {
        setdone(true);
        setTimeout(() => {
          setLoading(false);
          localStorage.setItem("token", response.data.token);
          setopenloginDialog(!openloginDialog);
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        seterror(!iserror);
        seterrorMessage(error.response.data.message);
        event.resetForm();
      });
  };

  const handleregister = async (data, event) => {
    const { confirmpassword, ...requestData } = data;
    requestData.avatar = avatarImage;

    axios
      .post("http://localhost:3001/auth/register", requestData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        seterror(!iserror);
        seterrorMessage(error.response.data.message);
      });
    setlogin(!islogin);
  };

  const handleFormsubmit = async (data, event) => {
    if (islogin) await handlelogin(data, event);
    else await handleregister(data, event);
  };

  const [showPassword, setshowPassword] = useState(false);
  const handleshowPassword = () => {
    setshowPassword(!showPassword);
  };

  return (
    <Dialog
      open
      onClose={() => setopenloginDialog(!openloginDialog)}
      fullWidth
      sx={{
        backgroundfilter: "blur(6px)",
      }}
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
        // p={4}
      >
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
          >
            {done ? (
              <img src={donegif} width={"100px"} />
            ) : (
              <img src={loadinggif} width={"100px"} />
            )}
          </Box>
        ) : (
          <Formik
            initialValues={islogin ? initialloginValues : initialregisterValues}
            onSubmit={handleFormsubmit}
            validationSchema={islogin ? loginSchema : RegisterSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <Grid container spacing={3} p={4}>
                    {islogin ? (
                      <>
                        <Grid item xs={12}>
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                          >
                            <Typography variant="h2">Welcome Back</Typography>
                            <IconButton
                              onClick={() =>
                                setopenloginDialog(!openloginDialog)
                              }
                              sx={{
                                // position: "absolute",
                                top: 2,
                                right: 2,
                              }}
                            >
                              <AiOutlineClose />
                            </IconButton>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">
                            Please enter login detail below
                          </Typography>
                        </Grid>
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
                        <Grid item xs={12}>
                          <TextField
                            label="Email"
                            variant="outlined"
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={
                              Boolean(touched.email) && Boolean(errors.email)
                            }
                          />
                          {touched.email && (
                            <Typography
                              variant="subtitle1"
                              sx={{
                                textAlign: "end",
                                color: "red",
                              }}
                            >
                              {errors.email}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={
                              Boolean(touched.password) &&
                              Boolean(errors.password)
                            }
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={handleshowPassword}>
                                    {showPassword ? (
                                      <HiOutlineEye />
                                    ) : (
                                      <HiOutlineEyeOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />

                          {touched.password && errors.password && (
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: "red",
                                textAlign: "end",
                              }}
                            >
                              password must be at least 4 characters
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography textAlign={"end"} variant="subtitle2">
                            Forget password?
                          </Typography>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <IconButton
                          // onClick={handleInterviewDialog}
                          sx={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                          }}
                        >
                          <AiOutlineClose />
                        </IconButton>

                        {avatarpicker ? (
                          <>
                            <Grid item xs={12}>
                              <Typography variant="h2">
                                Create your account
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1">
                                Fill the detail to create a account.
                              </Typography>
                            </Grid>
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
                                  <Typography variant="body2">
                                    {errorMesage}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}
                            <Grid item xs={12} md={6}>
                              <TextField
                                label="FirstName"
                                variant="outlined"
                                onChange={handleChange}
                                value={values.firstname}
                                name="firstname"
                                error={
                                  Boolean(touched.firstname) &&
                                  Boolean(errors.firstname)
                                }
                              />
                              {touched.firstname && (
                                <Typography
                                  sx={{
                                    textAlign: "end",
                                    color: "red",
                                  }}
                                >
                                  {errors.firstname}
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                label="LastName"
                                variant="outlined"
                                onChange={handleChange}
                                value={values.lastname}
                                name="lastname"
                                error={
                                  Boolean(touched.lastname) &&
                                  Boolean(errors.lastname)
                                }
                              />
                              {touched.lastname && (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    textAlign: "end",
                                    color: "red",
                                  }}
                                >
                                  {errors.lastname}
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                label="Email"
                                variant="outlined"
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={
                                  Boolean(touched.email) &&
                                  Boolean(errors.email)
                                }
                              />
                              {touched.email && (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    textAlign: "end",
                                    color: "red",
                                  }}
                                >
                                  {errors.email}
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                onChange={handleChange}
                                value={values.regNo}
                                name="regNo"
                                error={
                                  Boolean(touched.regNo) &&
                                  Boolean(errors.regNo)
                                }
                                label="Registration No."
                                variant="outlined"
                              />
                              {touched.regNo && (
                                <Typography
                                  sx={{
                                    color: "red",
                                    textAlign: "end",
                                  }}
                                >
                                  {errors.regNo}
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={
                                  Boolean(touched.password) &&
                                  Boolean(errors.password)
                                }
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton onClick={handleshowPassword}>
                                        {showPassword ? (
                                          <HiOutlineEye />
                                        ) : (
                                          <HiOutlineEyeOff />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              {touched.password && errors.password && (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "red",
                                    textAlign: "end",
                                  }}
                                >
                                  {errors.password}
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                onChange={handleChange}
                                value={values.confirmpassword}
                                name="confirmpassword"
                                error={
                                  Boolean(touched.confirmpassword) &&
                                  Boolean(errors.confirmpassword)
                                }
                                label="Confirm Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton onClick={handleshowPassword}>
                                        {showPassword ? (
                                          <HiOutlineEye />
                                        ) : (
                                          <HiOutlineEyeOff />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              {touched.confirmpassword &&
                                errors.confirmpassword && (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "red",
                                      textAlign: "end",
                                    }}
                                  >
                                    {errors.confirmpassword}
                                  </Typography>
                                )}
                            </Grid>
                          </>
                        ) : (
                          <Grid item xs={12} sx={{ mx: "auto" }}>
                            <AvatarPicker
                              setavatarpicker={setavatarpicker}
                              avatarpicker={avatarpicker}
                              setavatarImage={setavatarImage}
                              avatarImage={avatarImage}
                            />
                          </Grid>
                        )}
                      </>
                    )}
                    {islogin && (
                      <Grid item xs={12}>
                        <Stack direction={"column"} spacing={3}>
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
                              m={1}
                              color={theme.palette.secondary.main}
                              variant="body2"
                            >
                              {islogin ? "Sign In" : "Sign Up"}
                            </Typography>
                          </Button>
                          <Divider style={{ width: "100%" }}>
                            <Typography variant="subtitle2">
                              or continue with
                            </Typography>
                          </Divider>
                          <Button
                            variant="outlined"
                            sx={{
                              backgroundColor: "#ffffff",
                              "&:hover": {
                                backgroundColor: "#ffffff",
                              },
                              // border: ".5px solid black",
                            }}
                            onClick={() => handleGoogleLogin()}
                          >
                            <Stack
                              direction={"row"}
                              sx={{
                                alignItems: "center",
                                m: 1,
                              }}
                              spacing={1}
                            >
                              <FcGoogle />
                              <Typography variant="body2">
                                {islogin
                                  ? "Login in with Google"
                                  : "Sign Up with Google"}
                              </Typography>
                            </Stack>
                          </Button>
                          <Typography
                            variant="subtitle2"
                            textAlign={"center"}
                            body2
                            onClick={() => {
                              setlogin(!islogin);
                              seterror(false);
                              resetForm();
                            }}
                          >
                            {islogin
                              ? "Don't have a account? Sign Up"
                              : "Already have an account?Sign In"}
                          </Typography>
                        </Stack>
                      </Grid>
                    )}
                    {!islogin && avatarpicker && (
                      <Grid item xs={12}>
                        <Stack direction={"column"} spacing={3}>
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
                              m={1}
                              color={theme.palette.secondary.main}
                              variant="body2"
                            >
                              {islogin ? "Sign In" : "Sign Up"}
                            </Typography>
                          </Button>
                          <Divider style={{ width: "100%" }}>
                            <Typography variant="subtitle2">
                              or continue with
                            </Typography>
                          </Divider>
                          <Button
                            variant="outlined"
                            sx={{
                              backgroundColor: "#ffffff",
                              "&:hover": {
                                backgroundColor: "#ffffff",
                              },
                              // border: ".5px solid black",
                            }}
                            onClick={() => handleGoogleLogin()}
                          >
                            <Stack
                              direction={"row"}
                              sx={{
                                alignItems: "center",
                                m: 1,
                              }}
                              spacing={1}
                            >
                              <FcGoogle />
                              <Typography variant="body2">
                                {islogin
                                  ? "Login in with Google"
                                  : "Sign Up with Google"}
                              </Typography>
                            </Stack>
                          </Button>
                          <Typography
                            variant="subtitle2"
                            textAlign={"center"}
                            body2
                            onClick={() => {
                              setlogin(!islogin);
                              seterror(false);
                              resetForm();
                            }}
                          >
                            {islogin
                              ? "Don't have a account? Sign Up"
                              : "Already have an account?Sign In"}
                          </Typography>
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        )}
      </Box>
    </Dialog>
  );
};

export default LoginPage;
