import { create } from 'zustand';
import { Student, Notification, User } from '@shared/schema';

interface DashboardState {
  user: User | null;
  students: Student[];
  notifications: Notification[];
  isNotificationDrawerOpen: boolean;
  studentFilter: 'all' | 'local' | 'international';
  unreadNotificationCount: number;
  
  // Actions
  setUser: (user: User) => void;
  setStudents: (students: Student[]) => void;
  setNotifications: (notifications: Notification[]) => void;
  toggleNotificationDrawer: () => void;
  setStudentFilter: (filter: 'all' | 'local' | 'international') => void;
  markNotificationAsRead: (id: number) => void;
  closeNotificationDrawer: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  user: null,
  students: [],
  notifications: [],
  isNotificationDrawerOpen: false,
  studentFilter: 'all',
  unreadNotificationCount: 0,

  setUser: (user) => set({ user }),
  setStudents: (students) => set({ students }),
  setNotifications: (notifications) => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    set({ notifications, unreadNotificationCount: unreadCount });
  },
  toggleNotificationDrawer: () => 
    set((state) => ({ isNotificationDrawerOpen: !state.isNotificationDrawerOpen })),
  setStudentFilter: (filter) => set({ studentFilter: filter }),
  markNotificationAsRead: (id) => 
    set((state) => {
      const updatedNotifications = state.notifications.map(n => 
        n.id === id ? { ...n, isRead: true } : n
      );
      const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
      return { notifications: updatedNotifications, unreadNotificationCount: unreadCount };
    }),
  closeNotificationDrawer: () => set({ isNotificationDrawerOpen: false }),
}));
