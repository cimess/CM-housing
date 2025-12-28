import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GsapFadeIn = ({ children, delay = 0, duration = 1, y = 50, className = "" }) => {
  const el = useRef(null);

  useEffect(() => {
    gsap.fromTo(el.current,
      { opacity: 0, y: y },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el.current,
          start: "top 85%", // Animation starts when top of element hits 85% of viewport height
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [delay, duration, y]);

  return <div ref={el} className={className}>{children}</div>;
};

export const GsapStagger = ({ children, stagger = 0.2, duration = 0.8, y = 30, className = "" }) => {
    const el = useRef(null);

    useEffect(() => {
      const elements = el.current.children;
      gsap.fromTo(elements,
        { opacity: 0, y: y },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          stagger: stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, [stagger, duration, y]);

    return <div ref={el} className={className}>{children}</div>;
  };
