import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import '../Styles/About-Us.css';

import Team from '../assets/About/team.jpg';
import Vision from '../assets/About/vision.jpg';
import Contact from '../assets/About/contact.jpg';

const AboutUs = () => {
    return (
        <div className="about-us">
            <NavBar />
            <h1 className="about-us-title">About Us</h1>
            <section className="intro">
                <p>Welcome to NotesApp, your ultimate tool for managing personal notes efficiently and securely. Our application is designed to cater to the needs of students, professionals, and anyone who values organized and accessible information.</p>
            </section>
            <section className="team">
                <h2>Our Team</h2>
                <div className="grid-container">
                    <div className="grid-item">
                        <img src={Team} alt="Team" />
                    </div>
                    <div className="grid-item">
                        <p>We are a dedicated team of developers, designers, and thinkers who are passionate about creating user-friendly and secure web applications. Our mission is to enhance your productivity and organization through innovative solutions.</p>
                    </div>
                </div>
            </section>
            <section className="vision">
                <h2>Our Vision</h2>
                <div className="grid-container">
                    <div className="grid-item">
                        <p>We envision a world where managing personal information is seamless, intuitive, and secure. Our goal is to continuously improve NotesApp by adding new features and ensuring the best user experience possible.</p>
                    </div>
                    <div className="grid-item">
                        <img src={Vision} alt="Vision" />
                    </div>
                </div>
            </section>
            <section className="contact">
                <h2>Contact Us</h2>
                <div className="grid-container">
                    <div className="grid-item">
                        <img src={Contact} alt="Contact" />
                    </div>
                    <div className="grid-item">
                        <p>If you have any questions, feedback, or suggestions, please do not hesitate to reach out to us. You can contact us at:</p>
                        <p><b>Email: </b><a href="mailto:contact@notebox.com">contact@notesapp.com</a></p>
                        <p><b>Phone:</b> +91 1234567890</p>
                        <p><b>Address:</b> 123 Main Road, Ranchi, Jharkhand, IN</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutUs;
