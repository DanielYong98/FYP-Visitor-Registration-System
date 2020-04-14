import React, { useState } from "react";
import { withAuthorization } from "../Session";
import { firebase } from "../Firebase/firebase";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { borders } from "@material-ui/system";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./index.css";

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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  child: {
    width: "10ch",
  },
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
  const [dateofVisit, setDateofVisit] = useState(new Date());
  const [typeofVehicle, setTypeofVehicle] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");
  const [purposeofVisit, setPurposeofVisit] = useState("");
  const [status, setStatus] = useState("Pending");
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
      status,
      creatorEmail
    );

    firebase.firestore().collection("applications").add({
      name,
      gender,
      IC,
      contactNum,
      email,
      dateofVisit,
      typeofVehicle,
      vehicleNum,
      purposeofVisit,
      status,
      creatorEmail,
    });
  }

  function handleGender(e) {
    setGender(e.target.value);
  }

  //className={classes.general}
  //className={classes.root}
  return (
    <div className="container">
      <h1>New Application</h1>
      <p>Fill in all details</p>
      <form onSubmit={onSubmit}>
        <TextField
          className="lol"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          onChange={(e) => setName(e.currentTarget.value)}
          size="small"
        />

        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={gender}
          onChange={handleGender}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="IC No"
          name="ic number"
          autoFocus
          onChange={(e) => setIC(e.currentTarget.value)}
          size="small"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Contact No"
          autoFocus
          onChange={(e) => setContactNum(e.currentTarget.value)}
          size="small"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          autoFocus
          onChange={(e) => setEmail(e.currentTarget.value)}
          size="small"
        />

        <label>Date of visit: </label>

        <input
          type="date"
          id="DoV"
          name="DoV"
          min={minDate}
          value={dateofVisit}
          onChange={(e) => setDateofVisit(e.currentTarget.value)}
        ></input>
        <br></br>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Type of Vehicle"
          autoFocus
          onChange={(e) => setTypeofVehicle(e.currentTarget.value)}
          size="small"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Vehicle Plate Number"
          autoFocus
          onChange={(e) => setVehicleNum(e.currentTarget.value)}
          size="small"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Purpose of Visit"
          autoFocus
          multiline
          rows={4}
          onChange={(e) => setPurposeofVisit(e.currentTarget.value)}
          size="small"
        />

        <Link
          to={{ pathname: ROUTES.CONFIIRMATION_PAGE, state: { email: email } }}
        >
          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={onSubmit}
            //disabled={isInvalid}
          >
            Submit application
          </Button>
        </Link>
      </form>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Registration);
