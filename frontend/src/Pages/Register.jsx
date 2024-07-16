import { useState } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import OTPContainer from "../Components/OTPContainer";
import "../Styles/Register.css";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        photo: null,
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [otpId, setotpId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isDisabledSubmit, setisDisableSubmit] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setisDisableSubmit(true);
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("photo", formData.photo);
        formDataToSend.append("password", formData.password);

        try {
            const response = await axios.post("/register", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccessMessage(response.data.success_message);
            setUserId(response.data.userId);
            setotpId(response.data.otpId);
            setShowOTP(true);
            setisDisableSubmit(false);
        } catch (error) {
            setisDisableSubmit(false);
            if (error.response) {
                setErrorMessage(error.response.data.error_message);
            } else if (error.request) {
                setErrorMessage("Network error. Please try again later.");
            } else {
                setErrorMessage("Unexpected error. Please try again later.");
            }
        }
    };

    const handleOTPSubmit = async (otp) => {
        try {
            setErrorMessage("");
            setSuccessMessage("");
            const response = await axios.post("/validate-otp", { userId, otpId, otp });
            setSuccessMessage(response.data.success_message);
            navigate("/login", { state: { message: response.data.success_message } });
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

    const handleOTPResend = async () => {
        try {
            setErrorMessage("");
            setSuccessMessage("");
            await axios.post("/resend-otp", { userId });
            setSuccessMessage("OTP resent successfully");
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
        <div className="register">
            <Navbar bg="transparent" />
            <div className="register-container">
                {!showOTP ? (
                    <div className="form-section">
                        <h2>Register</h2>
                        <form className="detail" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="file"
                                name="photo"
                                onChange={handleFileChange}
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
                            <button disabled={isDisabledSubmit} type="submit">Continue</button>

                            <div className="info">
                                <h4>Already have an account?</h4>
                                <Link to="/login">
                                    Login
                                </Link>
                            </div>

                        </form>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        {successMessage && <p className="success">{successMessage}</p>}
                    </div>
                ) : (
                    <div className="form-section">
                        <OTPContainer onSubmit={handleOTPSubmit} onResend={handleOTPResend} />
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        {successMessage && <p className="success">{successMessage}</p>}
                    </div>

                )}
                <div className="welcome-section">
                    <h1>Welcome Page</h1>
                    <h2>Already have an account?</h2>
                    <Link to="/login">
                        <button>Sign In</button>
                    </Link>
                </div>
            </div>
            <Footer bg="#2b2d4233" />
        </div>
    );
};

export default Register;
