"use client";
import { useEffect, useRef, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  stagger?: boolean;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  direction = "up",
  stagger = false,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add("animated");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const directionClass =
    direction === "left"
      ? "animate-on-scroll-left"
      : direction === "right"
      ? "animate-on-scroll-right"
      : "animate-on-scroll";

  const staggerClass = stagger ? "stagger-children" : "";

  return (
    <div ref={ref} className={`${directionClass} ${staggerClass} ${className}`}>
      {children}
    </div>
  );
}
