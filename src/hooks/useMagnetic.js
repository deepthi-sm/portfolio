import { useEffect } from "react";

export default function useMagnetic() {
  useEffect(() => {
    const elements = document.querySelectorAll(".magnetic");

    elements.forEach((el) => {
      const handleMouseMove = (e) => {
        const rect = el.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      };

      const handleMouseLeave = () => {
        el.style.transform = `translate(0px, 0px)`;
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mousemove", () => {});
        el.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);
}