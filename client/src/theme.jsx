import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#ff9fdf",
      main:  "#ff70c0",   
      dark:  "#d74e9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#c6a6ff",
      main:  "#a879ff",   
      dark:  "#7a54cc",
      contrastText: "#fff",
    },
    background: {
      default: "#fff6fb", 
      paper:   "#ffffff",
    },
  },
  custom: {
    openTitle: "#a879ff",
    protectedTitle: "#ff70c0",
  },
});
export default theme;
