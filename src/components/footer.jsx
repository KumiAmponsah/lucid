import React from "react";
import downloadBtn_1 from "../assets/download.png";
import downloadBtn_2 from "../assets/web-189884714.jpg";
import Logo2 from "../assets/Lucid-white.png";
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaThreads
} from 'react-icons/fa6'
export default function Footer () {
    return(
        <>
        <footer className="footer bg-black text-white border-gray-200 border-b px-10 py-4">
            <div className="flex items-center justify-between w-full">
                <Link to="/lucid_dev_backup" className="flex items-center">
                        <img
                          src={Logo2}
                          alt="Lucid Logo"
                          className="h-20 w-20 object-cover"
                        />
                </Link>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                      <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">
                        <FaXTwitter size={24} className="fill-current hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors"/>
                      </Link>
                      <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">
                        <FaYoutube size={24} className="fill-current hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors"/>
                      </Link>
                      <Link to="/lucid_dev_backup">
                        <FaFacebook size={24} className="fill-current hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors"/>
                      </Link>
                      <Link to="/lucid_dev_backup">
                        <FaInstagram size={24} className="fill-current hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors"/>
                      </Link>
                      <Link to="/lucid_dev_backup">
                        <FaThreads size={24} className="fill-current hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors"/>
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
            <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Pricing</Link>
            <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">How it works</Link>
            <Link to="/Service" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Services</Link>
            <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Safety</Link>
          </nav>
          <nav className="mx-4 p-2">
            <h6 className="mb-1 uppercase font-semibold text-white">Company</h6>
            <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">About us</Link>
            <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Contact</Link>
            <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Jobs</Link>
            <Link to="/userProfile" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">User Account profile</Link>
            <Link to="/clientsignprofile" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">client Account profile</Link>
          </nav>
          <nav className="mx-4 p-2">
            <h6 className="mb-1 uppercase font-semibold text-white">Legal</h6>
            <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Terms of use</Link>
            <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Privacy policy</Link>
            <Link to="/lucid_dev_backup" className="hover:text-orange-600 hover: opacity-80 cursor-pointer transition-colors">Cookie policy</Link>
            <div className="mt-12">
              <button className="btn border-2 border-white lg:w-28 m-t-4 mb-4 mr-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-orange-600">
                      <Link to="/lucid_dev_backup">
                        <img
                          src={downloadBtn_1}
                          alt="app store download button"
                          className="h-20 w-24 object-contain"
                        />
                      </Link></button>
              <button className="btn border-2 border-white lg:w-28 m-t-4 mb-4 mr-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-orange-600">
                     <Link to="/lucid_dev_backup">
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
            <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
          </div>
        </footer>
        </>
    );
}