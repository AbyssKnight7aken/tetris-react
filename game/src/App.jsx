import { useState } from 'react'
import Game from './components/Game/Game';
import { Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import { AuthProvider } from './contexts/authContext';
import { GameProvider } from './contexts/gameContext';

function App() {
    return (
        <AuthProvider>
            <GameProvider>
                <Header />
                <div className="App">
                    <Routes>
                        <Route path='/game' element={<Game rows={20} columns={10} />} />
                        <Route path='/scoreboard' element={<ScoreBoard />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
                <Footer />
            </GameProvider>
        </AuthProvider>
    )
}

export default App
