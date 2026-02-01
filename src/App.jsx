// ============================================
// UPDATED App.jsx WITH ALL NEW ROUTES
// ============================================
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Navbar from "./components/navbar";
import Footer from './components/footer';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Service from './pages/Services.jsx';
import Signup from './pages/sign_up.jsx';
import Signin from './pages/sign_in.jsx';
import Category from './pages/category.jsx';
import Selected_service from './pages/selected_service.jsx';
import GeneralProfile from './pages/general_profilePage.jsx';
import UserProfile from './pages/user_Profile.jsx';
import ChatMessagingPage from './pages/messaging.jsx';
import EditProfile from './pages/edit.jsx';
import ProviderAccountOverview from './pages/provider_account_overview.jsx';
import ClientAccountOverview from './pages/client_account_overview.jsx';
import UserInfo from './pages/user_info.jsx';
import NotificationsPage from './pages/notification_page.jsx';
import ProviderDashboard from './pages/provider_dashboard.jsx';
import ClientDashboard from './pages/client_dashboard.jsx';
import ClientBookings from './pages/client_bookings.jsx';
import ProviderBookings from './pages/provider_bookings.jsx';
import ClientHistory from './pages/client_history.jsx';
import ProviderHistory from './pages/provider_history.jsx';
import NotificationSettings from './pages/notificationSettings.jsx';
import EarningsPayments from './pages/earnings.jsx';
import HelpSupport from './pages/help_support.jsx';
import BookingRequest from './pages/booking_request.jsx';
import BookingConfirmation from './pages/booking_confirmation.jsx';
import MessagesListPage from './pages/messagelist.jsx';

function Layout({ children }) {
  const location = useLocation();
  const hideNavAndFooter = [
    '/messagePage', 
    '/User_info', 
    '/notification',
    '/provider_dashboard',
    '/client_dashboard',
    '/provider_bookings',
    '/provider_history',
    '/client_history',
    '/notification-settings',
    '/earnings',
    '/help',
    '/allmessages',
    '/providerProfile',
    '/generalProfile',
    '/booking_confirmation',
    '/booking_request',
    '/client_bookings',
    '/provider_account',
     '/client_account',
  ];
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
    <NotificationProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Existing Routes */}
            <Route path="/lucid" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/Service" element={<Service />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/category" element={<Category/>}/>
            <Route path="/selected_service" element={<Selected_service/>}/>
            <Route path="/generalProfile" element={<GeneralProfile/>}/>
            <Route path="/providerProfile" element={<UserProfile/>}/>
            <Route path="/messagePage" element={<ChatMessagingPage/>}/>
            <Route path="/editprofile" element={<EditProfile/>}/>
            <Route path="/provider_account" element={<ProviderAccountOverview/>} />
            <Route path="/client_account" element={<ClientAccountOverview/>} />
            <Route path="/User_info" element={<UserInfo />} />
            <Route path="/notification" element={<NotificationsPage />} />
            <Route path="/provider_dashboard" element={<ProviderDashboard />} />
            <Route path="/client_dashboard" element={<ClientDashboard />} />
            <Route path="/client_bookings" element={<ClientBookings />} />
            <Route path="/provider_bookings" element={<ProviderBookings />} />
            <Route path="/provider_history" element={<ProviderHistory />} />
            <Route path="/client_history" element={<ClientHistory />} />
            <Route path="/notification-settings" element={<NotificationSettings />} />
            <Route path="/earnings" element={<EarningsPayments />} />
            <Route path="/help" element={<HelpSupport />} />
            <Route path="/booking_request" element={<BookingRequest />} />
            <Route path="/booking_confirmation" element={<BookingConfirmation />} />
            <Route path="/allmessages" element={<MessagesListPage />} />
          </Routes>
        </Layout>
      </Router>
    </NotificationProvider>
  );
}

export default App;

// ============================================
// FILE STRUCTURE FOR NEW PAGES
// ============================================
/*
src/
├── pages/
│   ├── dashboard.jsx                  (UserDashboard)
│   ├── my_tasks.jsx                   (MyTasks)
│   ├── history.jsx                    (History)
│   ├── notification_settings.jsx     (NotificationSettings)
│   ├── earnings_payments.jsx         (EarningsPayments)
│   ├── help_support.jsx              (HelpSupport)
│   └── account_overview.jsx          (Updated version)
*/

// ============================================
// PAGES CREATED & FEATURES
// ============================================
/*
1. DASHBOARD (/dashboard)
   - Overview statistics (jobs, earnings, rating, clients)
   - Quick actions panel
   - Upcoming bookings list
   - Recent activity feed
   - Performance metrics
   - Earnings chart preview
   
2. MY TASKS (/tasks)
   - Filter by status (all, pending, in-progress, completed, cancelled)
   - Search functionality
   - Detailed task cards with client info
   - Task management actions
   - Status badges with animations
   
3. HISTORY (/history)
   - Complete job history
   - Period filters (week, month, quarter, year)
   - Statistics overview
   - Payment method tracking
   - Export functionality
   - Ratings display
   
4. NOTIFICATION SETTINGS (/notification-settings)
   - Push notifications toggle
   - Email preferences
   - SMS alerts
   - Sound & vibration settings
   - Do Not Disturb schedule
   - Granular control per notification type
   
5. EARNINGS & PAYMENTS (/earnings)
   - Earnings overview with trends
   - Transaction history
   - Payment methods management
   - Withdrawal functionality
   - Monthly statistics
   - Export reports
   
6. HELP & SUPPORT (/help)
   - FAQ section with search
   - Category-based filtering
   - Live chat access
   - Contact form
   - Phone & email support
   - Resource links
   - System status display
   
7. ACCOUNT OVERVIEW (Updated)
   - Enhanced navigation cards
   - Better descriptions
   - Improved visual hierarchy
   - Links to all new pages
*/

// ============================================
// KEY FEATURES IMPLEMENTED
// ============================================
/*
✅ Consistent Design System
   - Matches your existing UI components
   - Uses your color palette (blue, orange)
   - Consistent spacing and shadows
   
✅ Framer Motion Animations
   - Smooth page transitions
   - Hover effects on cards
   - Staggered animations
   - Spring physics
   
✅ Responsive Design
   - Mobile-first approach
   - Grid layouts adapt to screen sizes
   - Touch-friendly interactions
   
✅ Optimized Performance
   - useMemo for expensive computations
   - Minimal re-renders
   - Efficient state management
   
✅ User Experience
   - Loading states
   - Error handling
   - Success notifications
   - Clear feedback
   
✅ Accessibility
   - Semantic HTML
   - Keyboard navigation
   - Screen reader friendly
   - Proper contrast ratios
*/

// ============================================
// NAVIGATION FLOW
// ============================================
/*
Home → Sign In → Dashboard
              ↓
         Account Overview
              ↓
    ┌─────────┴─────────┐
    │                   │
User Settings      Operations
    │                   │
    ├─ Personal Info    ├─ My Tasks
    ├─ Location         ├─ History
    ├─ Professional     ├─ Earnings
    ├─ Security         ├─ Notifications
    └─ Danger Zone      └─ Help & Support
*/