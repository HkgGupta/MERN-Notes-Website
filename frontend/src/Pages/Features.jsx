import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import '../Styles/Features.css';

import Performance from "../assets/features/Fast_Performance.png";
import Security from "../assets/features/Secure_Data.png";
import UserFriendly from "../assets/features/User_Friendly.png";
import Support from "../assets/features/24x7_Support.png";
import Customizable from "../assets/features/Customizable.png";
import Responsive from "../assets/features/responsive.png";
import RegularUpdates from "../assets/features/Regular_Updates.png";
import CloudSync from "../assets/features/Cloud_Sync.png";

const featuresData = [
    {
        id: 1,
        image: Performance,
        title: 'Fast Performance',
        description: 'Experience blazing fast speed with our optimized algorithms.'
    },
    {
        id: 2,
        image: Security,
        title: 'Secure Data',
        description: 'Your data is safe with our industry-leading security protocols.'
    },
    {
        id: 3,
        image: UserFriendly,
        title: 'User Friendly',
        description: 'An intuitive and user-friendly interface for a seamless experience.'
    },
    {
        id: 4,
        image: Support,
        title: '24/7 Support',
        description: 'We provide round-the-clock support to assist you anytime.'
    },
    {
        id: 5,
        image: Customizable,
        title: 'Customizable',
        description: 'Easily customize features to suit your specific needs.'
    },
    {
        id: 6,
        image: CloudSync,
        title: 'Cloud Sync',
        description: 'Sync your data across all devices with our cloud service.'
    },
    {
        id: 7,
        image: RegularUpdates,
        title: 'Regular Updates',
        description: 'Receive regular updates with new features and improvements.'
    },
    {
        id: 8,
        image: Responsive,
        title: 'Responsive',
        description: 'Adapt to different screen sizes with our responsive design.'
    },
];



const Features = () => {
    return (
        <div className="features-page">
            <NavBar />
            <h1 className="features-title">Features</h1>
            <div className="features-container">
                {featuresData.map(feature => (
                    <div className="feature-card" key={feature.id}>
                        <img src={feature.image} alt={feature.title} className="feature-image" />
                        <h3 className="feature-card-title">{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Features;
