import { useEffect, useRef } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      if (ringRef.current && dotRef.current) {
        ringPos.current.x += (mouse.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (mouse.y - ringPos.current.y) * 0.12;

        dotRef.current.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`;
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouse]);

  useEffect(() => {
    const handleEnter = () => ringRef.current?.classList.add('hovering');
    const handleLeave = () => ringRef.current?.classList.remove('hovering');

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
