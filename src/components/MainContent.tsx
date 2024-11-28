"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface MainContentProps {
  activeItem: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeItem }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8"
    >
      <h3 className="text-2xl font-semibold mb-4">Content for {activeItem}</h3>
      <p className="text-textGrey">
        This is where the main content for {activeItem} would go. You can replace this with more specific components based on the active item.
      </p>
    </motion.div>
  );
};

export default MainContent;

