
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
            category: "Content Creation",
            use_case: "Automated Marketing Copy",
            model: "GPT-4 / Claude 3",
            impact: "Drastically reduces time-to-market for marketing campaigns; raises concerns about content saturation."
          },
          {
            category: "Code Generation",
            use_case: "Intelligent Code Completion",
            model: "GitHub Copilot (Codex)",
            impact: "Increases developer productivity by ~55%; creates legal gray areas regarding open-source licensing."
          },
          {
            category: "Drug Discovery",
            use_case: "Protein Structure Prediction",
            model: "AlphaFold 2",
            impact: "Accelerates biological research and drug development timelines from years to months."
          },
          {
            category: "Image Synthesis",
            use_case: "Stock Photo Generation",
            model: "Midjourney v6 / Stable Diffusion XL",
            impact: "Democratizes high-quality visual creation; threatens livelihoods of traditional stock photographers."
          },
          {
            category: "Voice Synthesis",
            use_case: "Personalized Audiobooks",
            model: "ElevenLabs / Voicebox",
            impact: "Enables scalable voiceovers and accessibility features; heightens risks of deepfake scams."
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
            feature: "Bidirectional Encoder Representations",
            breakthrough: "Revolutionized NLP by understanding context from both left and right sides of a token."
          },
          {
            year: "2019",
            model: "GPT-2 (OpenAI)",
            feature: "1.5B Parameters, Unsupervised Learning",
            breakthrough: "Demonstrated zero-shot task transfer; generated coherent multi-paragraph text."
          },
          {
            year: "2020",
            model: "GPT-3 (OpenAI)",
            feature: "175B Parameters, Few-Shot Learning",
            breakthrough: "Showed that scaling parameters leads to emergent abilities; performed tasks with just a few examples."
          },
          {
            year: "2021",
            model: "DALL-E (OpenAI)",
            feature: "Text-to-Image Generation",
            breakthrough: "Connected semantic concepts in text to visual generation, opening the door for creative AI."
          },
          {
            year: "2022",
            model: "ChatGPT / InstructGPT",
            feature: "RLHF (Reinforcement Learning from Human Feedback)",
            breakthrough: "Aligned models with human intent, making them conversational, safe, and widely usable."
          },
          {
            year: "2023",
            model: "GPT-4 (OpenAI) / LLaMA (Meta)",
            feature: "Multimodality & Open Weights",
            breakthrough: "GPT-4 handled image/text inputs; LLaMA democratized access to powerful LLMs for researchers."
          }
        ]
      },
      {
        taskNumber: "Task 3",
        title: "Platform Exploration",
        description: "Experiments with pre-trained foundation models via no-code interfaces.",
        content: {
          experiments: [
            {
              platform: "OpenAI Playground",
              task: "Prompt Engineering (Story Generation)",
              prompt: "Write a micro-story about a robot who discovers it loves gardening, in the style of Hemingway.",
              result: "The robot knelt in the dirt. It was good dirt. The sun was hot on its metal casing. It planted the seed. It waited. Growth was slow. But it was honest work. The robot felt something like peace."
            },
            {
              platform: "Hugging Face Spaces",
              task: "Summarization (BART)",
              input: "Research abstract on Quantum Computing...",
              result: "Quantum computing leverages superposition and entanglement to solve problems intractable for classical computers, promising breakthroughs in cryptography and material science."
            },
            {
              platform: "Replicate (Stable Diffusion)",
              task: "Text-to-Image",
              prompt: "A futuristic city built inside a giant glass bottle floating in space, synthwave color palette.",
              result: "[Image placeholder: Neon lights, floating structures, starry background enclosed in glass]"
            }
          ]
        }
      },
      {
        taskNumber: "Task 4",
        title: "Literature Review",
        description: "Analysis of 'What Are Foundation Models?' and 'The Age of Generative AI'.",
        content: {
          q_and_a: [
            {
              question: "What makes a foundation model different from a traditional NLP model?",
              answer: "Traditional NLP models were typically 'narrow AI,' trained on specific datasets for specific tasks (e.g., sentiment analysis on movie reviews). Foundation models (like GPT-4) are trained on broad, massive data at scale and can be adapted (fine-tuned) to a wide variety of downstream tasks they weren't explicitly trained for, exhibiting emergent behavior."
            },
            {
              question: "Where do you see GenAI impacting your discipline (Software Engineering)?",
              answer: "It is fundamentally changing the coding workflow. From intelligent autocomplete (Copilot) to generating boilerplate code, unit tests, and documentation. It shifts the engineer's role from writing syntax to architecting systems and reviewing AI-generated logic."
            },
            {
              question: "What ethical or societal concerns arise?",
              answer: "Key concerns include: 1) Bias/Fairness: Models propagating stereotypes found in training data. 2) Hallucination: Generating confident but false information. 3) Copyright: Training on creators' work without consent. 4) Displacement: Automation of creative and cognitive labor."
            }
          ]
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
