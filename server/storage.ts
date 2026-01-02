
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
        content: [] // Solutions hidden by default for student view
      },
      {
        taskNumber: "Task 2",
        title: "Foundation Model Timeline",
        description: "A timeline tracing major foundation models and their breakthroughs.",
        content: [] // Solutions hidden by default for student view
      },
      {
        taskNumber: "Task 3",
        title: "Platform Exploration",
        description: "Hands-on results from exploring foundation models via interactive platforms.",
        content: {
          experiments: [] // Solutions hidden by default for student view
        }
      },
      {
        taskNumber: "Task 4",
        title: "Literature Review & Analysis",
        description: "Summary and critical analysis based on Stanford CRFM and OpenAI literature.",
        content: {
          summaries: [],
          q_and_a: [],
          conclusion: "" // Solutions hidden by default for student view
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
