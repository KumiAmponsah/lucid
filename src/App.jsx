// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Section1 from './pages/security.jsx';
function App() {
  return (
    <>
    <Home/>
    <Section1/>
    </>
  );
}

export default App;