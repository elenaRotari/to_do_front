import Input from "./Input.jsx";
import { useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import "./Form.scss";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4020/users/" + data.submit, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
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
