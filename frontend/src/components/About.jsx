import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { FaSmile, FaHandshake, FaHeadset, FaLock } from "react-icons/fa";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function OverviewSection() {
  const { t } = useTranslation();
  const introRef = useRef(null);
  const statsRef = useRef(null);
  const cardRefs = useRef([]);
  const counterRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const Mode = useSelector((state) => state.lightdark.mode);
  const [counts, setCounts] = useState({
    customers: 0,
    partners: 0,
  });

  useEffect(() => {
    // Theme handling
    document.documentElement.classList.toggle("dark", Mode === "dark");
  }, [Mode]);

  useEffect(() => {
    // Intro animation
    gsap.fromTo(
      introRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );
  }, []);

  useEffect(() => {
    // Create timeline for better control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        toggleActions: "restart none none reverse",
      },
    });

    // Counter animations with better control
    let customersVal = { value: 0 };
    let partnersVal = { value: 0 };

    tl.to(customersVal, {
      value: 10000,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        setCounts((prev) => ({
          ...prev,
          customers: Math.round(customersVal.value),
        }));
      },
    }).to(
      partnersVal,
      {
        value: 50,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          setCounts((prev) => ({
            ...prev,
            partners: Math.round(partnersVal.value),
          }));
        },
      },
      "<"
    ); // Start at the same time as customers counter

    // Cleanup function
    return () => {
      if (tl) tl.kill();
    };
  }, []);

  useEffect(() => {
    const textElements = textRef.current.querySelectorAll("p");
    const imageContainer = imageRef.current;

    // Text animation
    gsap.fromTo(
      textElements,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Image animation
    gsap.fromTo(
      imageContainer,
      {
        opacity: 0,
        x: 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageContainer,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="min-h-screen py-20 bg-gradient-to-btransition-colors duration-300 
     bg-background dark:bg-darkBackground ">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Story Section */}

        <div className="mb-8 m-auto flex flex-col mt-10 justify-center items-center">
          <h1
            className="text-[90px] font-bold mb-[80px] text-primary dark:text-darkPrimary"
            style={{ fontFamily: "Impact, Haettenschweiler" }}
          >
            {t("about.1")}.&apos;
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={textRef} className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {t("about.2")}.&apos;
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {t("about.3")}.&apos;
              </p>
            </div>
            <div ref={imageRef} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative p-6 bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <img
                  src="/path-to-your-image.jpg"
                  alt="Our store"
                  className="w-full h-[400px] object-cover rounded-lg shadow-xl hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="stat-item p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FaSmile className="text-6xl mx-auto mb-4 text-yellow-500 animate-bounce" />
              <h3 className="text-3xl font-bold mb-2">
                {counts.customers.toLocaleString()}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("about.4")}.&apos;
              </p>
            </div>
            <div className="stat-item p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FaHandshake className="text-6xl mx-auto mb-4 text-blue-500 animate-pulse" />
              <h3 className="text-3xl font-bold mb-2">
                {counts.partners.toLocaleString()}+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Brand Partners</p>
            </div>
            <div className="stat-item p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FaHeadset className="text-6xl mx-auto mb-4 text-green-500" />
              <h3 className="text-3xl font-bold mb-2">24/7</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("about.5")}.&apos;
              </p>
            </div>
            <div className="stat-item p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FaLock className="text-6xl mx-auto mb-4 text-red-500" />
              <h3 className="text-3xl font-bold mb-2">100%</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("about.6")}.&apos;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
