import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Container,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import "./styles.css";

export default function LoginPage({onLogin}) {
  const navigate = useNavigate();

  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:8081/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_name: loginName,
        password: password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Success");
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin && onLogin({ loginName: data.login_name });
      navigate(`/users/${data.user.id}`);
    } else {
      setMessage(data.error || "Fail");
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper className="login-container" sx={{ p: 4, mt: 10 }}>
        <Typography className="login-title" variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit" 
            variant="contained"
            color="primary"
            fullWidth
            className="login-button"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account? <Link href="/register">Register</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
