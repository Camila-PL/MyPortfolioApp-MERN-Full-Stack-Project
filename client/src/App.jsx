import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MainRouter from "./MainRouter.jsx";
import Layout from "./components/Layout.jsx";
import theme from "./theme.jsx";

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <MainRouter />
        </Layout>
      </ThemeProvider>
    </Router>
  );
}
