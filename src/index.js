import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider, responsiveFontSizes } from "@mui/material";
import CustomTheme from "./theme";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StoreProvider } from "./store/usercontext";
import "./style.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

let theme = CustomTheme();
// theme = responsiveFontSizes(theme);
root.render(
  <GoogleOAuthProvider clientId="968630748351-0v3o0212qs9gpv459ris1hsossmti0ur.apps.googleusercontent.com">
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </BrowserRouter>
    </ThemeProvider>
  </GoogleOAuthProvider>
);
