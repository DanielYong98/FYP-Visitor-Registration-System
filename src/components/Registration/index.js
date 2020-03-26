import React, { useState } from "react";
import { withAuthorization } from "../Session";
import { firebase } from "../Firebase/firebase";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Home from "../Home";
import * as ROUTES from "../../constants/routes";

function getCurrentDate() {
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  return date;
}

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  child: {
    width: "10ch"
  }
}));

function Registration() {
  const classes = useStyles();
  const minDate = getCurrentDate();
  const user = firebase.auth().currentUser;

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [IC, setIC] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [email, setEmail] = useState("");
  const [dateofVisit, setDateofVisit] = useState("");
  const [typeofVehicle, setTypeofVehicle] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");
  const [purposeofVisit, setPurposeofVisit] = useState("");
  const [approval, setApproval] = useState(false);
  const [creatorEmail, setCreatorEmail] = useState(user.email);

  const isInvalid =
    name === "" ||
    gender === "" ||
    IC === "" ||
    contactNum === "" ||
    email === "" ||
    dateofVisit === "" ||
    typeofVehicle === "" ||
    vehicleNum === "" ||
    purposeofVisit === "";

  function onSubmit(e) {
    //e.preventDefault();

    console.log(
      name,
      gender,
      IC,
      contactNum,
      email,
      dateofVisit,
      typeofVehicle,
      vehicleNum,
      purposeofVisit,
      approval,
      creatorEmail
    );

    firebase
      .firestore()
      .collection("applications")
      .add({
        name,
        gender,
        IC,
        contactNum,
        email,
        dateofVisit,
        typeofVehicle,
        vehicleNum,
        purposeofVisit,
        approval,
        creatorEmail
      });
  }

  function handleGender(e) {
    setGender(e.target.value);
  }

  return (
    <div className={classes.general}>
      <h1>New Application</h1>
      <form className={classes.root} onSubmit={onSubmit}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        ></input>
        <br />
        <label className={classes.child}>Male</label>
        <input
          className={classes.child}
          type="radio"
          name="gender"
          value="male"
          onChange={handleGender}
        ></input>
        <label className={classes.child}>Female</label>
        <input
          className={classes.child}
          type="radio"
          name="gender"
          value="female"
          onChange={handleGender}
        ></input>

        <br />
        <label>IC No:</label>
        <br />
        <input
          type="text"
          value={IC}
          onChange={e => setIC(e.currentTarget.value)}
        ></input>
        <br />
        <label>Contact No:</label>
        <br />
        <input
          type="number"
          value={contactNum}
          onChange={e => setContactNum(e.currentTarget.value)}
        ></input>
        <br />
        <label>Email:</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        ></input>
        <br />
        <label>Date of visit:</label>
        <br />
        <input
          type="date"
          id="DoV"
          name="DoV"
          min={minDate}
          value={dateofVisit}
          onChange={e => setDateofVisit(e.currentTarget.value)}
        ></input>
        <br />
        <label>Type of Vehicle:</label>
        <br />

        <input
          type="text"
          value={typeofVehicle}
          onChange={e => setTypeofVehicle(e.currentTarget.value)}
        ></input>
        <br />
        <label>Vehicle Plate Number:</label>
        <br />
        <input
          type="text"
          value={vehicleNum}
          onChange={e => setVehicleNum(e.currentTarget.value)}
        ></input>
        <br />
        <label>Purpose of Visit:</label>
        <br />
        <input
          type="text"
          value={purposeofVisit}
          onChange={e => setPurposeofVisit(e.currentTarget.value)}
        ></input>
        <br />

        <Link
          to={{ pathname: ROUTES.CONFIIRMATION_PAGE, state: { email: email } }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            //disabled={isInvalid}
          >
            Submit applicationn
          </Button>
        </Link>
      </form>
    </div>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Registration);
