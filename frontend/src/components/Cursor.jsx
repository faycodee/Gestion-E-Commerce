import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const horizontalLineRef = useRef(null);
  const verticalLineRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    const horizontalLine = horizontalLineRef.current;
    const verticalLine = verticalLineRef.current;
    let isOverDarkBg = false;

    const moveCursor = (e) => {
      gsap.to([cursor, horizontalLine, verticalLine], {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out"
      });
      
      gsap.to(cursorText, {
        x: e.clientX + 5,
        y: e.clientY + 5,
        duration: 0.5,
        ease: "power3.out"
      });
    };

    const handleHover = () => {
      gsap.to(cursor, {
        scale: 4,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to([horizontalLine, verticalLine], {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleHoverOut = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to([horizontalLine, verticalLine], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleBackgroundCheck = (e) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        const isDark = isColorDark(bgColor);
        
        if (isDark !== isOverDarkBg) {
          isOverDarkBg = isDark;
          gsap.to([cursor, horizontalLine, verticalLine], {
            backgroundColor: isDark ? '#ffffff' : '#000000',
            duration: 0.3
          });
          gsap.to(cursorText, {
            color: isDark ? '#ffffff' : '#000000',
            duration: 0.3
          });
        }
      }
    };

    const isColorDark = (color) => {
      const rgb = color.match(/\d+/g);
      if (rgb) {
        const [r, g, b] = rgb;
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness < 128;
      }
      return false;
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', handleBackgroundCheck);

    const titles = document.querySelectorAll('h1, h2, h3, .title');
    titles.forEach(title => {
      title.addEventListener('mouseenter', handleHover);
      title.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleBackgroundCheck);
      titles.forEach(title => {
        title.removeEventListener('mouseenter', handleHover);
        title.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed z-[500] top-0 left-0 w-6 h-6 bg-black rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference "
      />
      <div
        ref={cursorTextRef}
        className="fixed top-0 left-0 text-sm pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50"
      >
        
      </div>
      {/* <div
        ref={horizontalLineRef}
        className="fixed top-0 left-0 w-8 h-0.5 bg-black pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50"
      />
      <div
        ref={verticalLineRef}
        className="fixed top-0 left-0 w-0.5 h-8 bg-black pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50"
      /> */}
    </>
  );
};

export default CustomCursor;