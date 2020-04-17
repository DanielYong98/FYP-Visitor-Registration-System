import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as ROUTES from "../../constants/routes";
import { withAuthorization } from "../Session";
import "./index.css";

const handleOnClick = () => console.log("handleOnLcik lol");
const Home = () => (
  <div className="container">
    <div className="head">
      <h4>Home</h4>
    </div>

    <div className="term">
      <h2>Terms and Conditions</h2>
      <p>
        This Vehicle Registration System is for registering guest visitors only.
      </p>
      <p>Please fill in the form and provide sufficient details</p>
      <br></br>
      <br></br>
      <Button
        className="newApplication"
        variant="contained"
        color="primary"
        component={Link}
        to={ROUTES.REGISTRATION}
        onClick={handleOnClick}
        mt={1}
      >
        New application
      </Button>
    </div>
  </div>
);

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Home);
