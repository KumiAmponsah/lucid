import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaThreads
} from 'react-icons/fa6';
import downloadBtn_1 from "../assets/download.png";
import downloadBtn_2 from "../assets/web-189884714.jpg";
import Logo2 from "../assets/Lucid-white.png";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Memoized Social Icon Component
const SocialIcon = memo(({ Icon, to, ariaLabel }) => (
  <motion.div
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <Link 
      to={to} 
      className="hover:text-orange-600 transition-colors"
      aria-label={ariaLabel}
    >
      <Icon size={24} className="fill-current" />
    </Link>
  </motion.div>
));

// Memoized Footer Link Component
const FooterLink = memo(({ to, children, className = "" }) => (
  <motion.div
    whileHover={{ x: 5 }}
    transition={{ duration: 0.2 }}
  >
    <Link 
      to={to} 
      className={`hover:text-orange-600 transition-colors block ${className}`}
    >
      {children}
    </Link>
  </motion.div>
));

// Memoized Download Button Component
const DownloadButton = memo(({ src, alt, to }) => (
  <motion.button 
    className="btn border-2 border-white lg:w-28 m-t-4 mb-4 mr-4"
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 0 20px rgba(251, 146, 60, 0.6)"
    }}
    whileTap={{ scale: 0.95 }}
  >
    <Link to={to}>
      <img
        src={src}
        alt={alt}
        className="h-20 w-24 object-contain"
        loading="lazy"
      />
    </Link>
  </motion.button>
));

// Data Constants
const SOCIAL_LINKS = [
  { Icon: FaXTwitter, to: "/lucid", label: "Twitter" },
  { Icon: FaYoutube, to: "/lucid", label: "YouTube" },
  { Icon: FaFacebook, to: "/lucid", label: "Facebook" },
  { Icon: FaInstagram, to: "/lucid", label: "Instagram" },
  { Icon: FaThreads, to: "/lucid", label: "Threads" }
];

const QUICK_LINKS = [
  { to: "/lucid", label: "Pricing" },
  { to: "/lucid", label: "How it works" },
  { to: "/Service", label: "Services" },
  { to: "/lucid", label: "Safety" },
  { to: "/client_dashboard", label: "client dashboard" }
];

const COMPANY_LINKS = [
  { to: "/about", label: "About us" },
  { to: "/lucid", label: "Contact" },
  { to: "/lucid", label: "Jobs" },
  { to: "/client_bookings", label: "client bookings" },
  { to: "/client_account", label: "Client Account profile" }
];

const LEGAL_LINKS = [
  { to: "/lucid", label: "Terms of use" },
  { to: "/lucid", label: "Privacy policy" },
  { to: "/lucid", label: "Cookie policy" }
];

const DOWNLOAD_BUTTONS = [
  { src: downloadBtn_1, alt: "App Store download button", to: "/lucid" },
  { src: downloadBtn_2, alt: "Play Store download button", to: "/lucid" }
];

// Memoized Footer Section Component
const FooterSection = memo(({ title, children }) => (
  <motion.nav 
    className="mx-4 p-2"
    variants={fadeInUp}
  >
    <h6 className="mb-1 uppercase font-semibold text-xl text-white">{title}</h6>
    <div className="flex flex-col gap-2">
      {children}
    </div>
  </motion.nav>
));

const Footer = () => {
  return (
    <>
      {/* Top Footer - Logo and Social Links */}
      <footer className="footer bg-black text-white border-gray-200 border-b px-10 py-4">
        <motion.div 
          className="flex items-center justify-between w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Link to="/lucid" className="flex items-center">
              <motion.img
                src={Logo2}
                alt="Lucid Logo"
                className="h-20 w-20 object-cover"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
            </Link>
          </motion.div>
          
          <motion.nav variants={fadeInUp}>
            <div className="grid grid-flow-col gap-4">
              {SOCIAL_LINKS.map((social, index) => (
                <SocialIcon
                  key={index}
                  Icon={social.Icon}
                  to={social.to}
                  ariaLabel={social.label}
                />
              ))}
            </div>
          </motion.nav>
        </motion.div>
      </footer>

      {/* Main Footer Content */}
      <footer className="footer sm:footer-horizontal bg-black text-white p-10">
        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {/* Company Info */}
          <FooterSection title="Lucid Ltd">
            <p className="max-w-60 text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            {QUICK_LINKS.map((link, index) => (
              <FooterLink key={index} to={link.to}>
                {link.label}
              </FooterLink>
            ))}
          </FooterSection>

          {/* Company Links */}
          <FooterSection title="Company">
            {COMPANY_LINKS.map((link, index) => (
              <FooterLink key={index} to={link.to}>
                {link.label}
              </FooterLink>
            ))}
          </FooterSection>

          {/* Legal & Downloads */}
          <FooterSection title="Legal">
            {LEGAL_LINKS.map((link, index) => (
              <FooterLink key={index} to={link.to}>
                {link.label}
              </FooterLink>
            ))}
            
            <motion.div 
              className="mt-8"
              variants={fadeInUp}
            >
              {DOWNLOAD_BUTTONS.map((button, index) => (
                <DownloadButton
                  key={index}
                  src={button.src}
                  alt={button.alt}
                  to={button.to}
                />
              ))}
            </motion.div>
          </FooterSection>
        </motion.div>
      </footer>

      {/* Bottom Footer - Copyright */}
      <footer className="footer bg-black text-white border-gray-200 flex flex-col items-center justify-center text-center border-t px-10">
        <motion.div 
          className="items-center text-center my-2 px-2 py-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} Lucid Ltd - All rights reserved
          </p>
        </motion.div>
      </footer>
    </>
  );
};

export default memo(Footer);