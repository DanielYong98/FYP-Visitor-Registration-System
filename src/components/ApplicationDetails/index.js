import React, { useState, useEffect, useCallback } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import { firebase } from "../Firebase/firebase";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import Forms from "../../Form";
import "./index.css";

function ApplicationDetails(props) {
  //Clicking either approve or reject
  function onClick(action) {
    console.log(action);
    alert("Application has been " + action);
    if (action === "approved") {
      setStatus("Approved");
      db.collection("applications")
        .doc(props.location.state.id)
        .update({ status: "Approved" });
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

  //https://visitor-registration-3f5c6.web.app/QR/
  //http://localhost:3000/QR/
  
  //Handles approve button
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
      Url:
        "https://visitor-registration-3f5c6.web.app/QR/" +
        props.location.state.id,
    });
  }

  //API for email js, sends all information to email send
  function sendFeedback(templateId, variables) {
    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      // Handle errors here
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }
  return (
    <div className="contain">
      <div className="details">
        <p>Application Details</p>
      </div>

      <div>
        <div className="grid">
          <p>Name:</p>
          <p>{name}</p>
          <p>Gender: </p>
          <p>{gender}</p>
          <p>Email: </p>
          <p>{email}</p>
          <p>IC: </p>
          <p>{IC}</p>
          <p>Contact Number: </p>
          <p>{contactNum}</p>
          <p>Date of Visit: </p>
          <p>{dateofVisit}</p>
          <p>Vehicle Type: </p>
          <p>{typeofVehicle}</p>
          <p>Vehicle Number: </p>
          <p>{vehicleNum}</p>
          <p>Purpose of Visit: </p>
          <p>{purposeofVisit}</p>
          <p>Status: </p>
          <p>{status}</p>
          <p>Application sent by: </p>
          <p>{creatorEmail}</p>
          <p>ID:</p>
          <p>{props.location.state.id}</p>
        </div>

        <div className="backbtn">
          <Button
            className="backbtn"
            variant="contained"
            color="primary"
            onClick={props.history.goBack}
          >
            BACK
          </Button>
        </div>

        <div>
          {(() => {
            switch (status) {
              case "Pending":
                return (
                  <div>
                    <div className="approvebtn">
                      <Button
                        className="approvebtn"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          onClick("approved");
                          handleSubmit();
                        }}
                      >
                        APPROVE
                      </Button>
                    </div>
                    <div className="rejectbtn">
                      <Button
                        className="rejectbtn"
                        variant="contained"
                        color="primary"
                        onClick={() => onClick("rejected")}
                      >
                        REJECT
                      </Button>
                    </div>
                  </div>
                );
              case "Approved":
                return (
                  <div className="rejectbtn">
                    <Button
                      className="rejectbtn"
                      variant="contained"
                      color="primary"
                      onClick={() => onClick("rejected")}
                    >
                      REJECT
                    </Button>
                  </div>
                );
              case "Rejected":
                return (
                  <div className="approvebtn">
                    <Button
                      className="approvebtn"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        onClick("approved");
                        handleSubmit();
                      }}
                    >
                      APPROVE
                    </Button>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </div>
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
