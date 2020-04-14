import React, { useState, useEffect, useCallback } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import { firebase } from "../Firebase/firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button } from "@material-ui/core";
import "./adminDash.css";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function useList(lol) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("applications")
      .where("status", "==", lol)
      .onSnapshot((snapshot) => {
        const newApplications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(newApplications);
      });
  }, [lol]);
  return applications;
}

function AdminDash() {
  const [view, setView] = useState("Approved");
  const applications = useList(view);

  function onClick(x) {
    console.log("VIEWED " + x);
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>All applications listed here</p>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={view}
        onChange={(e) => {
          setView(e.target.value);
          console.log(view);
        }}
      >
        <MenuItem value={"Pending"}>Pending</MenuItem>
        <MenuItem value={"Approved"}>Approved</MenuItem>
        <MenuItem value={"Rejected"}>Rejected</MenuItem>
      </Select>
      <table>
        <thead>
          <tr>
            <th>Visitor Name</th>
            <th>Email</th>
            <th>Vehicle Number</th>
            <th>Date of Visit</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.name}</td>
              <td>{application.email}</td>
              <td>{application.vehicleNum}</td>
              <td>{application.dateofVisit}</td>
              <td>
                <Link
                  to={{
                    pathname: ROUTES.APPLICATION_DETAILS,
                    state: { id: application.id },
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onClick(application.id)}
                  >
                    VIEW
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(withAuthorization(condition), withFirebase)(AdminDash);
