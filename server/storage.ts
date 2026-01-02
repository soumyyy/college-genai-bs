
import { users, tasks, type User, type InsertUser, type Task, type InsertTask } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Task methods
  getTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tasks: Map<number, Task>;
  private taskIdCounter: number;

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
    this.taskIdCounter = 1;

    this.seedTasks();
  }

  private seedTasks() {
    const seedData: InsertTask[] = [
      {
        taskNumber: "Task 1",
        title: "Application Mapping",
        description: "Identify and map at least five real-world applications of Generative AI.",
        content: [
          {
            category: "Healthcare",
            use_case: "Drug Discovery & Protein Folding",
            model: "AlphaFold (Google DeepMind) / DiffDock",
            impact: "Reduces drug development time from years to months; enables personalized medicine."
          },
          {
            category: "Software Development",
            use_case: "Automated Code Generation & Refactoring",
            model: "GitHub Copilot (OpenAI Codex)",
            impact: "Boosts developer productivity by 55%; democratizes coding for non-technical users."
          },
          {
            category: "Creative Arts",
            use_case: "High-Fidelity Image & Asset Generation",
            model: "Midjourney / Stable Diffusion / DALL-E 3",
            impact: "Revolutionizes digital art and marketing; raises complex copyright and displacement issues."
          },
          {
            category: "Education",
            use_case: "Personalized Tutoring & Content Simplification",
            model: "GPT-4 / Khanmigo",
            impact: "Provides 24/7 adaptive learning support; helps bridge educational gaps globally."
          },
          {
            category: "Customer Service",
            use_case: "Autonomous Multilingual Support Agents",
            model: "Claude 3 / GPT-4o",
            impact: "Offers instant, empathetic support in 100+ languages; significantly lowers operational costs."
          }
        ]
      },
      {
        taskNumber: "Task 2",
        title: "Foundation Model Timeline",
        description: "A timeline tracing major foundation models and their breakthroughs.",
        content: [
          {
            year: "2018",
            model: "BERT (Google)",
            feature: "Bidirectional Encoding",
            breakthrough: "Introduced deep bidirectional context, significantly improving search and understanding."
          },
          {
            year: "2019",
            model: "GPT-2 (OpenAI)",
            feature: "Zero-shot capabilities",
            breakthrough: "Showed that scaling parameters leads to impressive text generation without task-specific training."
          },
          {
            year: "2020",
            model: "GPT-3 (OpenAI)",
            feature: "Few-shot learning",
            breakthrough: "Established the paradigm of in-context learning through massive scale (175B parameters)."
          },
          {
            year: "2021",
            model: "CLIP / DALL-E (OpenAI)",
            feature: "Multimodal connectivity",
            breakthrough: "Proved AI could effectively link text descriptions with visual concepts."
          },
          {
            year: "2022",
            model: "PaLM (Google) / Stable Diffusion",
            feature: "Chain-of-thought / Open Weights",
            breakthrough: "PaLM showed logical reasoning; Stable Diffusion democratized high-end image generation."
          },
          {
            year: "2023",
            model: "GPT-4 (OpenAI) / Gemini (Google)",
            feature: "Advanced Multimodality",
            breakthrough: "Reached human-level performance on professional benchmarks; integrated native vision/audio."
          }
        ]
      },
      {
        taskNumber: "Task 3",
        title: "Platform Exploration",
        description: "Hands-on results from exploring foundation models via interactive platforms.",
        content: {
          experiments: [
            {
              platform: "OpenAI Playground",
              task: "Story Generation",
              prompt: "Generate a story about a sentient clock.",
              result: "The clock didn't just tick; it remembered. It had watched three generations of the Miller family grow. When the house fell silent at night, it would occasionally skip a second, just to see if the world would notice. It never did, until the youngest Miller whispered, 'I saw that.'"
            },
            {
              platform: "Google MakerSuite",
              task: "Summarization",
              input: "Detailed research on Climate Change mitigation strategies...",
              result: "The research emphasizes three pillars: rapid decarbonization of the energy sector, massive investment in carbon capture technologies, and international policy alignment to meet 1.5C targets."
            },
            {
              platform: "Hugging Face Spaces",
              task: "Bullet-to-Paragraph",
              input: "• AI for good • Ethics • Safety • Alignment",
              result: "The pursuit of 'AI for Good' necessitates a rigorous framework centered on ethics and safety. To ensure beneficial outcomes, researchers focus on the critical challenge of alignment—mapping AI objectives directly to human values."
            }
          ]
        }
      },
      {
        taskNumber: "Task 4",
        title: "Literature Review & Analysis",
        description: "Summary and critical analysis based on Stanford CRFM and OpenAI literature.",
        content: {
          summaries: [
            {
              title: "What Are Foundation Models? (Stanford)",
              summary: "Stanford researchers define foundation models as large-scale models trained on broad data that can be adapted to a wide range of downstream tasks. They represent a paradigm shift from task-specific AI to general-purpose, adaptable systems."
            },
            {
              title: "The Age of Generative AI (OpenAI)",
              summary: "This article discusses the transformative potential of GenAI across industries, highlighting how AI is moving from a tool for prediction to a tool for creation, fundamentally altering the nature of cognitive labor."
            }
          ],
          q_and_a: [
            {
              question: "What makes a foundation model different from a traditional NLP model?",
              answer: "Scale and Adaptability. Traditional models were specialized (e.g., just for translation). Foundation models are massive, pre-trained on diverse data, and can perform hundreds of tasks with minimal fine-tuning, often displaying 'emergent' abilities like reasoning."
            },
            {
              question: "Where do you see GenAI impacting your discipline (AI/Software Engineering)?",
              answer: "It transforms the development lifecycle. Engineers now act more as 'Architects' and 'Reviewers' rather than syntax-writers. It automates documentation, unit testing, and bug detection, allowing focus on higher-level system design."
            },
            {
              question: "What ethical or societal concerns arise?",
              answer: "Primary concerns include Data Privacy (training on sensitive data), Misinformation (deepfakes), Bias (algorithmic prejudice), and Economic Displacement (automation of professional roles)."
            }
          ],
          conclusion: "Generative AI and Foundation Models represent the most significant leap in computing history. By understanding their evolution and ethical constraints, we can harness their power to solve complex global challenges while mitigating risks to society."
        }
      }
    ];

    seedData.forEach(task => {
      const id = this.taskIdCounter++;
      this.tasks.set(id, { ...task, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = (this.users.size + 1).toString();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }
}

export const storage = new MemStorage();
