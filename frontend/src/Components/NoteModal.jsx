import { useState } from "react";
import "../Styles/NoteModal.css";

const NoteModal = ({ show, onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [color, setColor] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, desc, color, tags });
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Note</h2>
                <span className="close-btn" onClick={onClose}>X</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Color:
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </label>
                    <label>
                        Tags (comma separated):
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </label>
                    <button type="submit">Add Note</button>
                </form>
            </div>
        </div>
    );
};

export default NoteModal;
