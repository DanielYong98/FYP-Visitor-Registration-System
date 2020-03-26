import React, { useState, useEffect, useCallback } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import { firebase } from "../Firebase/firebase";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";

function useList() {
  const [applications, setApplications] = useState([]);

  const doc = firebase
    .firestore()
    .collection("books")
    .where(
      firebase.firestore.FieldPath.documentId(),
      "==",
      "wd86sPRIwNShweE0o2rE"
    )
    .get();
  console.log("this is doc " + doc);

  //   useEffect(() => {
  //     firebase
  //       .firestore()
  //       .collection("applications")
  //       .onSnapshot(snapshot => {
  //         const newApplications = snapshot.docs.map(doc => ({
  //           id: doc.id,
  //           ...doc.data()
  //         }));
  //         setApplications(newApplications);
  //       });
  //   }, []);
  return doc;
}

function ApplicationDetails(props) {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db
        .collection("applications")
        .doc("wd86sPRIwNShweE0o2rE")
        .get();
      //const applications = data.map(doc=>doc.data())
      console.log(data);
    };
  });
  //const applications = useList();

  function onClick(action) {
    console.log(action);
    alert("Application has been " + action);
    props.history.goBack();
  }

  //Get document with ID
  const db = firebase.firestore();
  var docRef = db.collection("applications").doc("wd86sPRIwNShweE0o2rE");

  let applicationObject = {
    name: "",
    gender: "",
    IC: "",
    contactNum: "",
    creatorEmail: "",
    approval: "",
    dateofVisit: "",
    email: "",
    purposeofVIsit: "",
    typeofVehicle: "",
    vehicleNum: ""
  };
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        applicationObject = {
          name: doc.data().name,
          gender: doc.data().gender,
          IC: doc.data().IC,
          contactNum: doc.data().contactNum,
          creatorEmail: doc.data().creatorEmail,
          approval: doc.data().approval,
          dateofVisit: doc.data().dateofVisit,
          email: doc.data().email,
          purposeofVIsit: doc.data().purposeofVIsit,
          typeofVehicle: doc.data().typeofVehicle,
          vehicleNum: doc.data().vehicleNum
        };
        console.log("name is" + applicationObject.name);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });

  return (
    <div>
      <h1>Application Details</h1>

      <div>Visitor ID is {props.location.state.id}</div>
      <p1>Name: {applicationObject.name}</p1>
      <Button
        variant="contained"
        color="primary"
        onClick={props.history.goBack}
      >
        BACK
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onClick("approved")}
      >
        APPROVE
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onClick("rejected")}
      >
        REJECT
      </Button>
    </div>
  );
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase,
  withRouter
)(ApplicationDetails);
