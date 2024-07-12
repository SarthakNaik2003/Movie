import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from '../components/Home';
import Playlist from '../components/Playlist.';
import NavbarMain from '../components/Navbar';
import Footer from '../components/Footer';
import Movie from '../components/Movie';

const AuthRoute = () => {
    return (
        <BrowserRouter>
            <NavbarMain />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/playlist' element={<Playlist />} />
                <Route path='/movies/:id/:movie' element={<Movie />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    )
}

export default AuthRoute