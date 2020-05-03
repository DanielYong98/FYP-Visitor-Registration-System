import React, { useState } from "react";
import QRCode from "qrcode.react";
import { firebase } from "../Firebase/firebase";
import { Redirect } from "react-router-dom";
import "./QR.css";

const downloadQR = () => {
  const canvas = document.getElementById("123456");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "123456.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

function QR({
  match: {
    params: { id },
  },
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFake, setIsFake] = useState(true);
  const [name, setName] = useState("");
  const [dateOfVisit, setDateOfVisit] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");

  firebase
    .firestore()
    .collection("applications")
    .doc(id)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data exist");
        setName(doc.data().name);
        setDateOfVisit(doc.data().dateofVisit);
        setVehicleNum(doc.data().vehicleNum);
        setIsFake(false);
        setIsLoading(false);
      } else {
        console.log("No such document!");
        setIsLoading(false);
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
  return isLoading ? (
    <div className="container">
      <div className="head">
        <h4>QR code</h4>
      </div>
      <div className="term">
        <h2>Loading</h2>
      </div>
    </div>
  ) : isFake ? (
    <Redirect to={{ pathname: "/404" }} />
  ) : (
    <div className="container">
      <div className="head">
        <h4>QR code</h4>
      </div>
      <div className="qrcode">
        <QRCode
          id="123456"
          value={
            "Visitor ID: " +
            id +
            "\nName: " +
            name +
            "\nDate of Visit: " +
            dateOfVisit +
            "\nVehicle Number: " +
            vehicleNum
          }
          size={290}
          level={"H"}
          includeMargin={true}
          imageSettings={{
            src: "../../UoN.jpg",
            x: null,
            y: null,
            height: 50,
            width: 50,
            excavate: true,
          }}
        />
      </div>
      <div className="qrcode">
        <a onClick={downloadQR}> Download QR </a>
        <p className="qrcode">Application ID: {id}</p>
      </div>
    </div>
  );
}

export default QR;
