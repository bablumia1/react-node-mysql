import { ThemeOptions, createTheme } from "@mui/material";

export const customTheme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "rgb(249, 250, 251)",
      main: "rgb(67 56 202)",
      dark: "rgb(3, 7, 18)",
    },
    background: {
      default: "rgb(3, 7, 18)",
      paper: "rgb(15 23 42)",
    },
  },
  typography: {
    fontFamily: ["Karla", "sans-serif"].join(","),
  },
});
