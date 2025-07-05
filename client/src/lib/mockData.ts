import { User, Student, Notification } from '@shared/schema';

export const mockUser: User = {
  id: 1,
  username: 'prof.ozkan',
  password: '',
  name: 'Prof. Dr. Mehmet Özkan',
  email: 'mehmet.ozkan@university.edu.tr',
  role: 'Akademik Koordinatör',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
  createdAt: new Date(),
};

export const mockStudents: Student[] = [
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
    createdAt: new Date(),
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
    createdAt: new Date(),
  },
  {
    id: 3,
    studentId: '2024003',
    name: 'Fatma Kaya',
    email: 'fatma.kaya@student.edu.tr',
    department: 'Tıp Fakültesi',
    year: 1,
    isInternational: false,
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
    country: 'Türkiye',
    createdAt: new Date(),
  },
  {
    id: 4,
    studentId: '2024004',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@student.edu.tr',
    department: 'Makine Mühendisliği',
    year: 4,
    isInternational: true,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
    country: 'Mısır',
    createdAt: new Date(),
  },
  {
    id: 5,
    studentId: '2024005',
    name: 'Mehmet Özdemir',
    email: 'mehmet.ozdemir@student.edu.tr',
    department: 'Elektrik Mühendisliği',
    year: 2,
    isInternational: false,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
    country: 'Türkiye',
    createdAt: new Date(),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    userId: 1,
    type: 'info',
    title: 'Yeni öğrenci kaydı',
    message: 'Ahmet Yılmaz sisteme kaydoldu',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 2,
    userId: 1,
    type: 'success',
    title: 'Rapor tamamlandı',
    message: 'Aylık öğrenci raporu hazır',
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 3,
    userId: 1,
    type: 'warning',
    title: 'Ödemesi geciken öğrenci',
    message: '3 öğrencinin ödemesi gecikti',
    isRead: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

export const getStudentStats = (students: Student[]) => {
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const internationalStudents = students.filter(s => s.isInternational).length;
  
  return {
    totalStudents,
    activeStudents,
    internationalStudents,
  };
};
