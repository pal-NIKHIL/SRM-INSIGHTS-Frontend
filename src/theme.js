import { createTheme, inputLabelClasses, paperClasses } from "@mui/material";
const CustomTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#161313",
      },
      secondary: {
        main: "#ECECEC",
      },
    },
    fontFamily: "'Poppins','Mona Sans', 'sans-serif'",
    fontSize: "14px",
    lineHeight: "22px",
    fontWeight: 500,
    color: "#0f0f10",
    action: {},
    background: {
      black: "#161313",
      green: "#C4D8CF",
      pink: "#EAC5C3",
      brown: "#E9DBBB",
      purple: "#E1C4F1",
      lightpink: "#fde4df",
      lightpurple: "#efe5ff",
      lightbrown: "#fff0ce",
      newpurple: "#9a6eeb",
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "100%",
            borderRadius: "5px",
            backgroundColor: "#FAF0E6",
            "& fieldset": { border: "none" },
            "& input": {
              fontSize: "16px",
            },
            "& label": {
              fontSize: "16px",
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "& input": {
              fontSize: "14px", // Font size of input text
            },
            "& label": {
              fontSize: "14px", // Font size of label text
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "16px",
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 0,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            textTransform: "none",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.3)", // New shadow on hover
              backgroundColor: "transparent",
            },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            textTransform: "none",

            // "&:hover": {
            //   backgroundColor: "transparent",
            // },
          },
        },
      },
      // MuiDivider: {
      //   styleOverrides: {
      //     root: {
      //       width: "100%",
      //       height: "2px",
      //       color: "black",
      //     },
      //   },
      // },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            boxShadow:
              " 0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)",
            transition: "box-shadow 800ms cubic-bezier(0.4, 0, 0.2, 1) 8ms",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow:
                " 0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)",
            },
          },
        },
      },

      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "10px",
            "&:last-child": {
              paddingBottom: "32px",
            },
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: {
            fontSize: "18px",
          },
          subheaderTypographyProps: {
            fontSize: "14px",
          },
        },
        styleOverrides: {
          root: {
            padding: "12px",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          "*": {
            boxSizing: "border-box",
          },
          html: {
            MozOsxFontSmoothing: "grayscale",
            WebkitFontSmoothing: "antialiased",
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            width: "100%",
          },
          body: {
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            minHeight: "100%",
            width: "100%",
          },
          "#__next": {
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          },
          "#nprogress": {
            pointerEvents: "none",
          },
          "#nprogress .bar": {
            height: 3,
            left: 0,
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 2000,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&::placeholder": {
              opacity: 1,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "24px",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          input: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: "24px",
            "&::placeholder": {},
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: 14,
            fontWeight: 500,
            [`&.${inputLabelClasses.filled}`]: {
              transform: "translate(12px, 18px) scale(1)",
            },
            [`&.${inputLabelClasses.shrink}`]: {
              [`&.${inputLabelClasses.standard}`]: {
                transform: "translate(0, -1.5px) scale(0.85)",
              },
              [`&.${inputLabelClasses.filled}`]: {
                transform: "translate(12px, 6px) scale(0.85)",
              },
              [`&.${inputLabelClasses.outlined}`]: {
                transform: "translate(14px, -9px) scale(0.85)",
              },
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
          },
        },
      },
      MuiMasonry: {
        styleOverrides: {
          root: {
            margin: "0px",
          },
        },
      },
    },
    typography: {
      fontFamily:
        '"Poppins","Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      body1: {
        lineHeight: "32px",
        fontSize: "18px",
        fontWeight: 400,
        color: "#0f0f10",
      },
      body2: {
        lineHeight: "32px",
        fontSize: "17px",
        fontWeight: 400,
        color: "#0f0f10",
      },
      h1: {
        fontSize: "64px",
        lineHeight: "77px",
        fontWeight: 600,
        color: "#0f0f10",
      },
      h2: {
        fontSize: "40px",
        lineHeight: "48px",
        fontWeight: 600,
        color: "black",
      },
      h3: {
        fontSize: "25px",
        lineHeight: "28px",
        fontWeight: 600,
        color: "#0f0f10",
      },
      h4: {
        fontSize: "20px",
        lineHeight: "28px",
        fontWeight: 500,
        color: "#0f0f10",
      },
      subtitle1: {
        fontSize: "16px",
        lineHeight: "22px",
        fontWeight: 500,
        color: "#0f0f10",
      },
      subtitle2: {
        fontSize: "14px",
        lineHeight: "20px",
        fontWeight: 400,
        color: "#5e6067",
      },
    },
  });
};

export default CustomTheme;
