import { useState } from "react";
import Logo from "../assets/Lucid.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar bg-white">
        {/* Left section */}
        <div className="navbar-start">
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              alt="Lucid Logo"
              className="h-14 w-auto object-contain"
            />
          </a>
        </div>

        {/* Right section */}
        <div className="navbar-end">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="m7 10l5 5l5-5z" />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow-sm"
              >
                <li>
                  <a className="border-b-2 border-transparent hover:border-orange-600 hover:text-orange-600">
                    Item 1
                  </a>
                </li>
                <li>
                  <a className="border-b-2 border-transparent hover:border-orange-600 hover:text-orange-600">
                    Item 2
                  </a>
                </li>
              </ul>
            </div>

            <a
              role="tab"
              className="tab px-4 py-2 text-black border-b-2 border-transparent hover:border-orange-600 transition-colors cursor-pointer"
            >
              Join as a worker
            </a>
            <a
              role="tab"
              className="tab px-4 py-2 text-black border-b-2 border-transparent hover:border-orange-600 transition-colors cursor-pointer"
            >
              Services
            </a>
            <a
              role="tab"
              className="tab tab-active px-4 py-2 text-black border-b-2 border-transparent hover:border-orange-600 transition-colors cursor-pointer"
            >
              About
            </a>
          </div>

          {/* Sign-In button (hidden on mobile) */}
          <a className="btn bg-orange-600 text-white ml-4 hidden lg:flex items-center justify-center border-2 border-transparent hover:border-orange-600 hover:bg-white hover:text-orange-600">
            Sign-In
          </a>

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
          <div className="mb-8">
            <img
              src={Logo}
              alt="Lucid Logo"
              className="h-10 w-10 object-cover"
            />
          </div>

          {/* Menu Items */}
          <nav className="space-y-4 flex-1">
            <a
              href="#"
              className="flex items-center space-x-3 text-black hover:text-orange-600 hover:bg-orange-50 p-3 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
              </svg>
              <span className="font-medium">Area</span>
            </a>

            <a
              href="#"
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
            </a>

            <a
              href="#"
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
            </a>

            <a
              href="#"
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
              <span className="font-medium">Contact</span>
            </a>

            <a
              href="#"
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
            </a>
          </nav>

          {/* Bottom Section */}
          <div className="mt-6">
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:text-orange-600 hover:border-2 hover:border-orange-600 hover:bg-transparent transition-colors font-medium">
              Sign-In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;