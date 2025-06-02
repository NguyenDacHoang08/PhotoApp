import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "./styles.css";

/**
 * TopBar component.
 * @param {Object} props - Component props
 * @param {string} props.context - Context string to display on the right
 */
function TopBar({ context }) {
  return (
    <AppBar position="absolute" className="topbar-appBar" elevation={2}>
      <Toolbar className="topbar-toolbar">
        <Typography variant="h6" className="topbar-title">
          Nguyen Dac Hoang
        </Typography>
        <Typography variant="subtitle1" className="topbar-context">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

