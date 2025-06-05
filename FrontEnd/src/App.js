import './App.css';

import { React, useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import HomePage from './components/HomePage';
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from './components/Login';
import Register from './components/Register';

const App = (props) => {
  const [user, setUser] = useState(null);
  
  function logout(){
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  if (!user) {
    return (
      <>
        <Router>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route 
                  path='/'
                  element={<HomePage />}
                />
                <Route
                  path='/login'
                  element={<Login onLogin={setUser} />}
                />
                <Route 
                  path='/register' 
                  element={<Register />}
                />
              </Routes>
            </Paper>
          </Grid>
        </Router>
      </>
    );
  }

  return (
    <>
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar onLogOut={logout} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path='/login'
                  element={<Login onLogin={setUser} />}
                />
                <Route
                  path="/users/:userId"
                  element={<UserDetail />}
                />
                <Route
                  path="/photos/:userId"
                  element={<UserPhotos />}
                />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
    </>
  );
}

export default App;