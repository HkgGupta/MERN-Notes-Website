import "../Styles/NoteCard.css";

const NoteCard = ({ note }) => {
    const { title, desc, date, pinned, color, tags } = note;

    return (
        <div className="note-card">
            <div className="note-card-header">
                <h3 className="note-card-title">{title}</h3>
                <p className="note-card-date">{date}</p>
            </div>
            <p className="note-card-desc">{desc}</p>
            <div className="note-card-footer">
                <p className="note-card-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </p>
                {pinned && <p className="note-card-pinned">Pinned</p>}
                <div className="note-card-color" style={{ backgroundColor: color }}>
                    {color}
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
