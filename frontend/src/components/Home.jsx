import React, { useState, useEffect, useRef, useCallback } from "react";
import images from "../constants/images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import RestaurantLoader from "./Loader";

gsap.registerPlugin(ScrollTrigger);
const totalVideos = 3;

const Home = () => {
  const Mode = useSelector((state) => state.lightdark.mode);
  const Screensize = useSelector((state) => state.lightdark.screensize);
  const buttonRef = useRef(null);
  const [t] = useTranslation();

  const [curIndex, setCurIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(new Map());
  const [loadingProgress, setLoadingProgress] = useState(0);

  const nextVidRef = useRef(null);
  const videoRefs = useRef(new Map());
  const nextIndex = (curIndex % totalVideos) + 1;

  // Preload all videos on mount
  useEffect(() => {
    const preloadVideos = async () => {
      const videoPromises = [];

      for (let i = 1; i <= totalVideos; i++) {
        const video = document.createElement("video");
        video.src = getSrc(i);
        video.muted = true;

        const promise = new Promise((resolve) => {
          let progress = 0;

          video.addEventListener("loadedmetadata", () => {
            progress = 20;
            updateProgress(i, progress);
          });

          video.addEventListener("canplay", () => {
            progress = 60;
            updateProgress(i, progress);
          });

          video.addEventListener("canplaythrough", () => {
            progress = 100;
            updateProgress(i, progress);
            resolve();
          });

          video.addEventListener("error", () => {
            console.error(`Error loading video ${i}`);
            resolve();
          });
        });

        videoPromises.push(promise);
        videoRefs.current.set(i, video);
      }

      await Promise.all(videoPromises);
    };

    preloadVideos();

    return () => {
      videoRefs.current.forEach((video) => {
        video.remove();
      });
    };
  }, []);

  const updateProgress = (videoIndex, progress) => {
    setLoadedVideos((prev) => new Map(prev).set(videoIndex, progress));
  };

  // Calculate total loading progress
  useEffect(() => {
    if (loadedVideos.size > 0) {
      const totalProgress = Array.from(loadedVideos.values()).reduce(
        (sum, progress) => sum + progress,
        0
      );
      const averageProgress = (totalProgress / (totalVideos * 100)) * 100;
      setLoadingProgress(averageProgress);
    }
  }, [loadedVideos]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
  }, []);

  const [curHeaderText, setHeaderText] = useState(t("header.t1"));

  // useEffect(() => {
  //   setHeaderText(t("header.t1"));
  //   if (isLoading) {
  //     document.body.style.overflow = "hidden";
  //   }
  // }, [t("header.t1"), isLoading]);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      backgroundColor: "transparent",
      color: "#fff",
      scale: 0.9,
      rotationX: 3,
      skewX: 5,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      backgroundColor: "#4A90E2",
      color: "#fff",
      scale: 1,
      rotation: 0,
      skewX: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const getSrc = (i) => `./videos/${i}.mp4`;

  const handleMiniVdClick = useCallback(() => {
    setHasClicked(true);
    setCurIndex(nextIndex);
    setHeaderText(getHeaderText(nextIndex));
  }, [nextIndex]);

  const getHeaderText = (index) => {
    const texts = [
      t("header.t1"),
      t("header.t2"),
      t("header.t3"),
      t("header.t4"),
    ];
    return texts[index - 1] || texts[0];
  };

  // GSAP Animations
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.fromTo(
          "#textt",
          { opacity: 0, y: 20 },
          { duration: 2.5, ease: "power1.inOut", opacity: 1, y: 0 }
        );
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVidRef.current?.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
        gsap.to("#next-video-bg", {
          opacity: 0,
          duration: 11.5,
          ease: "power1.inOut",
        });
        gsap.from(".text", {
          y: 100,
          stagger: { each: 0.09 },
        });
        gsap.fromTo(
          "#btnn",
          { opacity: 0, y: 0 },
          { duration: 3, delay: 1, ease: "power1.inOut", opacity: 1 }
        );
      }
    },
    { dependencies: [curIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
      borderRadius: "0 0 20% 20%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <>
      {/* {isLoading && (
        <RestaurantLoader
          actualProgress={loadingProgress}
          onLoadingComplete={handleLoadingComplete}
        />
      )} */}

      <div
        id="home"
        style={{
          backgroundImage: `url(${
            Screensize.isMobile
              ? Mode === "light"
                ? images.welcp
                : images.darkwelcp
              : Mode === "light"
              ? images.welc
              : images.darkwelc
          })`,
          overflowX: "hidden",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="relative h-[100vh] w-[100vw] overflow-y-auto"
      >
        <div
          id="video-frame"
          className="relative z-10 h-[100vh] w-[100vw] overflow-hidden bg-black"
        >
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-auto rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 overflow-hidden transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVidRef}
                src={getSrc(nextIndex)}
                loop
                muted
                loading="lazy"
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
              />
            </div>
          </div>

          <video
            ref={nextVidRef}
            src={getSrc(curIndex)}
            loop
            muted
            loading="lazy"
            id="next-video"
            className="absolute-center invisible absolute size-64 z-20 object-cover object-center"
          />

          <video
            src={getSrc(curIndex === totalVideos ? 1 : curIndex)}
            loop
            autoPlay
            muted
            loading="lazy"
            id="next-video-bg"
            className="absolute left-0 top-0 size-full object-cover object-center"
          />

          <div className="absolute left-[40vw] top-[40vh] z-40 max-md:top-[310px] ">
            <img src={images.mause} width="200px" alt="Mouse" loading="lazy" />
          </div>

          <h1
            id="textt"
            className="headtext__cormorant_header text-[100px] font-bold sticky z-40 top-[200px]  left-7 max-md:text-[70px]"
          >
            {t("header.6")}
          </h1>
          <button
            id="btnn"
            ref={buttonRef}
            className="ml-8 md:hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => (location.href = "#book")}
            style={{
              backgroundColor: "#4A90E2",
              zIndex: 1000,
              position: "absolute",
              bottom: "110px",
              color: "#fff",
              height: "30px",
              border: "2px solid #333",
              padding: "0px 7px",
              fontSize: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              fontFamily: "cursive",
              transition: "all 0.3s ease",
            }}
            aria-label="Book Now"
          >
            {t("header.5")}
          </button>
          <div className="wrapper  ">
            <div className="words mb-4 absolute top-[330px] max-md:top-[480px]  h-[60px] w-full overflow-hidden left-7 z-40 flex">
              {curHeaderText.split("").map((letter, index) => (
                <Letter key={index} letter={letter} />
              ))}

              <button
                id="btnn"
                ref={buttonRef}
                className="ml-8 max-md:hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => (location.href = "#book")}
                style={{
                  backgroundColor: "#4A90E2",
                  zIndex: 1000,
                  position: "relative",
                  color: "#fff",
                  height: "30px",
                  border: "2px solid #333",
                  padding: "0px 7px",
                  fontSize: "10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  fontFamily: "cursive",
                  transition: "all 0.3s ease",
                }}
                aria-label="Book Now"
              >
                {t("header.5")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Letter = React.memo(({ letter }) => (
  <div
    className="text font-mono text-[20px] max-md:text-[13px] "
    style={{
      color: "#E0E0E0",
    }}
  >
    {letter === " " ? "\u00A0" : letter}
  </div>
));

export default Home;