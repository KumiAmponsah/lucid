// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Section1 from './pages/home_sections.jsx';
import Footer from './components/footer.jsx';
function App() {
  return (
    <>
    <Home/>
    <Section1/>
    <Footer/>
    </>
  );
}

export default App;