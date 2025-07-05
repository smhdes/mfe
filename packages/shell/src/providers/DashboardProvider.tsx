import React, { createContext, useContext, useEffect, useState } from 'react';
import { create } from 'zustand';

// Mock data types for our microfrontend
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
  department: string;
  year: number;
  isInternational: boolean;
  status: string;
  avatar?: string;
  country?: string;
}

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

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

// Create the Zustand store
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

// Context for shared state
const DashboardContext = createContext<DashboardState | null>(null);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useDashboardStore();
  
  // Initialize with mock data
  useEffect(() => {
    const mockUser: User = {
      id: 1,
      name: 'Prof. Dr. Mehmet Özkan',
      email: 'mehmet.ozkan@university.edu.tr',
      role: 'Akademik Koordinatör',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
    };

    const mockStudents: Student[] = [
      {
        id: 1,
        studentId: '2024001',
        name: 'Ayşe Demir',
        email: 'ayse.demir@student.edu.tr',
        department: 'Bilgisayar Mühendisliği',
        year: 3,
        isInternational: false,
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        country: 'Türkiye',
      },
      {
        id: 2,
        studentId: '2024002',
        name: 'John Smith',
        email: 'john.smith@student.edu.tr',
        department: 'Uluslararası İlişkiler',
        year: 2,
        isInternational: true,
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        country: 'ABD',
      },
      {
        id: 3,
        studentId: '2024003',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@student.edu.tr',
        department: 'Makine Mühendisliği',
        year: 4,
        isInternational: true,
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        country: 'Mısır',
      },
    ];

    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: 'info',
        title: 'Yeni öğrenci kaydı',
        message: 'Ahmet Yılmaz sisteme kaydoldu',
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: 2,
        type: 'success',
        title: 'Rapor tamamlandı',
        message: 'Aylık öğrenci raporu hazır',
        isRead: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: 3,
        type: 'warning',
        title: 'Ödemesi geciken öğrenci',
        message: '3 öğrencinin ödemesi gecikti',
        isRead: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ];

    store.setUser(mockUser);
    store.setStudents(mockStudents);
    store.setNotifications(mockNotifications);
  }, []);

  return (
    <DashboardContext.Provider value={store}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};