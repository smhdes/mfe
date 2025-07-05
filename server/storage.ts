import { users, type User, type InsertUser, type Student, type InsertStudent, type Notification, type InsertNotification } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllStudents(): Promise<Student[]>;
  getStudent(id: number): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  getAllNotifications(): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<Notification | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private students: Map<number, Student>;
  private notifications: Map<number, Notification>;
  private currentUserId: number;
  private currentStudentId: number;
  private currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.students = new Map();
    this.notifications = new Map();
    this.currentUserId = 1;
    this.currentStudentId = 1;
    this.currentNotificationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date(), avatar: insertUser.avatar || null };
    this.users.set(id, user);
    return user;
  }

  async getAllStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.currentStudentId++;
    const student: Student = { 
      ...insertStudent, 
      id, 
      createdAt: new Date(),
      avatar: insertStudent.avatar || null,
      status: insertStudent.status || 'active',
      isInternational: insertStudent.isInternational || false,
      country: insertStudent.country || null
    };
    this.students.set(id, student);
    return student;
  }

  async getAllNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values());
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.currentNotificationId++;
    const notification: Notification = { 
      ...insertNotification, 
      id, 
      createdAt: new Date(),
      userId: insertNotification.userId || null,
      isRead: insertNotification.isRead || false
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.isRead = true;
      this.notifications.set(id, notification);
      return notification;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
