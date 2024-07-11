import "../Styles/NoteCard.css";
import { FaEdit, FaTrash, FaThumbtack } from 'react-icons/fa';

const NoteCard = ({ note, onEdit, onDelete, onTogglePin, onNoteClick }) => {
    const { title, desc, date, pinned, color, tags } = note;

    return (
        <div className="note-card" style={{ borderTop: `10px solid ${color}` }} onClick={() => onNoteClick(note)}>
            <div className="note-card-header">
                <div>
                    <FaThumbtack title="Pin Note"
                        className={`note-card-icon ${pinned ? 'pinned' : ''}`}
                        onClick={(e) => { e.stopPropagation(); onTogglePin(note._id); }}
                    />
                </div>
                <div className="note-card-action">
                    <FaEdit title="Edit Note" className="note-card-icon edit" onClick={(e) => { e.stopPropagation(); onEdit(note._id); }} />
                    <FaTrash title="Delete Note" className="note-card-icon delete" onClick={(e) => { e.stopPropagation(); onDelete(note._id); }} />
                </div>
            </div>
            <h3 className="note-card-title">{title}</h3>
            <p className="note-card-desc">
                {desc.length > 100 ? `${desc.substring(0, 100)}...` : desc}
            </p>
            <hr />
            <div className="note-card-footer">
                <div className="note-card-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
                <p className="note-card-date">{date}</p>
            </div>
        </div>
    );
};

export default NoteCard;
