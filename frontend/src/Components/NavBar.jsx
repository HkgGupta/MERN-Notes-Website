import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "../Styles/NavBar.css";
import { fetchDetails } from "./api/FetchAPI";
import { getToken } from "./api/auth";

import Logo from "../assets/logo.png";


const Navbar = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (isLoggedIn) {
                try {
                    const userDetails = await fetchDetails();
                    if (userDetails.success_message) {
                        setUserName(userDetails.user.name);
                        const photo = userDetails.user.photo;
                        setUserImage(`data:${photo[0].mimetype};base64,${photo[0].data}`);
                    }
                    else {
                        localStorage.removeItem("user");
                    }
                } catch (error) {
                    console.error('Failed to fetch user details:', error);
                }
            }
        };
        fetchUserDetails();
    }, [isLoggedIn]);

    useEffect(() => {
        if (showOptions) {
            setTimeout(() => {
                setShowOptions(false);
            }, 4000);
        }
    });

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1150) {
            setShowMenu(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="header" style={{ background: props.bg || "" }}>
            <nav className="nav container">
                <NavLink to="/" className="nav__logo">
                    <img src={Logo} alt="NoteBox" className="nav__logo-img" />
                    NoteBox
                </NavLink>

                {isLoggedIn ? (
                    <div className="userProfileMobile" onClick={toggleOptions}>
                        <div to="/profile" className="nav__link" onClick={closeMenuOnMobile}>
                            <img src={userImage} alt={userName} className="userImage" />
                        </div>
                        <div className={`option ${showOptions ? "show" : ""}`}>
                            <NavLink to="/profile" onClick={closeMenuOnMobile}>Profile</NavLink>
                            <NavLink to="/login" className="logout" onClick={logout}>Logout</NavLink>
                        </div>
                    </div>
                ) : ("")
                }

                <div className={`nav__menu ${showMenu ? "show-menu" : ""}`} id="nav-menu">
                    <ul className="nav__list">
                        {isLoggedIn ? (
                            <li className="nav__item">
                                <NavLink to="/dashboard" className="nav__link" onClick={closeMenuOnMobile} style={{ textDecoration: "underline" }}>
                                    Dashboard
                                </NavLink>
                            </li>
                        ) : (
                            <li className="nav__item">
                                <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                                    Home
                                </NavLink>
                            </li>
                        )}
                        <li className="nav__item">
                            <NavLink to="/features" className="nav__link" onClick={closeMenuOnMobile}>
                                Features
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/about-us" className="nav__link" onClick={closeMenuOnMobile}>
                                About Us
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/contact-us" className="nav__link" onClick={closeMenuOnMobile}>
                                Contact Us
                            </NavLink>
                        </li>

                        {isLoggedIn ? (
                            <div className="userProfileDesktop" onClick={toggleOptions}>
                                <div to="/profile" className="nav__link" onClick={closeMenuOnMobile}>
                                    <img src={userImage} alt={userName} className="userImage" />
                                </div>
                                <div className={`option ${showOptions ? "show" : ""}`}>
                                    <NavLink to="/profile" onClick={closeMenuOnMobile}>Profile</NavLink>
                                    <NavLink to="/" className="logout" onClick={logout}>Logout</NavLink>
                                </div>
                            </div>
                        ) : (
                            <li className="nav__item">
                                <NavLink to="/login" className="nav__btn">
                                    Get Started
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                        <IoClose />
                    </div>
                </div>

                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                    <IoMenu />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
