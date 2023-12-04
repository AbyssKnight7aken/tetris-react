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
import Home from './components/Home/Home';
import { AuthProvider } from './contexts/authContext';
import { GameProvider } from './contexts/gameContext';
import { RouteGuard } from './components/guards/RouteGuard';
import { GuestGuard } from './components/guards/GuestGuard';
import ScoreDetails from './components/ScoreDetails/ScoreDetails';
import EditScore from './components/EditScore/EditScore';

function App() {
    return (
        <AuthProvider>
            <GameProvider>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/scoreboard' element={<ScoreBoard />} />
                        < Route path='/scoreboard/:scoreId' element={<ScoreDetails />} />
                        <Route element={<RouteGuard />}>
                            <Route path='/game' element={<Game rows={20} columns={10} />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path='/profile' element={<Profile />} />
                            < Route path='/scoreboard/:scoreId/edit' element={<EditScore />} />
                            {/* < Route path='/catalogue/:gameId/edit' element={
                                <GameOwner>
                                    <EditGame />
                                </GameOwner>
                            } /> */}
                        </Route>
                        <Route element={<GuestGuard />}>
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                        </Route>
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
                <Footer />
            </GameProvider>
        </AuthProvider>
    )
}

export default App
