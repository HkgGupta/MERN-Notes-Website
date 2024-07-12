import "../Styles/NoteModal.css";

const NoteModal = ({ note, onClose }) => {
    const { title, desc, color, tags, createdAt, updatedAt } = note;

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    };

    return (
        <div className="note-modal">
            <div className="note-modal-content" style={{ borderTop: `10px solid ${color}` }}>
                <div className="note-modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="note-modal-body">
                    <h3>Description</h3>
                    <p className="desc">{desc}</p>
                    <h3>Tags</h3>
                    <div className="note-modal-tags">
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                    <h3>Created At</h3>
                    <p>{formatDate(createdAt)}</p>
                    <h3>Last Updated At</h3>
                    <p>{formatDate(updatedAt)}</p>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;
