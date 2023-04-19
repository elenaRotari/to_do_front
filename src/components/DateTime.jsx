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
      <h3>
        {" "}
        Time :{" "}
        {date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </h3>
      <h3>
        {" "}
        Date :{" "}
        {date.toLocaleDateString("de", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </h3>
    </div>
  );
};

export default DateTime;
