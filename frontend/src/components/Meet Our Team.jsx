import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { FaSmile, FaHandshake, FaHeadset, FaLock } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function OurTame() {
  const introRef = useRef(null);
  const cardRefs = useRef([]);
  const para = useRef(null);
  const Mode = useSelector((state) => state.lightdark.mode);

  useEffect(() => {
    if (Mode === "light") {
      document.documentElement.classList.remove("dark");
    }
    if (Mode === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [Mode]);

  useEffect(() => {
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
    gsap.fromTo(
      para.current,
      { opacity: 0, y: -5 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: para.current,
          start: "top 90%",
          end: "bottom 30%",
          scrub: true,
        },
      }
    );

    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.4, // Delay for staggered effect
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (

<section>
        <div className="team-section mt-10">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <img
                src="/images/team1.jpg"
                alt="Team member"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h4 className="font-bold">John Doe</h4>
              <p>Founder & CEO</p>
            </div>
            <div className="text-center">
              <img
                src="/images/team2.jpg"
                alt="Team member"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h4 className="font-bold">Jane Smith</h4>
              <p>Head of Operations</p>
            </div>
            <div className="text-center">
              <img
                src="/images/team3.jpg"
                alt="Team member"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h4 className="font-bold">Mike Johnson</h4>
              <p>Customer Support Lead</p>
            </div>
          </div>
        </div>

        <div className="stats-section mt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <FaSmile className="text-yellow-500 text-4xl mx-auto mb-2" />
              <h3 className="text-2xl font-bold">10,000+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <FaHandshake className="text-blue-500 text-4xl mx-auto mb-2" />
              <h3 className="text-2xl font-bold">50+</h3>
              <p>Brand Partners</p>
            </div>
            <div className="stat-item">
              <FaHeadset className="text-green-500 text-4xl mx-auto mb-2" />
              <h3 className="text-2xl font-bold">24/7</h3>
              <p>Customer Support</p>
            </div>
            <div className="stat-item">
              <FaLock className="text-red-500 text-4xl mx-auto mb-2" />
              <h3 className="text-2xl font-bold">100%</h3>
              <p>Secure Payments</p>
            </div>
          </div>
        </div>
    
    </section>
  );
}