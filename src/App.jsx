// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home.jsx';
import Navbar from "./components/navbar";
import Footer from './components/footer.jsx';
import About from './pages/about.jsx';
import Service from './pages/Services.jsx';
import Signup from './pages/sign_up.jsx';
import Signin from './pages/sign_in.jsx';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/Service" element={<Service />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;