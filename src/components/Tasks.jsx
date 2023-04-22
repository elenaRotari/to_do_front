import { useState } from "react";
import useFetch from "../useFetch.js";
import Navbar from "./Navbar.jsx";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Task from "./Task.jsx";
import "./Tasks.scss";

export default function Tasks() {
  const [tasks, setTasks] = useFetch(
    "https://todoapp-ybrw.onrender.com/api/tasks",
    false
  );
  const [add, setAdd] = useState({ name: "" });
  const handleChange = (e) => {
    setAdd((prev) => (prev = { ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = () => {
    fetch("https://todoapp-ybrw.onrender.com/api/tasks", {
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
              <div className="todoCont">
                <h2>To Dos</h2>
                <div className="todo">
                  {tasks.data
                    .filter((el) => !el.done)
                    .map((task, id) => (
                      <div>
                        <Task data={task} key={id} setTasks={setTasks} />
                      </div>
                    ))}
                </div>
              </div>
              <div className="doneCont">
                <h2>Done Tasks</h2>
                <div className="done">
                  {tasks.data
                    .filter((el) => el.done)
                    .map((task, id) => (
                      <div>
                        <Task data={task} key={id} setTasks={setTasks} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
