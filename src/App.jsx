import React from "react";
import Card from "./Card";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { frontendCategories } from "./data";
import { Github, GlobeLock, Linkedin, Twitter } from "lucide-react";

// import ReactLenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 3;
      const positions = [14, 38, 62, 86];
      const rotations = [-15, -7.5, 7.5, 15];

      // pin the cards section
      ScrollTrigger.create({
        trigger: containerRef.current.querySelector(".cards"),
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
      });

      // Spreading the card across the screen

      cards.forEach((card, index) => {
        gsap.to(card, {
          left: `${positions[index]}%`,
          rotation: `${rotations[index]}`,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current.querySelector(".cards"),
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: 0.5,
            id: `spread-${index}`,
          },
        });
      });

      // flip the card and reset rotation with stagger

      cards.forEach((card, index) => {
        const frontCard = card.querySelector(".flip-card-front");
        const backCard = card.querySelector(".flip-card-back");

        const staggerOffset = index * 0.05;
        const startOffset = 1 / 3 + staggerOffset;
        const endOffset = 2 / 3 + staggerOffset;

        ScrollTrigger.create({
          trigger: containerRef.current.querySelector(".cards"),
          start: "top top",
          end: () => `+=${totalScrollHeight}`,
          scrub: 1,
          id: `rotate-flip-${index}`,
          onUpdate: (update) => {
            const progress = update.progress;
            if (progress >= startOffset && progress <= endOffset) {
              const animationProgress = (progress - startOffset) / (1 / 3);
              const frontRotation = -180 * animationProgress;
              const backRotation = 180 - 180 * animationProgress;
              const cardRotation = rotations[index] * (1 - animationProgress);

              gsap.to(frontCard, {
                rotateY: frontRotation,
                ease: "power1.Out",
              });
              gsap.to(backCard, {
                rotateY: backRotation,
                ease: "power1.Out",
              });
              gsap.to(card, {
                xPercent: -50,
                yPercent: -50,
                rotate: cardRotation,
                ease: "power1.out"
              });
            }
          },
        });
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  }, []) 

  return (
 
      <div className="container" ref={containerRef}>
        <section id="hero">
         <div className="">
          <p className=""></p>
              <h1 className="text-[#242736] text-[40px] md:text-[45px] xl:text-[60px] font-600 font-bold tracking-wider font-['Space_Grotesk']">
                <p className=" text-[#ec5c29] text-[24px] animate-bounce">
                Oyedele Sulaiman
              </p>
                <span className="block ml-40 md:ml-0 xl:ml-40]">Frontend Developer</span>
                <span className="block">& Mobile Developer</span>
              </h1>
              
            </div>
        </section>
        <section className="cards" id="cards">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              id={`card-${index + 1}`}
              frontSrc="/cardImg.png"
              frontAlt="Card Image"
               category={frontendCategories[index]} 
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </section>
        <section id="footer">
          <h1 className="">
            Visit
            <p className="text-[24px]"> My Portfolio & Social Media for more of this content</p> 
            <div className="flex items-center gap-5 justify-center ">
              <a target="_blank" href="https://x.com/sulyman002"  className=" transition-all duration-300 hover:scale-1.4 hover:text-[#ec5c29]">
                <Twitter size={28} />
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/oyedele-sulaiman-a9a677210/" className=" transition-all duration-300 hover:scale-1.4 hover:text-[#ec5c29]">
                <Linkedin size={28} />
              </a>
              <a target="_blank" href="https://github.com/sulyman002" className=" transition-all duration-300 hover:scale-1.4 hover:text-[#ec5c29]">
                <Github size={28} />
              </a>
              <a target="_blank" href="http://sulaimanoyedele.vercel.app/" className=" transition-all duration-300 hover:scale-1.4 hover:text-[#ec5c29]">
                <GlobeLock size={28} />
              </a>
            </div>
          </h1>
          

        </section>
      </div>
  
  );
};

export default App;
