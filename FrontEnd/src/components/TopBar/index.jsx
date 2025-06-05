import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function TopBar({ onLogOut }) {
  const saveUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (onLogOut) onLogOut();          
    navigate("/");                
  };

  return (
    <AppBar position="absolute" className="topbar-appBar" elevation={2}>
      <Toolbar className="topbar-toolbar">
        <Typography variant="h6" className="topbar-title">
          Hello {saveUser?.login_name || "Guest"}
        </Typography>
        <Typography variant="h6" className="topbar-context">
          <span onClick={handleLogout} className="logout">Logout</span>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;


