//1. Add a ref for the target-page function component:
// const targetContainerRef = useRef(null);
//2. Add the ref to your target div:
// <div ref={targetContainerRef} className="....">....</div>
//3. Import and use the BackToBottom component, passing the ref:
// <BackToBottom targetContainerRef={targetContainerRef} targetEndRef={targetEndRef} />


import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function BackToBottom({ messagesContainerRef, messagesEndRef }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = messagesContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      
      // Show button when user scrolls up more than 200px from bottom
      setIsVisible(distanceFromBottom > 200);
    };

    container.addEventListener('scroll', handleScroll);
    
    // Check initial state
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [messagesContainerRef]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <button
  onClick={scrollToBottom}
  className="fixed bottom-28 left-1/2 p-2 rounded-full z-40 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600
          text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)]
    
    backdrop-blur-md 
    hover:shadow-[0_6px_25px_rgba(0,0,0,0.35)]
    hover:scale-80 
    hover:brightness-110

    transition-all duration-200 hover:translate-y-1 group
  "
  aria-label="Scroll to bottom"
>
  <ArrowDown size={20} className="transition-transform duration-200"/>
</button>

      )}
    </>
  );
}