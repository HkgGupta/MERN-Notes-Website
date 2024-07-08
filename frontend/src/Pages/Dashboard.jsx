import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { FaPlus, FaSearch } from 'react-icons/fa';
import { fetchNotes } from "../Components/FetchAPI";
import { getToken } from "../Components/auth";
import NoteCard from "../Components/NoteCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/Dashboard.css";

const Dashboard = () => {

    const [notes, setNotes] = useState([]);
    const [count, setCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        const fetchUserNotes = async () => {
            try {
                const notesData = await fetchNotes();
                setCount(notesData.count);
                setNotes(notesData.notes);
                setErrorMessage("");
            } catch (error) {
                setErrorMessage(error);
            }
        };

        fetchUserNotes();
    }, [isLoggedIn]);

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message, { autoClose: 1000 });
            // Clear the state after showing the toast
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    return (
        <div className="notes-dashboard">
            <NavBar />
            <div className="notes-container">
                <ToastContainer />
                <div className="notes-search-add">
                    <FaSearch className="search-icon" /><input className="search-input" type="text" placeholder="Search Notes" name="search-notes" />
                    <NavLink className="add-note-btn" to="/create-note">
                        <FaPlus style={{ color: 'white' }} />
                        <span>New</span>
                    </NavLink>
                </div>

                <h2 className="heading">{`Your Notes (${count})`}</h2>

                <div className="notes">
                    {count === 0 ? (
                        <div className="no-notes">
                            <p>No notes available</p>
                            <NavLink className="add-note-btn" to="/create-note">
                                Create Now
                            </NavLink>
                        </div>
                    ) : (
                        notes.map(note => (
                            <NoteCard key={note._id} note={note} />
                        ))
                    )}
                </div>
                <p className="error">{errorMessage}</p>
            </div>
            <Footer />
        </div >
    );
};

export default Dashboard;
