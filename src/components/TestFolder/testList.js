import React from "react";

const TimesList = () => {
  return (
    <div>
      <h2>Times List</h2>
      <div>
        <label>Sort By: </label>
        {""}
        <select>
          <option>Time (fastest first)</option>
          <option>Time (slowest first)</option>
          <option disabled>---</option>
          <option>Title (a-z)</option>
          <option>Title (z-a)</option>
        </select>
      </div>
      <ol>
        <li>
          <div className="time-entry">
            My Amazing Entry Title
            <code className="time">18 seconds</code>
          </div>
          <div className="time-entry">
            My Amazing Entry Title
            <code className="time">18 seconds</code>
          </div>
          <div className="time-entry">
            My Amazing Entry Title
            <code className="time">18 seconds</code>
          </div>
          <div className="time-entry">
            My Amazing Entry Title
            <code className="time">18 seconds</code>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default TimesList;
