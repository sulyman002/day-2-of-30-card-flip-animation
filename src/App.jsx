import React from "react";
import Card from "./Card";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ReactLenis from "@studio-freight/lenis";

const App = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 3;
      position = [14, 38, 62, 86];
      const rotation = [-15, -7.5, 7.5, 15];


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
        <section id="cards">
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
