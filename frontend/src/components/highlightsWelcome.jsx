import React, { useEffect, useRef, useState } from "react";
import images from "../constants/images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslation } from "react-i18next";
import LuxuryGallery from "./highlights";

gsap.registerPlugin(ScrollTrigger);

const HighlightsWelcome = () => {
  const introRef = useRef(null);
  const [t, i18n] = useTranslation();
  const [categoryy, setCategory] = useState("Steak");

  useGSAP(() => {
    gsap.fromTo(
      introRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        delay: 1,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: true,
        },
        ease: "power1.out",
      }
    );
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  }, []);

  const [loadedImgs, setLoadedImgs] = useState(0);

  const handelLoadedImgs = () => {
    setLoadedImgs((prev) => prev + 1);
  };

  return (
    <main>
      <div
        className="flex-col bg-background dark:bg-darkBackground flex__center pt-8 px-9 min-h-screen w-screen"
        id="gallery"
      >
        <div className="mb-8 m-auto flex flex-col mt-10 justify-center items-center">
          <h1
            ref={introRef}
            className="text-[90px] font-bold mb-[80px] text-primary dark:text-darkPrimary"
            style={{ fontFamily: "Impact, Haettenschweiler" }}
          >
            {t("gallery.1")}.&apos;
          </h1>
        </div>
        <div id="clip" className="h-dvh w-screen">
          <div className="mask-clip-path about-video relative">
            <video
              src="./videos/5.mp4"
              muted
              autoPlay
              loop
              loading="lazy"
              className="absolute left-0 top-0 z-50 size-full object-cover"
              alt="Video of Place Decor"
            ></video>
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(HighlightsWelcome);