import React from "react";
import Card from "./Card";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ReactLenis from "@studio-freight/lenis";

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
          }
        })
      });

      // flip the card and reset rotation with stagger

      
    },
    { scope: containerRef }
  );

  return (
    <ReactLenis root>
      <div className="container" ref={containerRef}>
        <section id="hero">
          <h1 className="">
            All you need to know about <br /> ScrollTrigger and flip in GSAP
          </h1>
        </section>
        <section className="cards">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              id={`card-${index + 1}`}
              frontSrc="/vite.svg"
              frontAlt="Card Image"
              backText="Your card details appear here"
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </section>
        <section id="footer">
          <h1 className="">Visit GSAP library lorem and learn more!!!</h1>
        </section>
      </div>
    </ReactLenis>
  );
};

export default App;
