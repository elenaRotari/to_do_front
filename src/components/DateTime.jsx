import React, { useState, useEffect } from "react";
import "./DateTime.scss";

export const DateTime = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="date">
      <h3> Time : {date.toLocaleTimeString()}</h3>
      <h3> Date : {date.toLocaleDateString("de-DE")}</h3>
    </div>
  );
};

export default DateTime;
