import React, { useState, useEffect, useCallback } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import { firebase } from "../Firebase/firebase";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import Forms from "../../Form";

function ApplicationDetails(props) {
  //Clicking either approve or reject
  function onClick(action) {
    console.log(action);
    alert("Application has been " + action);
    if (action === "approved") {
      setStatus("Approved");
      db.collection("applications")
        .doc(props.location.state.id)
        .update({ status: "approved" });
    } else if (action === "rejected") {
      db.collection("applications")
        .doc(props.location.state.id)
        .update({ status: "Rejected" });
    }
    props.history.goBack();
  }

  //Get document with ID
  const db = firebase.firestore();
  var docRef = db.collection("applications").doc(props.location.state.id);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [IC, setIC] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [creatorEmail, setCreatorEmail] = useState("");
  const [status, setStatus] = useState("");
  const [dateofVisit, setDateofVisit] = useState("");
  const [email, setEmail] = useState("");
  const [purposeofVisit, setPurposeofVisit] = useState("");
  const [typeofVehicle, setTypeofVehicle] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");

  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setName(doc.data().name);
        setGender(doc.data().gender);
        setIC(doc.data().IC);
        setContactNum(doc.data().contactNum);
        setCreatorEmail(doc.data().creatorEmail);
        setStatus(doc.data().status);
        setDateofVisit(doc.data().dateofVisit);
        setEmail(doc.data().email);
        setPurposeofVisit(doc.data().purposeofVisit);
        setTypeofVehicle(doc.data().typeofVehicle);
        setVehicleNum(doc.data().vehicleNum);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });

  function handleSubmit() {
    const templateId = "template_RpSfUE8D";
    console.log("on click submit");

    sendFeedback(templateId, {
      email_to: email,
      ID: props.location.state.id,
      name: name,
      gender: gender,
      gender: gender,
      IC: IC,
      contactNum: contactNum,
      dateofVisit: dateofVisit,
      typeofVehicle: typeofVehicle,
      vehicleNum: vehicleNum,
      purposeofVisit: purposeofVisit,
    });
  }

  function sendFeedback(templateId, variables) {
    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }
  return (
    <div>
      <h1>Application Details</h1>

      <div>
        <div>
          <div>Document ID is {props.location.state.id}</div>
          <p>Name: {name}</p>
          <p>Gender: {gender}</p>
          <p>Email: {email}</p>
          <p>IC: {IC}</p>
          <p>Contact Number: {contactNum}</p>
          <p>Date of Visit: {dateofVisit}</p>
          <p>Vehicle Type: {typeofVehicle}</p>
          <p>Vehicle Number: {vehicleNum}</p>

          <p>Purpose of Visit: {purposeofVisit}</p>
          <p>Status: {status}</p>
          <p>Application sent by: {creatorEmail}</p>
        </div>

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
          onClick={() => {
            onClick("approved");
            handleSubmit();
          }}
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
    </div>
  );
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase,
  withRouter
)(ApplicationDetails);
