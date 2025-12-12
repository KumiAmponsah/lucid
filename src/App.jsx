// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home.jsx';
import Navbar from "./components/navbar";
import Footer from './components/footer.jsx';
import About from './pages/about.jsx';
import Service from './pages/Services.jsx';
import Signup from './pages/sign_up.jsx';
import Signin from './pages/sign_in.jsx';
import Category from './pages/category.jsx';
import Selected_service from './pages/selected_service.jsx';
import GeneralProfile from './pages/general_profilePage.jsx';
import UserProfile from './pages/user_Profile.jsx';
import User_EditPage from './pages/user_editPage.jsx';
import ChatMessagingPage from './pages/messaging.jsx';
import EditProfile from './pages/edit.jsx';
import Clientsignprofile from './pages/clientsignprofile.jsx';
import Accountsettings from './pages/accountsettings.jsx';

// Layout wrapper component
function Layout({ children }) {
  const location = useLocation();
  
  // Routes where Navbar and Footer should NOT be displayed
  const hideNavAndFooter = ['/messagePage', '/accountsettings', '/clientsignprofile'];
  
  const shouldHideLayout = hideNavAndFooter.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/lucid_website_test" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/Service" element={<Service />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/category" element={<Category/>}/>
          <Route path="/selected_service" element={<Selected_service/>}/>
          <Route path="/generalProfile" element={<GeneralProfile/>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/userEdit" element={<User_EditPage/>}/>
          <Route path="/messagePage" element={<ChatMessagingPage/>}/>
          <Route path="/editprofile" element={<EditProfile/>}/>
          <Route path="/clientsignprofile" element={<Clientsignprofile/>} />
          <Route path="/accountsettings" element={<Accountsettings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;