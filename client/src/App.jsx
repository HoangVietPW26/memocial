import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Auth from "./components/Auth/Auth.jsx";
const App = () => {
  return (
    <GoogleOAuthProvider clientId="67079496792-5i08cbk7drnca37f4coa21s1umjvlh7s.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
