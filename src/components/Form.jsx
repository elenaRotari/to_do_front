import Input from "./Input.jsx";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Form.scss";
import Error from "./Error.jsx";

export default function Form({ data }) {
  const navigate = useNavigate();
  const INITIAL = Object.keys(data.fields).reduce((acc, el) => {
    acc[el] = "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(INITIAL);
  const handleChange = (e) => {
    setFormData(
      (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
    );
  };
  const [showError, setShowError] = useState({ show: false, message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://82.165.121.189:4000/api/users/" + data.submit, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.aprooved) {
          switch (data.submit) {
            case "register":
              navigate("/");
              break;
            case "login":
              navigate("/tasks");
              break;
            default:
              break;
          }
        } else {
          setShowError(
            (prev) => (prev = { show: true, message: json.message })
          );
          setTimeout(() => {
            setShowError((prev) => (prev = { show: false, message: "" }));
          }, 3000);
        }

        setFormData(INITIAL);
      });
  };
  return (
    <div className="formContainer">
      <h1>{data.submit === "login" ? "Sign In " : "Sign Up"}</h1>
      <form className="form" onSubmit={handleSubmit}>
        {Object.keys(data.fields).map((el, id) => (
          <Input
            key={id}
            data={{ name: el, type: data.fields[el] }}
            handleChange={handleChange}
            formData={formData}
          />
        ))}
        <button>{data.submit === "register" ? "SignUp" : "SignIn"}</button>
        {showError.show && <Error message={showError.message} />}
      </form>
      <p className="account">
        {data.submit === "register"
          ? "Have already an account"
          : "Create an account"}{" "}
        <NavLink
          className="navLink"
          to={data.submit === "register" ? "/" : "register"}
        >
          {data.submit === "register" ? "SignIn" : "SignUp"}
        </NavLink>
      </p>
    </div>
  );
}
