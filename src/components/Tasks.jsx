import { useState } from "react";
import useFetch from "../useFetch.js";
import Navbar from "./Navbar.jsx";
import Page404 from "./Page404.jsx";
export default function Tasks() {
  const [tasks, setTasks] = useFetch("http://localhost:4020/tasks");
  // if (!tasks.data.aprooved) return <Page404 />;
  return (
    !tasks.isPending && (
      <div className="firstCont">
        <Navbar />
        <div className="date"></div>
        <div className="listTasks">
          <h1 className="title">Manage Your Tasks</h1>
          <div className="lists">
            <input type="text" value={tasks.value} />
          </div>
        </div>
      </div>
    )
  );
}
