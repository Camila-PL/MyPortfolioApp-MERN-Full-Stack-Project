import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { read } from "./api-user.js";
import auth from "../lib/auth-helper.js";

export default function Profile() {
  const { userId } = useParams();      
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const jwt = auth.isAuthenticated();
    if (!jwt) {
      navigate("/signin", { replace: true });
      return;
    }

    read({ userId }, { t: jwt.token }, signal)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          setUser(data);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Profile load failed:", err);
          setError("Failed to load user profile");
        }
      });

    return () => controller.abort();
  }, [userId, navigate]);

  if (error) {
    return (
      <Paper sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Paper>
    );
  }

  if (!user) {
    return (
      <Paper sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
        <Typography>Loading profile...</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}
      >
        {user.name}
      </Typography>

      <Typography sx={{ mb: 1 }}>
        <strong>Email:</strong> {user.email}
      </Typography>

      {user.role && (
        <Typography sx={{ mb: 1 }}>
          <strong>Role:</strong> {user.role}
        </Typography>
      )}

      <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate(-1)}>
        Back to users
      </Button>
    </Paper>
  );
}
