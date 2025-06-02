import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8081/api/user/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();
        setUser(res);
      } catch (err) {
        console.error("Lỗi khi fetch user:", err);
        setError("Không thể tải dữ liệu người dùng.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error || "Không tìm thấy người dùng."}
      </Typography>
    );
  }

 return (
  <div className="user-detail-container">
    <Typography variant="h6" gutterBottom>
      User Infomation
    </Typography>

    <div className="user-detail-info">
      <Typography variant="body1"><b>Full name:</b> {user.first_name} {user.last_name}</Typography>
      <Typography variant="body1"><b>Location:</b> {user.location}</Typography>
      <Typography variant="body1"><b>Description:</b> {user.description}</Typography>
      <Typography variant="body1"><b>Occupation:</b> {user.occupation}</Typography>
    </div>

    <Link to={`/photos/${user._id}`} className="btn">
      Photos
    </Link>
  </div>
);

}

export default UserDetail;
