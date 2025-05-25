import React from "react";
import {Typography} from "@mui/material";

import "./styles.css";
import {useParams, Link} from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const user = useParams();
    const users = models.userListModel();
    const thisUser = users.find(u => u._id === user.userId);
    return (
        <>
          <Typography variant="body1">
            <p><b>Full name:</b> {thisUser.first_name} {thisUser.last_name}</p>
            <p><b>Location:</b> {thisUser.location}</p>
            <p><b>Description:</b> {thisUser.description}</p>
            <p><b>Occupation:</b> {thisUser.occupation}</p>
            <Link to={`/Photos/${user.userId}`} className="btn">Photo</Link>
          </Typography>
        </>
    );
}

export default UserDetail;
