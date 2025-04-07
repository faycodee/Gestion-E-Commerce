import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { ChevronRight, ChevronDown } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const MenuSection = ({ title, items, price, isActive, onToggle }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      gsap.to(contentRef.current, {
        height: "auto",
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isActive]);

  return (
    <div
      ref={sectionRef}
      className="border-b border-darkBackground dark:border-background"
    >
      <button
        onClick={onToggle}
        className="w-full py-4 px-6 flex items-center justify-between transition-colors duration-300"
      >
        <div className="flex items-center gap-4">
          <h2 style={{textAlign:"left"}} className="text-xl font-mono  font-bold text-primary">{title}</h2>
          <span className="text-sm text-primary/40">{price}</span>
        </div>
        {isActive ? (
          <ChevronDown className="w-5 h-5 text-darkBackground dark:text-background " />
        ) : (
          <ChevronRight className="w-5 h-5  text-darkBackground dark:text-background " />
        )}
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden">
        <div className="space-y-3 p-6  bg-darkBackground dark:bg-background">
          {items.map((item, index) => (
            <div
              key={index}
              className="group hover:bg-black/5 p-3 rounded-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-background  dark:text-darkBackground group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-gray-400 text-sm mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RestaurantMenu = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const introRef = useRef();
  const [activeSection, setActiveSection] = useState("starters");

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
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
          // toggleActions: "play none none reverse",
        },
        ease: "power1.out",
      }
    );
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    });

    // Background parallax effect
    gsap.to(".bg-pattern", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  const sections = [
    { id: "starters", items: t("menu.starters", { returnObjects: true }) },
    { id: "salads", items: t("menu.salads", { returnObjects: true }) },
    {
      id: "hotStarters",
      items: t("menu.hotStarters", { returnObjects: true }),
    },
    { id: "pizza", items: t("menu.pizza", { returnObjects: true }) },
    { id: "pasta", items: t("menu.pasta", { returnObjects: true }) },
    {
      id: "traditional",
      items: t("menu.traditional", { returnObjects: true }),
    },
    {
      id: "meatAndPoultry",
      items: t("menu.meatAndPoultry", { returnObjects: true }),
    },
    { id: "fish", items: t("menu.fish", { returnObjects: true }) },
  ].map((section) => ({
    ...section,
    title: t(`menu.sections.${section.id}`),
    price: t(`menu.pricing.${section.id}`),
    items: Object.entries(section.items)
      .filter(([key]) => !["title", "description"].includes(key))
      .map(([_, value]) => ({
        name: typeof value === "string" ? value : value.name,
        description: typeof value === "object" ? value.description : null,
      })),
  }));

  return (
    <div
      id="menu"
      ref={containerRef}
      className="relative min-h-screen max-h-[300vh] bg-background dark:bg-darkBackground overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1
            ref={introRef}
            className="text-[90px] text-center  text-primary dark:text-darkPrimary font-bold mb-[80px]"
            style={{ fontFamily: "Impact, Haettenschweiler" }}
          >
            {" "}
            {t("menu.title")}
          </h1>
        </div>

        <div className="space-y-2">
          {sections.map((section) => (
            <MenuSection
              key={section.id}
              {...section}
              isActive={activeSection === section.id}
              onToggle={() =>
                setActiveSection(
                  activeSection === section.id ? null : section.id
                )
              }
            />
          ))}
        </div>
        {/* Accompaniments footer */}
        <div className="mt-[70px] p-4 bg-black/40 dark:bg-white/40 rounded-lg border border-primary dark:border-darkPrimary">
          <h3 className="text-darkPrimary font-semibold mb-2">
            {t("menu.meatAndPoultry.accompaniments.title")}
          </h3>
          <p className="text-gray-300">
            {t("menu.meatAndPoultry.accompaniments.options")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
