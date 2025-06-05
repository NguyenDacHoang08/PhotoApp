import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  Collapse,
  Typography
} from "@mui/material";
import "./styles.css";
import TopBar from "../TopBar";

function formatDateTime(datetime) {
  return new Date(datetime).toLocaleString();
}

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);
  const [user, setUser] = useState(null);
  const [expandedComments, setExpandedComments] = useState({}); // lưu trạng thái mở của từng photo

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8081/api/photo/photoOfUser/${userId}`);
        if (!response.ok) throw new Error("Can't get data");

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [userId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8081/api/user/${userId}`);
        if (!response.ok) throw new Error("Can't get data");

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [userId]);

  const toggleComments = (photoId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [photoId]: !prev[photoId],
    }));
  };

  if (!photos) return <div className="loading">Loading...</div>;

  return (
    <>
      <List className="photo-list">
        {photos.map((photo) => (
          <div key={photo._id}>
            <ListItem className="photo-item">
              <div className="photo-card">
                <img className="photo-img" src={`/images/${photo.file_name}`} alt="User post" />
                <p className="photo-time"><b>Time:</b> <i>{formatDateTime(photo.date_time)}</i></p>

                {photo.comments && (
                  <Typography
                    className="comment-toggle"
                    onClick={() => toggleComments(photo._id)}
                    style={{ cursor: 'pointer' }}
                  ><i>
                    Comments ({photo.comments.length})</i>
                  </Typography>
                )}

                <Collapse in={expandedComments[photo._id]} timeout="auto" unmountOnExit>
                  <List className="comment-list">
                    {photo.comments.map((cm) => (
                      <ListItem key={cm._id} className="comment-item">
                        <div className="comment-body">
                          <span className="comment-user">
                            <b>{cm.user.first_name} {cm.user.last_name}:</b>
                            <i><small> {formatDateTime(cm.date_time)}</small></i>
                          </span>
                          <span className="comment-text">{cm.comment}</span>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
}

export default UserPhotos;
