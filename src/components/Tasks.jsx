import { useState } from "react";
import useFetch from "../useFetch.js";
import Navbar from "./Navbar.jsx";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Task from "./Task.jsx";
import "./Tasks.scss";

export default function Tasks() {
  const [tasks, setTasks] = useFetch("http://localhost:4020/tasks", false);
  const [add, setAdd] = useState({ name: "" });
  const handleChange = (e) => {
    setAdd((prev) => (prev = { ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = () => {
    fetch("http://localhost:4020/tasks", {
      method: "POST",
      body: JSON.stringify(add),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        setTasks((prev) => (prev = { ...prev, triger: !prev.triger }));
        setAdd({ name: "" });
      });
  };

  return (
    !tasks.isPending && (
      <div className="firstCont">
        <Navbar />

        <div className="listTasks">
          <h1 className="title">Manage Your Tasks</h1>
          <div className="lists">
            <input
              type="text"
              onChange={handleChange}
              value={add.name}
              name="name"
            />
            <button className="btn" onClick={handleClick}>
              Add
            </button>
            <div className="tasksList ">
              {tasks.data
                .filter((el) => el.done)
                .map((task, id) => (
                  <div>
                    <Task data={task} key={id} setTasks={setTasks} />
                  </div>
                ))}
              <h4>Done Tasks</h4>
              {tasks.data
                .filter((el) => !el.done)
                .map((task, id) => (
                  <div>
                    <Task data={task} key={id} setTasks={setTasks} />
                  </div>
                ))}
              <h4>To Dos</h4>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
