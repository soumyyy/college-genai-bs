import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface ModelEvent {
  year: string;
  model: string;
  description: string;
  params?: string;
}

interface TimelineItemProps {
  event: ModelEvent;
  isLeft: boolean;
}

export function TimelineItem({ event, isLeft }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(dotRef.current, {
      scale: 0,
      duration: 0.5,
      ease: "back.out(2)",
    })
    .from(contentRef.current, {
      x: isLeft ? 50 : -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.3");

  }, { scope: itemRef });

  return (
    <div ref={itemRef} className={`flex w-full mb-12 relative ${isLeft ? 'flex-row-reverse' : ''}`}>
      {/* Spacer for 50% width */}
      <div className="w-1/2" />
      
      {/* Center Line Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div ref={dotRef} className="w-6 h-6 rounded-full bg-background border-4 border-primary z-10 shadow-lg shadow-primary/20" />
      </div>
      
      {/* Content */}
      <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
        <div ref={contentRef} className="bg-white rounded-xl p-6 shadow-lg shadow-black/5 border border-primary/5 hover:border-primary/20 transition-colors duration-300">
          <span className="text-5xl font-serif font-black text-primary/10 absolute top-4 right-6 select-none pointer-events-none">
            {event.year}
          </span>
          
          <h3 className="text-xl font-bold text-primary mb-2 relative z-10">{event.model}</h3>
          <p className="text-sm text-muted-foreground relative z-10 mb-3">{event.description}</p>
          
          {event.params && (
            <span className="inline-block px-2 py-1 bg-secondary rounded text-xs text-primary font-medium">
              {event.params} Parameters
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
