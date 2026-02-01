import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import downloadBtn_1 from "../assets/download.png";
import downloadBtn_2 from "../assets/web-189884714.jpg";
import DownloadappImage from "../assets/app.jpg";

/* Animations (LOCAL to this component) */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const DownloadSection = memo(() => (
  <section className="w-full relative overflow-hidden my-24">
    <div
      className="relative w-full h-[420px] flex items-center"
      style={{
        backgroundImage: `url(${DownloadappImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          The only app you need to
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          get things done
        </h2>

        <p className="text-white max-w-xl mb-8">
          From custom guides made just for you to effortless project planning —
          it’s all here in one free app.
        </p>

        {/* Download Buttons */}
                  <motion.div 
                    className="flex gap-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={scaleIn}>
                      <Link to="/">
                        <motion.button 
                          className="btn border-2 bg-black border-white hover:border-orange-500 transition-all"
                          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(251, 146, 60, 0.6)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={downloadBtn_1}
                            alt="app store download button"
                            className="h-20 w-24 object-contain"
                          />
                        </motion.button>
                      </Link>
                    </motion.div>
                    <motion.div variants={scaleIn}>
                      <Link to="/">
                        <motion.button 
                          className="btn border-2 bg-black border-white hover:border-orange-500 transition-all"
                          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(251, 146, 60, 0.6)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={downloadBtn_2}
                            alt="playstore download button"
                            className="h-20 w-24 object-contain"
                          />
                        </motion.button>
                      </Link>
                    </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </section>
));
