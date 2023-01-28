import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main.jsx";
import Form from "./components/Form.jsx";
import Page404 from "./components/Page404.jsx";
import Tasks from "./components/Tasks.jsx";

function App() {
  const data = {
    login: {
      fields: {
        firstName: "text",
        email: "email",
        password: "password",
      },
      submit: "login",
    },
    register: {
      fields: {
        firstName: "text",
        lastName: "text",
        email: "email",
        password: "password",
      },
      submit: "register",
    },
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<Form data={data.login} />} />
          <Route path="register" element={<Form data={data.register} />} />
          <Route path="tasks" element={<Tasks data={data.login} />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
