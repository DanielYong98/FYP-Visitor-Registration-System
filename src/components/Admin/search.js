import React, { useState, useEffect, useCallback } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import { firebase } from "../Firebase/firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button, TextField } from "@material-ui/core";

function useList(props) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("applications")
      .where("vehicleNum", "==", props)
      .onSnapshot((snapshot) => {
        const newApplications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(newApplications);
      });
  }, [props]);
  return applications;
}

function Search() {
  const [criteria, setCriteria] = useState("none");
  const applications = useList(criteria);

  return (
    <div className="dashboard">
      <div className="dash">
        <p>Search Vehicle Number</p>
      </div>
      <div style={{ margin: "5px 20px" }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          label="Vehicle Number"
          onChange={(e) => setCriteria(e.currentTarget.value)}
          size="small"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Visitor Name</th>
            <th>Email</th>
            <th>Vehicle Number</th>
            <th>Date of Visit</th>
            <th className="option">Options</th>
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
                  <Button variant="contained" color="primary">
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
export default compose(withAuthorization(condition), withFirebase)(Search);
