import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import { fetchNotes, deleteNote, togglePinNote } from "../Components/api/FetchAPI";
import { getToken } from "../Components/api/auth";
import NoteCard from "../Components/NoteCard";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/Dashboard.css";
import NoteModal from "../Components/NoteModal";

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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

    const fetchUserNotes = async () => {
        try {
            const notesData = await fetchNotes();
            if (notesData.success_message) {
                const pinnedNotes = notesData.notes.filter(note => note.pinned);
                const unpinnedNotes = notesData.notes.filter(note => !note.pinned);
                setNotes([...pinnedNotes, ...unpinnedNotes]);
            }
            else {
                localStorage.removeItem("user");
            }
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };


    useEffect(() => {
        fetchUserNotes();
    }, [isLoggedIn]);

    useEffect(() => {
        if (location.state?.message) {
            showSuccessToast(location.state.message);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    const handleEdit = (id) => {
        navigate(`/update-note/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteNote(id);
            setNotes(notes.filter(note => note._id !== id));
            response.success_message ? showSuccessToast(response.success_message) : showErrorToast("Error deleting note");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleTogglePin = async (id) => {
        try {
            const response = await togglePinNote(id);
            const updatedNotes = notes.map(note => note._id === id ? { ...note, pinned: !note.pinned } : note);
            setNotes(updatedNotes);
            fetchUserNotes();
            response.success_message ? showSuccessToast(response.success_message) : showErrorToast("Error pinning note");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };

    const handleCloseModal = () => {
        setSelectedNote(null);
    };

    const showSuccessToast = (message) => {
        toast.success(message, { autoClose: 1000 });
    };

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    const showErrorToast = (message) => {
        toast.error(message, { autoClose: 1000 });
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return (
        <div className="notes-dashboard">
            <NavBar />
            <div className="notes-container">
                <ToastContainer />
                <div className="notes-search-add">
                    <div className="searchDiv">
                        <FaSearch className="search-icon" />
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search Notes"
                            name="search-notes"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        {searchTerm && (
                            <FaTimes className="clear-search" onClick={handleClearSearch} title="Clear Search" />
                        )}
                    </div>
                    <NavLink className="add-note-btn" to="/create-note">
                        <FaPlus style={{ color: 'white' }} />
                        <span>New</span>
                    </NavLink>
                </div>

                <h2 className="heading">{`Your Notes (${filteredNotes.length})`}</h2>

                <div className="notes">
                    {notes.length <= 0 ? (
                        <div className="no-notes">
                            <p>No notes available</p>
                            <NavLink className="add-note-btn" to="/create-note">
                                Create Now
                            </NavLink>
                        </div>
                    ) : (
                        filteredNotes.length === 0 ? (
                            <div className="no-notes">
                                <p>No matching notes found</p>
                                {/* Optionally provide a link to create a new note */}
                            </div>
                        ) : (
                            filteredNotes.map(note => (
                                <NoteCard
                                    key={note._id}
                                    note={note}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onTogglePin={handleTogglePin}
                                    onNoteClick={handleNoteClick}
                                />
                            ))
                        )
                    )}
                </div>
                <p className="error">{errorMessage}</p>
            </div>
            {selectedNote && <NoteModal note={selectedNote} onClose={handleCloseModal} />}
            <Footer />
        </div>
    );
};

export default Dashboard;
