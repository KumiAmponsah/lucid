import React from "react";
import downloadBtn_1 from "../assets/download.png";
import downloadBtn_2 from "../assets/web-189884714.jpg";
import Logo2 from "../assets/Lucid-white.png";
import { Link } from 'react-router-dom';

export default function Footer () {
    return(
        <>
        <footer className="footer bg-black text-white border-gray-200 border-b px-10 py-4">
            <div className="flex items-center justify-between w-full">
                <Link to="/" className="flex items-center">
                        <img
                          src={Logo2}
                          alt="Lucid Logo"
                          className="h-20 w-20 object-cover"
                        />
                </Link>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                      <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="fill-current">
                          <path
                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                      </Link>
                      <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="fill-current">
                          <path
                            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                      </Link>
                      <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="fill-current">
                          <path
                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                      </Link>
                    </div>
                </nav>
            </div>
        </footer>
        <footer className="footer sm:footer-horizontal bg-black text-white p-10">
          <nav className="mx-4 p-2">
            <h6 className="mb-1 uppercase font-semibold text-xl text-white">Lucid Ltd</h6>
            <a className="link link-hover max-w-60">
               Lorem Ipsum is simply dummy
               text of the printing and typesetting
               industry. Lorem Ipsum has been the
               industry's standard dummy text ever
               since the 1500s, when an unknown
               printer took a galley of type and
               scrambled it to make a type
               specimen book.
            </a>
            
          </nav>
          <nav className="mx-4 p-2">
            <h6 className="mb-1 uppercase font-semibold text-white">Quick Links</h6>
            <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Pricing</Link>
            <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">How it works</Link>
            <Link to="/Service" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Services</Link>
            <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Safety</Link>
          </nav>
          <nav className="mx-4 p-2">
            <h6 className="mb-1 uppercase font-semibold text-white">Company</h6>
            <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">About us</Link>
            <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Contact</Link>
            <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Jobs</Link>
            <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Press kit</Link>
          </nav>
          <nav className="mx-4 p-2">
            <h6 className="mb-1 uppercase font-semibold text-white">Legal</h6>
            <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Terms of use</Link>
            <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Privacy policy</Link>
            <Link to="/" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Cookie policy</Link>
            <div className="mt-12">
              <button className="btn border-2 border-white lg:w-28 m-t-4 mb-4 mr-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-orange-600">
                      <Link to="/">
                        <img
                          src={downloadBtn_1}
                          alt="app store download button"
                          className="h-20 w-24 object-contain"
                        />
                      </Link></button>
              <button className="btn border-2 border-white lg:w-28 m-t-4 mb-4 mr-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-orange-600">
                     <Link to="/">
                        <img
                          src={downloadBtn_2}
                          alt="playstore download button"
                          className="h-20 w-24 object-contain"
                        />
                      </Link></button>
            </div>
          </nav>
        </footer>
        <footer className="footer bg-black text-white border-gray-200 flex flex-col items-center justify-center text-center  border-t px-10">
          <div className="items-center text-center my-2 px-2 py-2">
            <p>Copyright © {new Date().getFullYear()} - All right reserved by Lucid Ltd</p>
          </div>
        </footer>
        </>
    );
}