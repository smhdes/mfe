import { create } from 'zustand';
import { Student, Notification, User, Course } from '@shared/schema';

interface DashboardState {
  user: User | null;
  students: Student[];
  courses: Course[];
  notifications: Notification[];
  isNotificationDrawerOpen: boolean;
  studentFilter: 'all' | 'local' | 'international';
  courseFilter: 'all' | 'active' | 'inactive';
  unreadNotificationCount: number;

  // Actions
  setUser: (user: User) => void;
  setStudents: (students: Student[]) => void;
  setCourses: (courses: Course[]) => void;
  setNotifications: (notifications: Notification[]) => void;
  toggleNotificationDrawer: () => void;
  setStudentFilter: (filter: 'all' | 'local' | 'international') => void;
  setCourseFilter: (filter: 'all' | 'active' | 'inactive') => void;
  markNotificationAsRead: (id: number) => void;
  closeNotificationDrawer: () => void;
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (student: Student) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (course: Course) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  user: null,
  students: [],
  courses: [],
  notifications: [],
  isNotificationDrawerOpen: false,
  studentFilter: 'all',
  courseFilter: 'all',
  unreadNotificationCount: 0,

  setUser: (user) => set({ user }),
  setStudents: (students) => set({ students }),
  setCourses: (courses) => set({ courses }),
  setNotifications: (notifications) => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    set({ notifications, unreadNotificationCount: unreadCount });
  },
  toggleNotificationDrawer: () =>
    set((state) => ({ isNotificationDrawerOpen: !state.isNotificationDrawerOpen })),
  setStudentFilter: (filter) => set({ studentFilter: filter }),
  setCourseFilter: (filter) => set({ courseFilter: filter }),
  markNotificationAsRead: (id) =>
    set((state) => {
      const updatedNotifications = state.notifications.map(n =>
        n.id === id ? { ...n, isRead: true } : n
      );
      const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
      return { notifications: updatedNotifications, unreadNotificationCount: unreadCount };
    }),
  closeNotificationDrawer: () => set({ isNotificationDrawerOpen: false }),
  addStudent: (student) => set((state) => {
    // id otomatik artan olarak belirleniyor (mock için)
    const newId = (state.students.length > 0 ? Math.max(...state.students.map(s => s.id)) + 1 : 1);
    return { students: [...state.students, { ...student, id: newId }] };
  }),
  updateStudent: (student) => set((state) => {
    const students = state.students.map(s => s.id === student.id ? student : s);
    return { students };
  }),
  addCourse: (course) => set((state) => {
    // id otomatik artan olarak belirleniyor (mock için)
    const newId = (state.courses.length > 0 ? Math.max(...state.courses.map(c => c.id)) + 1 : 1);
    return { courses: [...state.courses, { ...course, id: newId }] };
  }),
  updateCourse: (course) => set((state) => {
    const courses = state.courses.map(c => c.id === course.id ? course : c);
    return { courses };
  }),
}));
