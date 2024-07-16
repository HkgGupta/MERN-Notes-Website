import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import '../Styles/Contact-Us.css';
import { useState } from 'react';

const ContactUs = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault(event);
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };
        setFormData(data);

        // API Call
    };

    return (
        <div>
            <NavBar />
            <main className="contact-us">
                <h1>Contact Us</h1>
                <div className="contact-container">
                    <div className="card contact-form">
                        <form onSubmit={() => handleSubmit(event)}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder='Your Name' required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder='Your Email' required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" placeholder='Your Message' required></textarea>
                            </div>
                            <button type="submit">Send</button>
                        </form>
                    </div>
                    <div className="card contact-details">
                        <ul className="contact-list">
                            <li>
                                <strong>Address:</strong>
                                <p>123 Main Road, Ranchi, Jharkhand, IN</p>
                            </li>
                            <li>
                                <strong>Phone:</strong>
                                <p>+91 1234567890</p>
                            </li>
                            <li>
                                <strong>Email:</strong>
                                <p>contact@notesapp.com</p>
                            </li>
                            <li>
                                <strong>Website:</strong>
                                <p><a href="https://www.notebox.com">www.notebox.com</a></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactUs;
