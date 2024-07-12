import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Error404 from './Pages/Error404';
import axios from './axiosConfig';

import './App.css';
import Create_Update_Note from './Pages/Create-Update-Note';
import Profile from './Pages/Profile';
import Features from './Pages/Features';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-note" element={<Create_Update_Note />} />
                <Route path="/update-note/:id" element={<Create_Update_Note />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/features" element={<Features />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    );
}

export default App;
