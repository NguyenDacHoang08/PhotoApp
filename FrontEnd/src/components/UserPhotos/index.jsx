import { React, useState, useEffect } from "react";

import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
import {
  Divider,
  List,
  ListItem,
} from "@mui/material";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function formatDateTime(datetime) {
  return new Date(datetime).toLocaleString();
}
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchedPhotos = models.photoOfUserModel(userId);
    setPhotos(fetchedPhotos || []);
    const fetchedUser = models.userModel(userId);
    setUser(fetchedUser);
  }, [userId]);

  console.log(photos);
  if (!photos || !user) return <div>Loading...</div>;

  return (
    <>
      <h3>{user.first_name} {user.last_name}'s Photos</h3>
      <List component="div">
        {photos.map((photo) => (
          <>
            <ListItem className>
              <div className="post">
                <div className="photo">
                  <img src={`/images/${photo.file_name}`} alt="photos" />
                </div>
                <div>
                  <p className="photoTime"><b>Time: </b><i>{formatDateTime(photo.date_time)}</i></p>
                </div>
                <List component="div" className="comment">
                  {photo.comments && <b className="cmt-title">Comments: </b>}
                  {(photo.comments || []).map((cm) => (
                    <ListItem key={cm._id}>
                      <div className="cmt-body">
                        <span><b>{cm.user.first_name} {cm.user.last_name}: </b><i><small>{formatDateTime(cm.date_time)}</small></i></span>
                        <span>{cm.comment}</span>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </div>

            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
}

export default UserPhotos;
