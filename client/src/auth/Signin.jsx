import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { signin } from "../lib/api-auth.js";   
import auth from "../lib/auth-helper.js";      
export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (field) => (e) =>
    setValues({ ...values, [field]: e.target.value });

  const clickSubmit = async () => {
    const data = await signin({
      email: values.email || undefined,
      password: values.password || undefined,
    });

    if (data?.error) {
      setValues({ ...values, error: data.error, success: false });
    } else {
      auth.authenticate(data, () => {
        setValues({ ...values, error: "", success: true });
        const from = location.state?.from?.pathname || "/";
        setTimeout(() => navigate(from, { replace: true }), 800);
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sign In
        </Typography>

        <TextField
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          type="email"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          value={values.password}
          onChange={handleChange("password")}
          type="password"
          margin="normal"
          fullWidth
        />

        {values.error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {values.error}
          </Typography>
        )}
        {values.success && (
          <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
            Signed in successfully! Redirecting…
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button variant="contained" onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
