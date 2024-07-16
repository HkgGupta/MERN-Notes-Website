import { useState } from "react";
import axios from "../axiosConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import Navbar from './../Components/NavBar';
import Footer from './../Components/Footer';

import { setToken } from "../Components/api/auth.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDisabledSubmit, setisDisableSubmit] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { message } = location.state || "";


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setisDisableSubmit(true);
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    try {
      const response = await axios.post("/login", formDataToSend);
      setSuccessMessage(response.data.success_message);

      // save token to local storage
      await setToken(response.data.token);

      setisDisableSubmit(false);

      navigate("/dashboard");

    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error_message);
      } else if (error.request) {
        setErrorMessage("Network error. Please try again later.");
      } else {
        setErrorMessage("Unexpected error. Please try again later.");
      }
    }
  };

  return (
    <div className="login">
      <Navbar bg="transparent" />
      <div className="login-container">
        <div className="login-section">
          <h1>Welcome Page</h1>
          <h2>Don&apos;t have an account?</h2>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="login-form">
          <p className="login-message">{message}</p>
          <h2>Sign In</h2>
          <form className="detail" onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button disabled={isDisabledSubmit} type="submit">Submit</button>

            <div className="info">
              <h4>Don&apos;t have an account?</h4>
              <Link to="/register">
                Register
              </Link>
            </div>

          </form>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </div>
      </div>
      <Footer bg="#2b2d4233" />
    </div>
  );
};

export default Login;
