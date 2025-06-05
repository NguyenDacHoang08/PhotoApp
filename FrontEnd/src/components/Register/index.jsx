import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import './styles.css';

function Register() {
    const [loginName, setLoginName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            loginName,
            password,
            firstName,
            lastName
        };

        const res = await fetch(`http://localhost:8081/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (!res.ok) {
            setMessage("Fail!");
            console.log(data.error);
        }
        else {
            setMessage("Success!");
            navigate("/login");
        }

    };

    return (
        <Container maxWidth="sm">
            <Box className="register-box" component="form" onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom>Register</Typography>

                <TextField
                    label="Login Name"
                    fullWidth
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    margin="normal"
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />

                <TextField
                    label="First Name"
                    fullWidth
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    margin="normal"
                />

                <TextField
                    label="Last Name"
                    fullWidth
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    margin="normal"
                />
                <Typography
                    align="center"
                    sx={{ mt: 2, color: message === "Success!" ? "green" : "red" }}
                >
                    {message}
                </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="submit-btn"
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
}

export default Register;
