import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { getToken } from "../Components/api/auth";

import "../Styles/Create-Update-Note.css";
import { createNote, updateNote } from "../Components/api/FetchAPI";
import Navbar from './../Components/NavBar';
import Footer from './../Components/Footer';

const Create_Update_Note = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({
        title: "",
        desc: "",
        color: "",
        tags: [],
        pinned: false
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (id) {
            const fetchNote = async () => {
                try {
                    const response = await axios.get(`/note/${id}`, {
                        headers: { Authorization: `Bearer ${getToken()}` }
                    });
                    setNote(response.data.note);
                } catch (error) {
                    setErrorMessage("Failed to load note.");
                }
            };
            fetchNote();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote({
            ...note,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        try {
            let response;
            if (id) {
                response = await updateNote(note);
                setSuccessMessage(response.success_message);
                setErrorMessage(response.error_message);
            } else {
                response = await createNote(note);
                setSuccessMessage(response.success_message);
                setErrorMessage(response.error_message);
            }
            response.error_message ? "" : (
                navigate("/dashboard", { state: { message: response.success_message } })
            );
        } catch (error) {
            setErrorMessage(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="note-form-container">
                <h2>{id ? "Update Note" : "Create Note"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={note.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="desc"
                        placeholder="Description"
                        rows="5"
                        value={note.desc}
                        onChange={handleChange}
                        required
                    />
                    <label>
                        Choose Color
                        <input
                            type="color"
                            name="color"
                            placeholder="Color"
                            value={note.color}
                            onChange={handleChange}
                        />
                    </label>
                    <input
                        type="text"
                        name="tags"
                        placeholder="Tags (comma separated)"
                        value={note.tags.join(",")}
                        onChange={(e) => setNote({ ...note, tags: e.target.value.split(",") })}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="pinned"
                            checked={note.pinned}
                            onChange={(e) => setNote({ ...note, pinned: e.target.checked })}
                        />
                        Pinned Note
                    </label>
                    <button type="submit">{id ? "Update Note" : "Create Note"}</button>
                </form>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </div>
            <Footer />
        </div>
    );
};

export default Create_Update_Note;
