import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, FileText, Code, Bot } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Exploration {
  title: string;
  type: "story" | "summary" | "code" | "chat";
  input: string;
  output: string;
}

export function ExplorationSection({ explorations }: { explorations: Exploration[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const getIcon = (type: string) => {
    switch (type) {
      case "story": return <Sparkles className="w-5 h-5" />;
      case "summary": return <FileText className="w-5 h-5" />;
      case "code": return <Code className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  useGSAP(() => {
    gsap.from(".exploration-tab", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });
    
    gsap.from(".exploration-content", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="grid md:grid-cols-12 gap-8">
      {/* Tabs / Navigation */}
      <div className="md:col-span-4 flex flex-col space-y-3">
        {explorations.map((exp, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`exploration-tab w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-3 border ${
              activeIdx === idx 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 translate-x-2" 
                : "bg-white text-muted-foreground border-transparent hover:bg-white/80 hover:text-primary"
            }`}
          >
            <div className={activeIdx === idx ? "text-accent" : "text-primary/60"}>
              {getIcon(exp.type)}
            </div>
            <span className="font-semibold">{exp.title}</span>
          </button>
        ))}
      </div>

      {/* Content Display */}
      <div className="md:col-span-8 exploration-content">
        <div className="bg-white rounded-2xl border border-primary/10 shadow-xl overflow-hidden min-h-[400px] flex flex-col">
          <div className="bg-secondary/30 p-4 border-b border-primary/5 flex items-center justify-between">
            <h3 className="font-serif font-bold text-primary flex items-center gap-2">
              {getIcon(explorations[activeIdx].type)}
              {explorations[activeIdx].title}
            </h3>
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Generated Output</span>
          </div>
          
          <div className="p-8 flex-1 overflow-y-auto">
            <div className="mb-6">
              <h4 className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-2">Prompt Input</h4>
              <div className="bg-muted/30 p-4 rounded-lg text-sm text-foreground/80 italic border-l-4 border-accent">
                "{explorations[activeIdx].input}"
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-2">Model Response</h4>
              <div className="prose prose-wine max-w-none text-foreground/90 leading-relaxed font-serif">
                {explorations[activeIdx].output}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
