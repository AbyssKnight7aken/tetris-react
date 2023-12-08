import { Routes, Route } from "react-router-dom";
import styles from './App.module.css';

import Game from './components/GameComponents/Game/Game';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import ScoreBoard from './components/Views/ScoreBoard/ScoreBoard';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import Logout from './components/Auth/Logout/Logout';
import Profile from './components/Auth/Profile/Profile';
import About from './components/Views/About/About';
import Home from './components/Views/Home/Home';
import { AuthProvider } from './contexts/authContext';
import { GameProvider } from './contexts/gameContext';
import { RouteGuard } from './components/guards/RouteGuard';
import { GuestGuard } from './components/guards/GuestGuard';
import ScoreDetails from './components/Views/ScoreDetails/ScoreDetails';
import EditScore from './components/Views/EditScore/EditScore';
import EditUserInfo from './components/Auth/EditUserInfo/EditUserInfo';
import { GameOwner } from './components/guards/GameOwner';
import NotFound from "./components/Views/NotFound/NotFound";

function App() {
    return (
        <AuthProvider>
            <GameProvider>
                <div className={styles.App}>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/scoreboard' element={<ScoreBoard />} />
                        < Route path='/scoreboard/:scoreId' element={<ScoreDetails />} />
                        <Route element={<RouteGuard />}>
                            {/* <Route path='/game' element={<Game rows={20} columns={10} />} /> */}
                            <Route path="/logout" element={<Logout />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/profile/edit' element={<EditUserInfo />} />
                            < Route path='/scoreboard/:scoreId/edit' element={
                                <GameOwner>
                                    <EditScore />
                                </GameOwner>
                            } />
                        </Route>
                        <Route element={<GuestGuard />}>
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                        </Route>
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </GameProvider>
        </AuthProvider>
    )
}

export default App
