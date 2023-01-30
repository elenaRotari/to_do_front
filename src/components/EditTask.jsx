import React from "react";

export default function EditTask({ id, setTasks, setShow }) {
  const handleEdit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4020/tasks/" + id, {
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
    <div style={{ position: "absolute" }}>
      <form onSubmit={handleEdit}>
        <input type="text" name="name" />
        <button>Save</button>
      </form>
    </div>
  );
}
