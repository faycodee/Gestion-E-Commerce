import { useEffect, useRef, useState, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { FaSmile, FaHandshake, FaHeadset, FaLock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import Model from "../../public/Scene";

gsap.registerPlugin(ScrollTrigger);

export default function OverviewSection() {
  const { t } = useTranslation();
  const introRef = useRef(null);
  const statsRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const Mode = useSelector((state) => state.lightdark.mode);
  const [counts, setCounts] = useState({
    customers: 0,
    partners: 0,
  });



  return (
    <section className="min-h-screen py-20 bg-gradient-to-b transition-colors duration-300 bg-background dark:bg-darkBackground">
      <div className="container mx-auto px-4 max-w-6xl">
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
            <Canvas
                  shadows
                  style={{ width: "100%", height: "400px" ,position:"absolute"}} // Adjust height for better visibility
                  camera={{ position: [7, 5, 3], fov: 40 }} // Adjust camera position and field of view
                >
                  {/* Add environment for realistic lighting */}
                  <ambientLight intensity={0.5} />
                  <directionalLight
                    // position={[10, 10, 10]}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                  />
                  <Suspense fallback={null}>
                    <Environment preset="warehouse" />{" "}
                    {/* Adds a realistic environment */}
                    <Model scale={[1, 1, 1]} />{" "}
                    {/* Scale the model for better size */}
                  </Suspense>
                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    maxPolarAngle={Math.PI / 2} // Restrict rotation to prevent flipping
                  />
                </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
