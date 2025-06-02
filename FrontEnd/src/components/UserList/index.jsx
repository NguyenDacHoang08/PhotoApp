import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8081/api/user/list");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách người dùng:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <List component="nav">
        {loading ? (
          <Typography variant="body2" sx={{ m: 2 }}>
            Đang tải...
          </Typography>
        ) : users.length === 0 ? (
          <Typography variant="body2" sx={{ m: 2 }}>
            Không có người dùng nào.
          </Typography>
        ) : (
          users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem
                button
                component={Link}
                to={`/users/${item._id}`}
                className="item"
              >
                <ListItemText
                  primary={`${item.first_name} ${item.last_name}`}
                  className="user"
                />
              </ListItem>

              <Divider />
            </React.Fragment>
          ))
        )}
      </List>
    </div>
  );
}

export default UserList;
