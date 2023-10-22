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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style.css";
const LogoSlider = () => {
  const isXsOrSm = useMediaQuery("(max-width:600px)");

  const images = require.context("../assest/companylogos/", true);
  const imageList = images.keys().map((image) => images(image));
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
  return (
    <>
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
    </>
  );
};
export default LogoSlider;
