import { Link } from "react-router-dom";


const Footer = (props) => {

    const bg = props.bg;
    const footer = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "45px",
        width: "100%",
        backgroundColor: bg ? bg : "#2B2D42",
        color: "white",
        position: "fixed",
        bottom: 0,
        boxShadow: "0px 0px 7px #000000b0",
        fontSize: "15px",
        zIndex: 100
    };

    return (
        <footer style={footer}>
            <p>
                <Link to="/" style={{ color: "yellow" }}>
                    NoteBox
                </Link> &copy; 2024 | All Rights Reserved
            </p>
        </footer>
    );
};

export default Footer;