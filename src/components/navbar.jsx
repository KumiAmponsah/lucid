import { useState } from "react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Hammer, BriefcaseBusiness, ArrowLeft, MapPin, LogOut, MessageCircle, Bell, Settings, Info, LogIn } from "lucide-react";
import { Button } from './ui/Button.jsx';
import { Avatar } from './ui/Avatar.jsx';
import Logo from "../assets/Lucid.png";

// Notification Badge Component
const NotificationBadge = ({ count = 0, className = "" }) => {
  // Don't render anything if count is 0 or negative
  if (!count || count <= 0) return null;

  return (
    <motion.span
      className={`absolute -top-1 -right-1 min-w-[18px] h-[18px]
        px-1 text-xs font-bold text-white bg-red-600
        rounded-full flex items-center justify-center
        ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
    >
      {count > 99 ? "99+" : count}
    </motion.span>
  );
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

const slideIn = {
  hidden: { x: -300, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: { 
    x: -300, 
    opacity: 0,
    transition: { duration: 0.1, ease: "easeIn" }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.1 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.1 }
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAreaSubmenu, setShowAreaSubmenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // Notification counts - you can fetch these from your state/API
  const [notificationCount] = useState(20);
  const [messageCount] = useState(22);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowAreaSubmenu(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setShowAreaSubmenu(false);
  };

  const handleAreaClick = () => {
    setShowAreaSubmenu(true);
  };

  const handleBackClick = () => {
    setShowAreaSubmenu(false);
  };

  // Calculate total notification count
  const totalNotifications = notificationCount + messageCount;

  // Sample locations
  const locations = [
    "Spintex", "Osu", "North-Ridge", "Madina",
    "Labadi", "Achimota", "Circle", "Tema"
  ];

  // Navigation configuration
  const navLinks = [
    { to: "/signin", label: "Join as a worker", icon: BriefcaseBusiness},
    { to: "/Service", label: "Services", icon: Hammer },
    { to: "/about", label: "About", icon: Info },
  ];

  const userMenuLinks = [
    { to: "/providerProfile", label: "My Profile" },
    { to: "/provider_dashboard", label: "Account" },
    { to: "/allmessages", label: "Messages", badge: messageCount },
    { to: "/notification", label: "Notifications", badge: notificationCount },
  ];

  const mobileUserLinks = [
    { to: "/allmessages", label: "Messages", icon: MessageCircle, badge: messageCount },
    { to: "/notification", label: "Notifications", icon: Bell, badge: notificationCount },
    { to: "/provider_dashboard", label: "Account", icon: Settings },
  ];

  return (
    <>
      < nav 
        className="navbar bg-white h-20 shadow-lg sticky top-0 z-30"
      >
        {/* Logo */}
        < div 
          className="navbar-start ml-4 md:ml-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Link to="/lucid" className="flex items-center">
            < img
              src={Logo}
              alt="Lucid Logo"
              className="h-5 w-20 object-cover"
            />
          </Link>
        </ div>

        {/* Desktop Navigation */}
        <div className="navbar-end mr-4">
          <motion.div 
            className="hidden lg:flex items-center gap-2"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Area Dropdown */}
            <motion.div 
              className="dropdown dropdown-bottom"
              variants={fadeInUp}
            >
              <motion.div
                tabIndex={0}
                role="button"
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors cursor-pointer rounded-lg hover:bg-orange-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Area</span>
                <ChevronDown className="w-4 h-4" />
              </motion.div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-lg z-50 w-52 p-2 shadow-lg border border-gray-200 max-h-64 overflow-y-auto"
              >
                {locations.map((location, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link 
                      to="/selected_service" 
                      className="text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
                    >
                      {location}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Navigation Links */}
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Link
                  to={link.to}
                  className="px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors rounded-lg hover:bg-orange-50"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

          </motion.div>

          {/* User Profile / Sign In */}
          {isLoggedIn ? (
            <motion.div 
              className="dropdown dropdown-end ml-4 hidden lg:block relative"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              {/* Avatar Button */}
              <motion.div
                tabIndex={0}
                role="button"
                className="relative flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Notification Badge - only shows if count > 0 */}
                <NotificationBadge
                  count={totalNotifications}
                  className="top-1 right-20"
                />

                <Avatar name="Gabriel Gordon-Mensah" size="md" />
                <span className="font-medium text-gray-800">Gabriel</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </motion.div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-lg z-50 w-52 p-2 shadow-lg border border-gray-200 mt-2"
              >
                {userMenuLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link 
                      to={link.to} 
                      className="text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors relative flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <NotificationBadge 
                        count={link.badge} 
                        className="relative top-0 right-0 w-4 h-4 p-2" 
                      />
                    </Link>
                  </motion.li>
                ))}

                <li className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="text-red-600 hover:bg-red-50 rounded-md transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </motion.div>
          ) : (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Button 
                onClick={() => setIsLoggedIn(true)}
                variant="secondary" 
                size="sm"
                className="ml-4 hidden lg:block"
              >
                Sign In
              </Button>
            </motion.div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="lg:hidden z-50 p-2 ml-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md relative"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Only show badge if logged in AND has notifications */}
            {isLoggedIn && <NotificationBadge count={totalNotifications} />}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </ nav>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={toggleMenu}
            className="fixed inset-0 bg-black bg-opacity-0 z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50"
            variants={slideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-6 h-full flex flex-col">
              {/* Logo */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <img src={Logo} alt="Lucid Logo" className="h-5 w-28 object-cover m-1" />
              </motion.div>

              {/* User Profile (Mobile) */}
              {isLoggedIn && !showAreaSubmenu && (
                <motion.div 
                  className="mb-6 pb-6 border-b border-gray-200"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar name="Gabriel Gordon-Mensah" size="lg" />
                    <div>
                      <p className="font-semibold text-gray-900">Gabriel</p>
                      <Link 
                        to="/providerProfile" 
                        onClick={handleLinkClick} 
                        className="text-sm text-blue-600 hover:text-orange-600 transition-colors"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Menu Items */}
              <motion.nav 
                className="space-y-2 flex-1 overflow-y-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {!showAreaSubmenu ? (
                  <>
                    {/* Area Button */}
                    <motion.button
                      onClick={handleAreaClick}
                      className="w-full flex items-center justify-between text-gray-700 hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">Area</span>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>

                    {/* Navigation Links */}
                    {navLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <motion.div key={index} variants={fadeInUp}>
                          <Link
                            to={link.to}
                            onClick={handleLinkClick}
                            className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{link.label}</span>
                          </Link>
                        </motion.div>
                      );
                    })}

                    {/* User Links with Badges */}
                    {isLoggedIn && mobileUserLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <motion.div key={index} variants={fadeInUp}>
                          <Link
                            to={link.to}
                            onClick={handleLinkClick}
                            className="flex items-center justify-between text-gray-700 hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                          >
                            <div className="flex items-center space-x-3 relative">
                              <div className="relative">
                                <Icon className="w-5 h-5" />
                                <NotificationBadge 
                                  count={link.badge} 
                                  className="-top-2 rounded-full left-2 w-3 h-3"
                                />
                              </div>
                              <span className="font-medium">{link.label}</span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {/* Back Button */}
                    <motion.button
                      onClick={handleBackClick}
                      className="w-full flex items-center space-x-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: -5 }}
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span className="font-medium">Back</span>
                    </motion.button>

                    <motion.div 
                      className="px-3 py-2 mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900">Select Area</h3>
                    </motion.div>

                    {locations.map((location, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to="/selected_service"
                          onClick={handleLinkClick}
                          className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                        >
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">{location}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.nav>

              {/* Auth Button */}
              {!showAreaSubmenu && (
                <motion.div 
                  className="mt-4 pt-4 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {isLoggedIn ? (
                    <Button  
                      variant="danger" 
                      fullWidth
                      onClick={() => {
                        setIsLoggedIn(false);
                        handleLinkClick();
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary" 
                      fullWidth
                      onClick={() => {
                        setIsLoggedIn(true);
                        handleLinkClick();
                      }}
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;