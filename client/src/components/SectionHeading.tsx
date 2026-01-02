import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading({ number, title, subtitle, className, align = "left" }: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(numberRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.6")
    .from(lineRef.current, {
      scaleX: 0,
      transformOrigin: align === "center" ? "center" : "left",
      duration: 1,
      ease: "expo.out",
    }, "-=0.6");

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "mb-12 relative z-10", 
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <span 
        ref={numberRef} 
        className="block text-accent font-serif text-lg font-italic mb-2 tracking-widest"
      >
        {number}
      </span>
      <h2 
        ref={titleRef} 
        className="text-4xl md:text-6xl font-serif text-wine font-bold leading-tight"
      >
        {title}
        {subtitle && <span className="block text-2xl md:text-3xl mt-2 text-muted-foreground font-light">{subtitle}</span>}
      </h2>
      <div 
        ref={lineRef} 
        className={cn(
          "h-1 bg-gradient-to-r from-primary to-accent mt-6",
          align === "center" ? "mx-auto w-24" : "w-24"
        )}
      />
    </div>
  );
}
