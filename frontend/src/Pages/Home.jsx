import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import "../Styles/Home.css";
import { getToken } from "../Components/auth";
import { useEffect, useState } from "react";

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <div>
            <NavBar />
            <main>
                <section className="hero">
                    <h1>Start something that matters</h1>
                    <h2>Just write your notes forever.</h2>
                    <div>
                        <Link to={isLoggedIn ? "/dashboard" : "/login"}>
                            <button>Get Started</button>
                        </Link>
                    </div>
                </section>
                {/* <section id="services" className="features">
                    <h1>Features</h1>
                    <div className="features-card">
                        <FeatureCard title="Create Notes" desc="Create your own notes and share them with your friends." />
                        <FeatureCard title="Share Notes" desc="Share your notes with your friends and collaborate on them." />
                        <FeatureCard title="Collaborate" desc="Collaborate with your friends and share your notes with them." />
                    </div>
                </section> */}
            </main>
            <Footer />
        </div>
    );
};

export default Home;
