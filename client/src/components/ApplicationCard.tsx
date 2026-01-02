import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

interface Application {
  name: string;
  domain: string;
  description: string;
  impact: string;
}

interface ApplicationCardProps {
  app: Application;
  index: number;
}

export function ApplicationCard({ app, index }: ApplicationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 90%",
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.1, // Stagger effect
      ease: "back.out(1.2)",
    });
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef}
      className="group relative bg-white/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 ease-out"
    >
      <div className="absolute top-8 right-8 text-primary/20 group-hover:text-primary transition-colors duration-300">
        <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
      </div>
      
      <span className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-xs font-semibold tracking-wider uppercase mb-4">
        {app.domain}
      </span>
      
      <h3 className="text-2xl font-serif font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
        {app.name}
      </h3>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {app.description}
      </p>
      
      <div className="pt-6 border-t border-primary/10">
        <h4 className="text-sm font-bold text-primary mb-1">Key Impact</h4>
        <p className="text-sm text-foreground/80">{app.impact}</p>
      </div>
    </div>
  );
}
