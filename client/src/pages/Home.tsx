import { useRef } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader2, ChevronDown, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ApplicationCard } from "@/components/ApplicationCard";
import { TimelineItem } from "@/components/TimelineItem";
import { ExplorationSection } from "@/components/ExplorationSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { data: tasks, isLoading, error } = useTasks();
  const heroRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Initial Hero Animation
  useGSAP(() => {
    if (isLoading) return;

    const tl = gsap.timeline();
    
    tl.from(".hero-text", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
    })
    .from(".hero-sub", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
    }, "-=0.5")
    .from(".scroll-indicator", {
      opacity: 0,
      y: -10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Background parallax
    gsap.to(".hero-bg", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 200,
      opacity: 0.5,
    });

  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background text-destructive">
        Error loading lab data.
      </div>
    );
  }

  // Helper to find task by number string or id
  const getTask = (num: string) => tasks?.find(t => t.taskNumber === num);
  
  const task1 = getTask("1");
  const task2 = getTask("2");
  const task3 = getTask("3");
  const task4 = getTask("4");

  return (
    <div ref={wrapperRef} className="bg-background min-h-screen selection:bg-primary selection:text-white">
      {/* Decorative noise/texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Hero Section */}
      <section ref={heroRef} className="hero-section relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="hero-bg absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/50 via-background to-background" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />
        
        <div className="max-w-4xl mx-auto text-center z-10">
          <span className="hero-text block text-accent font-serif italic text-xl md:text-2xl mb-6 tracking-wide">
            GenAI Lab Submission
          </span>
          <h1 className="hero-text text-5xl md:text-8xl font-serif font-black text-primary mb-8 leading-tight">
            Exploring the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-wine to-accent">
              Frontier of AI
            </span>
          </h1>
          <div className="hero-sub flex flex-col items-center space-y-2 text-muted-foreground font-medium tracking-wide text-sm md:text-base">
            <p>Submitted by: <span className="text-primary font-bold">Soumya Maheshwari</span></p>
            <p>Roll Number: <span className="text-primary font-bold">R036</span></p>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-8 h-8 text-primary/50" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-48">
        
        {/* TASK 1: APPLICATIONS */}
        {task1 && (
          <section id="task-1">
            <SectionHeading 
              number="01" 
              title={task1.title} 
              subtitle="Generative AI Landscape" 
              align="center" 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(task1.content as any).applications.map((app: any, idx: number) => (
                <ApplicationCard key={idx} app={app} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* TASK 2: TIMELINE */}
        {task2 && (
          <section id="task-2" className="relative">
            <SectionHeading 
              number="02" 
              title={task2.title} 
              subtitle="Evolution of LLMs" 
            />
            
            <div className="relative mt-20">
              {/* Vertical Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent transform -translate-x-1/2" />
              
              <div className="space-y-0">
                {(task2.content as any).events.map((event: any, idx: number) => (
                  <TimelineItem key={idx} event={event} isLeft={idx % 2 === 0} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TASK 3: EXPLORATIONS */}
        {task3 && (
          <section id="task-3">
            <SectionHeading 
              number="03" 
              title={task3.title} 
              subtitle="Hands-on Experiments"
              align="right"
            />
            <ExplorationSection explorations={(task3.content as any).explorations} />
          </section>
        )}

        {/* TASK 4: LIT REVIEW */}
        {task4 && (
          <section id="task-4" className="mb-24">
            <SectionHeading 
              number="04" 
              title={task4.title} 
              subtitle="Theoretical Foundations" 
            />
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="bg-white p-8 rounded-2xl border border-primary/10 shadow-lg sticky top-24">
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">Key Insights</h3>
                <ul className="space-y-4">
                  {(task4.content as any).insights.map((insight: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-foreground/80">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                {(task4.content as any).questions.map((q: any, idx: number) => (
                  <div key={idx} className="group border-b border-primary/10 pb-6 hover:border-primary/30 transition-colors">
                    <h4 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {q.question}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {q.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg width="100%" height="100%">
             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
             </pattern>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Thank You
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-white/60 mb-12 max-w-2xl mx-auto">
            This submission represents a comprehensive exploration into the capabilities, 
            history, and theoretical underpinnings of modern Generative AI systems.
          </p>
          <div className="text-sm text-white/40 font-mono">
            Generated with React, Tailwind CSS & GSAP • {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}
