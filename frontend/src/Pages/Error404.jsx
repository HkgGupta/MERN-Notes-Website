import { NavLink } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/NavBar";

import "../Styles/Error404.css";

const Error404 = () => {
  return (
    <div>
      <Navbar />
      <div className="Error">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Page you are looking for could not be found.
          <br />
          If the problem persists, please contact support.
        </p>
        <NavLink to="/" className="btn">Go Home</NavLink>
      </div>
      <Footer />
    </div>

  );
};

export default Error404;