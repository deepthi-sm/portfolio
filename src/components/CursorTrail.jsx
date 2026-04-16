import { useEffect } from "react";

export default function CursorTrail() {
  useEffect(() => {
    const dots = [];
    const total = 8;

    for (let i = 0; i < total; i++) {
      const dot = document.createElement("div");
      dot.style.position = "fixed";
      dot.style.width = "4px";
      dot.style.height = "4px";
      dot.style.background = "#22c55e";
      dot.style.borderRadius = "50%";
      dot.style.pointerEvents = "none";
      dot.style.zIndex = "9999";
      document.body.appendChild(dot);

      dots.push({ el: dot, x: 0, y: 0 });
    }

    let mouse = { x: 0, y: 0 };

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    document.addEventListener("mousemove", move);

    const animate = () => {
      let x = mouse.x;
      let y = mouse.y;

      dots.forEach((dot, i) => {
        dot.x += (x - dot.x) * 0.2;
        dot.y += (y - dot.y) * 0.2;

        dot.el.style.left = dot.x + "px";
        dot.el.style.top = dot.y + "px";
        dot.el.style.opacity = 1 - i / total;

        x = dot.x;
        y = dot.y;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", move);
      dots.forEach(d => d.el.remove());
    };
  }, []);

  return null;
}