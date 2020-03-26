import React, { useState, useEffect, useCallback } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import { firebase } from "../Firebase/firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button } from "@material-ui/core";

function useList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("applications")
      .onSnapshot(snapshot => {
        const newApplciations = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApplications(newApplciations);
      });
  }, []);
  return applications;
}

function AdminDash() {
  const applications = useList();

  function onClick(x) {
    console.log("VIEWED " + x);
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>

      <table className="applicationTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Visit</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.id}>
              <td>{application.name}</td>
              <td>{application.email}</td>
              <td>{application.dateofVisit}</td>
              <td>
                <Link
                  to={{
                    pathname: ROUTES.APPLICATION_DETAILS,
                    state: { id: application.id }
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

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(withAuthorization(condition), withFirebase)(AdminDash);
