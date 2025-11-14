import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../lib/auth-helper.js";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();
  console.log("JWT from auth-helper:", jwt);
  console.log("User role:", jwt && jwt.user && jwt.user.role);
  const isLoggedIn = !!jwt;
  const isAdmin = jwt && jwt.user && jwt.user.role === "admin";



  const handleSignout = () => {
    auth.clearJWT(() => {
      navigate("/", { replace: true });
    });
  };

  const linkSx = {
    color: "inherit",
    "&.active": { bgcolor: "rgba(255,255,255,0.18)" },
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ background: "linear-gradient(90deg, #ff70c0 0%, #a879ff 100%)" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            My Portfolio
          </Typography>
        <Stack direction="row" spacing={2}>
          <Button component={NavLink} to="/" sx={linkSx}>Home</Button>
          <Button component={NavLink} to="/about" sx={linkSx}>About</Button>
          <Button component={NavLink} to="/contact" sx={linkSx}>Contact</Button>
          <Button component={NavLink} to="/services" sx={linkSx}>Services</Button>

          {isLoggedIn && (
            <>
              <Button component={NavLink} to="/project" sx={linkSx}>Project</Button>
              <Button component={NavLink} to="/education" sx={linkSx}>Education</Button>
            </>
          )}

          {/* Only show Users if ADMIN */}
          {isAdmin && (
            <Button component={NavLink} to="/users" sx={linkSx}>
              Users
            </Button>
          )}

          {isLoggedIn ? (
            <Button onClick={handleSignout} sx={linkSx}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button component={NavLink} to="/signin" sx={linkSx}>
                Sign In
              </Button>
              <Button component={NavLink} to="/signup" sx={linkSx}>
                Sign Up
              </Button>
            </>
          )}
        </Stack>
        </Toolbar>
      </AppBar>

      <main className="page">{children}</main>
    </>
  );
}
