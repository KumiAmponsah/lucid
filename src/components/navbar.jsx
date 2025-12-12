import { useState } from "react";
import Logo from "../assets/Lucid.png";
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowLeft, MapPin, LogOut} from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAreaSubmenu, setShowAreaSubmenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowAreaSubmenu(false); // Reset submenu when closing main menu
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

  // Sample locations - you can customize this list
  const locations = [
    "Spintex",
    "Osu",
    "North-Ridge",
    "Madina",
    "Labadi",
    "Achimota",
    "Circle",
    "Tema"
  ];

  return (
    <>
      <div className="navbar bg-white h-20 shadow-lg">
        {/* Left section */}
        <div className="navbar-start ml-12">
          <Link to="/lucid_website_test" className="flex items-center">
            <img
              src={Logo}
              alt="Lucid Logo"
              className="h-5 w-28 object-cover m-1"
            />
          </Link>
        </div>

        {/* Right section */}
        <div className="navbar-end mr-4">
          {/* Desktop nav links */}
          <div
            role="tablist"
            className="tabs tabs-boxed hidden text-black lg:flex"
          >
            <div className="dropdown dropdown-bottom">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-1 px-4 py-2 text-black hover:text-orange-600 transition-colors cursor-pointer"
              >
                <span>Area</span>
                <ChevronDown className="w-4 h-4" />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow-sm max-h-64 overflow-y-auto"
              >
                {locations.map((location, index) => (
                  <li key={index}>
                    <Link to="/selected_service" className="text-black hover:bg-orange-50 hover:text-orange-600">
                      {location}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/signin"
              role="tab"
              className="tab px-4 py-2 text-black border-b-2 border-transparent hover:border-orange-600 transition-colors cursor-pointer"
            >
              Join as a worker
            </Link>
            <Link to="/Service"
              role="tab"
              className="tab px-4 py-2 text-black border-b-2 border-transparent hover:border-orange-600 transition-colors cursor-pointer"
            >
              Services
            </Link>
            <Link to="/about"
              role="tab"
              className="tab tab-active px-4 py-2 text-black border-b-2 border-transparent hover:border-orange-600 transition-colors cursor-pointer"
            >
              About
            </Link>
          </div>

          {/* User Profile Button (when logged in) */}
          {isLoggedIn ? (
            <div className="dropdown dropdown-end ml-4 hidden lg:block">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-lg">
                  GG
                </div>
                <span className="font-medium text-gray-900">Gabriel</span>
                <ChevronDown className="w-4 h-4 text-gray-900" />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow-lg border border-gray-100 mt-2"
              >
                <li>
                  <Link to="/userProfile" className="text-black hover:bg-orange-50 hover:text-orange-600">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/accountsettings" className="text-black hover:bg-orange-50 hover:text-orange-600">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="/messagePage" className="text-black hover:bg-orange-50 hover:text-orange-600">
                    Messages
                  </Link>
                </li>
                <li className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="text-black py-2 px-4 w-full text-left hover:bg-red-50 hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            /* Sign-Up button (when logged out) */
            <Link to="/signup" className="btn bg-orange-600 text-white ml-4 hidden lg:flex items-center justify-center border-2 border-transparent hover:border-orange-600 hover:bg-white hover:text-orange-600">
              Sign-Up
            </Link>
          )}

          {/* Hamburger menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden z-50 p-2 ml-4 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="mb-4">
            <img
              src={Logo}
              alt="Lucid Logo"
              className="h-14 w-14 object-contain"
            />
          </div>

          {/* User Profile Section (Mobile) */}
          {isLoggedIn && !showAreaSubmenu && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-lg">
                  GG
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Gabriel</p>
                  <Link to="/userProfile" onClick={handleLinkClick} className="text-sm text-gray-500 hover:text-orange-600">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <nav className="space-y-4 flex-1 overflow-y-auto">
            {!showAreaSubmenu ? (
              /* Main Menu */
              <>
                {/* Area Menu Item with Arrow */}
                <button
                  onClick={handleAreaClick}
                  className="w-full flex items-center justify-between text-black hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5" />
                    </svg>
                    <span className="font-medium">Area</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <Link
                  to="/userProfile"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 text-black hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z" />
                  </svg>
                  <span className="font-medium">Join as a worker</span>
                </Link>

                <Link
                  to="/Service"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 text-black hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z" />
                  </svg>
                  <span className="font-medium">Services</span>
                </Link>

                <Link
                  to="/about"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 text-black hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z" />
                  </svg>
                  <span className="font-medium">About</span>
                </Link>

                {isLoggedIn && (
                  <>
                    <Link
                      to="/messagePage"
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 text-black hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z" />
                      </svg>
                      <span className="font-medium">Messages</span>
                    </Link>

                    <Link
                      to="/accountsettings"
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 text-black hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6" />
                      </svg>
                      <span className="font-medium">Settings</span>
                    </Link>
                  </>
                )}
              </>
            ) : (
              /* Area Submenu */
              <>
                {/* Back Button */}
                <button
                  onClick={handleBackClick}
                  className="w-full flex items-center space-x-3 text-black hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors mb-4"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back</span>
                </button>

                {/* Submenu Title */}
                <div className="px-3 py-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Select Area</h3>
                </div>

                {/* Location List */}
                {locations.map((location, index) => (
                  <Link
                    key={index}
                    to="/selected_service"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 text-black hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
                  >
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{location}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Bottom Section */}
          {!showAreaSubmenu && (
            <div className="mt-4">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    handleLinkClick();
                  }}
                  className="btn w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <LogOut size={18} color="white"/>
                  Logout
                </button>
              ) : (
                <Link
                  to="/signin"
                  onClick={handleLinkClick}
                  className="btn w-full bg-orange-600 text-white py-3 rounded-lg hover:text-orange-600 hover:border-2 hover:border-orange-600 hover:bg-transparent transition-colors font-medium"
                >
                  Sign-In
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;