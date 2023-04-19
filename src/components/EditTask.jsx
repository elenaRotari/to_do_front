import React from "react";
import "./EditTask.scss";

export default function EditTask({ id, setTasks, setShow }) {
  const handleEdit = (e) => {
    e.preventDefault();
    fetch("https://todoapp-ybrw.onrender.com/tasks/" + id, {
      method: "PATCH",
      body: JSON.stringify({ name: e.target[0].value }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setTasks((prev) => (prev = { ...prev, triger: !prev.triger }));
        setShow((prev) => (prev = !prev));
      }
    });
  };
  return (
    <div className="edit">
      <form onSubmit={handleEdit} className="formEdit">
        <input type="text" name="name" />
        <button>Save</button>
      </form>
    </div>
  );
}
