import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import images from "../constants/images";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const LuxuryGallery = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [t,i18n]  = useTranslation()
const navigate =useNavigate()
  const content = [
    {
      id: 1,
      title: t("gallery.1t"),
      subtitle: t("gallery.1s"),
      highlight:t("gallery.1h"),
      description: t("gallery.1d"),
      src: images.g1,
      type: "side"
    },
    {
      id: 2,
      title: t("gallery.2t"),
      subtitle: t("gallery.2s"),
      highlight:t("gallery.2h"),
      description: t("gallery.2d"),
      src: images.g5,
      type: "side"
    },
    {
      id: 3,
      title: t("gallery.3t"),
      subtitle: t("gallery.3s"),
      description: t("gallery.3d"),
      src: images.g7,
      type: "center",
      buttonText:t("gallery.3b")
    }
  ];

  useEffect(() => {
    const sections = sectionsRef.current;

    sections.forEach((section, index) => {
      // Create individual timelines for each element
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          toggleActions: "play reverse play reverse",
          fastScrollEnd: true,
        }
      });

      if (section.querySelector('.side-image')) {
        const image = section.querySelector('.side-image');
        
        // Set initial state
        gsap.set(image, {
          width: '200px',
          height: '200px',
          scale: 1,
          opacity: 0,
          x: '100%'
        });

        // Animate in
        tl.to(image, {
          opacity: 1,
          x: 0,
          duration: 0.3
        })
        .to(image, {
          width: '50vw',
          height: '100vh',
          duration: 0.5
        })
        .to(image.querySelector('img'), {
          scale: 1.1,
          duration: 0.5
        }, "-=0.3");
      }

      if (section.querySelector('.center-image')) {
        const image = section.querySelector('.center-image');
        
        // Set initial state
        gsap.set(image, {
          scale: 1,
          opacity: 0
        });

        // Animate in
        tl.to(image, {
          opacity: 1,
          duration: 0.3
        })
        .to(image.querySelector('img'), {
          scale: 1.1,
          duration: 0.5
        });
      }

      // Animate text elements
      const textElements = section.querySelectorAll('.animate-text');
      gsap.set(textElements, { y: 30, opacity: 0 });
      
      tl.to(textElements, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1
      }, "-=0.3");
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-background dark:bg-darkBackground" ref={containerRef}>
      {content.map((item, index) => (
        <div
          key={item.id}
          ref={el => sectionsRef.current[index] = el}
          className="min-h-screen relative flex items-center justify-center "
        >
          {item.type === 'side' ? (
            <div className="flex w-full h-screen ">
              <div className="side-image  relative overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="overlay absolute inset-0 bg-black/30" />
              </div>

              <div className="w-1/2 flex items-center justify-center px-16 max-md:w-[5px] max-md:text-sm">
                <div className="text-content max-md:text-sm">
                  <h2 className="animate-text text-2xl max-md:text-sm font-light text-darkBackground dark:text-background tracking-[0.3em] mb-4"
                      style={{ fontFamily: 'Didot, serif' }}>
                    {item.title}
                  </h2>
                  
                  <div className="flex flex-col gap-2 mb-8">
                    <h3 className="animate-text text-5xl font-light text-darkBackground dark:text-background tracking-[0.2em]"
                        style={{ fontFamily: 'Didot, serif' }}>
                      {item.subtitle}
                    </h3>
                    {item.highlight && (
                      <span className="animate-text text-5xl font-light text-primary dark:text-darkPrimary tracking-[0.2em]"
                            style={{ fontFamily: 'Didot, serif' }}>
                        {item.highlight}
                      </span>
                    )}
                  </div>
                  
                  <p className="animate-text opacity-40 text-[10px] text-darkBackground dark:text-background tracking-wide leading-relaxed"
                     style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-screen">
              <div className="center-image absolute inset-0">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="overlay absolute inset-0 bg-black/30" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                <h2 className="animate-text text-2xl font-light text-white tracking-[0.3em] mb-4"
                    style={{ fontFamily: 'Didot, serif' }}>
                  {item.title}
                </h2>
                
                <h3 className="animate-text text-6xl font-light text-white tracking-[0.2em] mb-8"
                    style={{ fontFamily: 'Didot, serif' }}>
                  {item.subtitle}
                </h3>
                
                <p className="animate-text text-xl text-gray-200 tracking-wide leading-relaxed max-w-2xl mb-12"
                   style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {item.description}
                </p>

                <button
              onClick={() => navigate("/gallery/moreGallery")}
                 className="animate-text px-8 py-4 border-2 border-white text-white text-lg tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                        style={{ fontFamily: 'Didot, serif' }}>
                  {item.buttonText}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LuxuryGallery;