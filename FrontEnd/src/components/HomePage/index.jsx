import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css"; 

function HomePage() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the App!
      </Typography>
      <Typography variant="h6" gutterBottom>
        This is your homepage. Login for more
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{ mr: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;
