import { Outlet } from "react-router-dom";

import Footer from "./Footer.jsx";

export default function Main() {
  return (
    <div className="mainContainer">
      <Outlet />
      <Footer />
    </div>
  );
}
