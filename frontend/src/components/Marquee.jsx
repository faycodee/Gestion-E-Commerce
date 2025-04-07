import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const MarqueeComponent = ({r}) => {
  const marqueeRef = useRef(null);
  const content = [
    "Order Now! 🍔",
    "Delicious Food Available! 🔥",
    "Visit Our Restaurant! 🗺️",
    "Drinks Available! 🍺"
  ];
  
  useEffect(() => {
    const marquee = marqueeRef.current;
    
    gsap.to(marquee, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: marquee.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  }, []);

  // Duplicate content for seamless loop
  const duplicatedContent = [...content, ...content];

  return (
    <div className="relative w-screen overflow-hidden mt-20 py-8 transform  bg-darkBackground dark:bg-background " style={{rotate:r}}>
      {/* Gradient overlays for professional look */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-darkBackground to-transparent z-10 dark:from-background" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-darkBackground to-transparent z-10 dark:from-background" />
      
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ width: 'max-content' }}
      >
        {duplicatedContent.map((text, index) => (
          <div
            key={index}
            className="flex items-center mx-8 text-2xl font-bold tracking-wider text-background dark:text-darkBackground  uppercase md:text-4xl hover:text-primary transition-colors duration-300"
          >
            <span>{text}</span>
            {index < duplicatedContent.length - 1 && (
              <span className="mx-8 text-3xl">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeComponent;