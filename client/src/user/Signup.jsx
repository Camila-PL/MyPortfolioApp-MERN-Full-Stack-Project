import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";         
import { create } from "./api-user.js";

export default function Signup() {
  const navigate = useNavigate();                     
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    open: false,
  });

  const handleChange = (field) => (e) =>
    setValues({ ...values, [field]: e.target.value });

  const clickSubmit = async () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    const data = await create(user);

    if (data?.error) {
      setValues({ ...values, error: data.error });
    } else {
      setValues({
        name: "",
        email: "",
        password: "",
        error: "",
        open: true,
      });
      setTimeout(() => navigate("/signin"), 600);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sign Up
        </Typography>
        <TextField
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
          fullWidth
        />
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
        {values.open && (
          <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
            Account created. Redirecting to sign in…
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
