import "./Navbar.scss";
import useFetch from "../useFetch.js";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useFetch("http://localhost:4020/users/one");

  return (
    <div>
      {!name.isPending && (
        <div className="navContainer">
          <h2>Welcome</h2>
          <h2>{name.data.firstName}</h2>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            SignOut
          </button>
        </div>
      )}
    </div>
  );
}
