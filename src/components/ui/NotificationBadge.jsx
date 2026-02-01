import React from "react";
import { motion } from "framer-motion";

export const NotificationBadge = ({ count = 0, className = "" }) => {
  if (count <= 0) return null;

  return (
    <motion.span
      className={`absolute -top-1 -right-1 min-w-[18px] h-[18px]
        px-1 text-xs font-bold text-white bg-red-600
        rounded-full flex items-center justify-center border-2 border-white
        ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
    >
      {count > 99 ? "99+" : count}
    </motion.span>
  );
};