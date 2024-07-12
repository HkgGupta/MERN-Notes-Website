import { useState, useEffect } from 'react';
import { fetchDetails, updateUserDetails, updateUserPassword } from '../Components/api/FetchAPI';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/Profile.css";

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        profilePicture: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
    const [userImage, setUserImage] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await fetchDetails();
                if (userDetails.success_message) {
                    setUser(userDetails.user);
                    setUserImage(`data:${userDetails.user.photo[0].mimetype};base64,${userDetails.user.photo[0].data}`);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            photo: e.target.files[0]
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserDetails(user);
            setUser(updatedUser);
            setIsEditing(false);
            toast.success('Profile updated successfully');

        } catch (error) {
            setErrorMessage("Error updating profile");
            toast.error('Error updating profile');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserPassword(passwords);

            if (response.success_message) {
                setPasswords({ oldPassword: '', newPassword: '' });
                setIsChangingPassword(false);
                toast.success('Password updated successfully');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error_message) {
                setErrorMessage(error.response.data.error_message);
                toast.error(error.response.data.error_message);
            } else {
                setErrorMessage('Error: ' + error.message);
            }
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    };

    return (
        <div className="profile-page">
            <NavBar />
            <div className="profile-container">
                <ToastContainer />
                <div className="image-container">
                    <div className="profile-picture">
                        <img src={userImage || 'profile.png'} alt="Profile" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <p>Created On: <br /><h5>{formatDate(user.createdAt)}</h5></p>
                            <p>Account Last Updated: <br /><h5>{formatDate(user.updatedAt)}</h5></p>
                        </div>
                    </div>
                </div>
                <div className="form-container">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="profile-form">
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    disabled
                                />
                            </label>
                            <label>
                                Phone:
                                <input
                                    type="text"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Photo:
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleFileChange}
                                />
                            </label>
                            <div className="btnDiv">
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    ) : (
                        <div className="profile-details">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                        </div>
                    )}

                    {isChangingPassword ? (
                        <form onSubmit={handlePasswordSubmit} className="password-form">
                            <label>
                                Old Password:
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={passwords.oldPassword}
                                    onChange={handlePasswordChange}
                                />
                            </label>
                            <label>
                                New Password:
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwords.newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </label>
                            <div className="btnDiv">
                                <button type="button" onClick={() => setIsChangingPassword(false)}>Cancel</button>
                                <button type="submit">Update Password</button>
                            </div>
                            {errorMessage && <p className="error">{errorMessage}</p>}
                        </form>
                    ) : (
                        <button onClick={() => setIsChangingPassword(true)}>Change Password</button>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
