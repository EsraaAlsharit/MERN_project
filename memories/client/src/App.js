import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';

import { GoogleOAuthProvider } from '@react-oauth/google';



const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxwidth='xl'>
                <GoogleOAuthProvider clientId='868110604612-uei2be6igt4tuhnf77rbkdq2c5075jo6.apps.googleusercontent.com'>
                    <Navbar />
                    <Routes>
                        {/* <Route path="/" exact element={<Home/>}/> */}
                        <Route path="/" exact element={<Navigate to="/posts" />} />
                        <Route path="/posts" exact element={<Home />} />
                        <Route path="/posts/search" exact element={<Home />} />
                        <Route path="/posts/:id" exact element={<PostDetails />} />
                        {/* <Route path="/auth" exact element={<Auth />} /> */}
                        <Route path="/auth" exact element={(!user ? <Auth /> : <Navigate to="/posts" />)} />
                    </Routes>
                </GoogleOAuthProvider>
            </Container>
        </BrowserRouter>
    )
};

export default App;