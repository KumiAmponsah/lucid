// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Services from './pages/Services.jsx';
import Section1 from './pages/home_sections.jsx';
import Footer from './components/footer.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Home/>
            <Section1/>
            <Footer/>
          </>
        } />
        <Route path="/services" element={
          <>
            <Services/>
            <Footer/>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;