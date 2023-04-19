import "./Navbar.scss";
import useFetch from "../useFetch.js";
import { useNavigate } from "react-router-dom";
import DateTime from "./DateTime.jsx";
import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useFetch(
    "https://todoapp-ybrw.onrender.com/users/one"
  );
  const handleLogOut = (e) => {
    fetch("https://todoapp-ybrw.onrender.com/users/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  return (
    <div>
      {!name.isPending && (
        <div className="navContainer">
          <div className="welcome">
            <h2>Welcome</h2>
            <h2>{name.data.firstName}</h2>
          </div>
          <DateTime />
          <button
            onClick={() => {
              handleLogOut();
              navigate("/");
            }}
          >
            <FaSignOutAlt />
          </button>
        </div>
      )}
    </div>
  );
}
