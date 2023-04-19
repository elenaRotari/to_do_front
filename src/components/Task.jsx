import React, { useState } from "react";
import "./Task.scss";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MdDone, MdRemoveDone } from "react-icons/md";
import EditTask from "./EditTask.jsx";

export default function Task({ data, setTasks }) {
  const [show, setShow] = useState(false);

  const handleDone = () => {
    fetch(`https://todoapp-ybrw.onrender.com/tasks/${data._id}`, {
      method: "PATCH",
      body: JSON.stringify({ done: !data.done }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setTasks((prev) => (prev = { ...prev, triger: !prev.triger }));
      }
    });
  };
  const handleDelete = () => {
    fetch(`https://todoapp-ybrw.onrender.com/tasks/${data._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setTasks((prev) => (prev = { ...prev, triger: !prev.triger }));
      }
    });
  };
  return (
    <div className="task">
      <div>{data.name}</div>
      <div className="btn1">
        <div style={{ position: "relative" }}>
          <button onClick={() => setShow((prev) => (prev = !prev))}>
            <AiOutlineEdit />
          </button>
          {show && (
            <EditTask id={data._id} setTasks={setTasks} setShow={setShow} />
          )}
        </div>
        <button onClick={handleDone}>
          {data.done ? <MdRemoveDone /> : <MdDone />}
        </button>
        <button onClick={handleDelete}>
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}
