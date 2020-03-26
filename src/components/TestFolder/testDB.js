import React from "react";
import { firebase } from "../Firebase/firebase";

firebase
  .firestore()
  .collection("times")
  .add({
    title: "Rubik sdadsaadscube",
    seconds: 45
  });

function TestDB() {
  return (
    <div>
      <h1>testDB</h1>
    </div>
  );
}

export default TestDB;
