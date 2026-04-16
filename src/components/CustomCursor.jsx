import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      dotRef.current.style.left = `${clientX}px`;
      dotRef.current.style.top = `${clientY}px`;

      ringRef.current.style.left = `${clientX}px`;
      ringRef.current.style.top = `${clientY}px`;
    };

    const addHover = () => {
      ringRef.current.classList.add("cursor-hover");
    };

    const removeHover = () => {
      ringRef.current.classList.remove("cursor-hover");
    };

    document.addEventListener("mousemove", moveCursor);

    const hoverElements = document.querySelectorAll(
      "a, button, .card-glass"
    );

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={ringRef} className="cursor-ring"></div>
    </>
  );
}