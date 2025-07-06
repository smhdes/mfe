import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Course } from '@shared/schema';

interface CourseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (course: Omit<Course, 'id'> | Course) => void;
  course: Course | null;
}

const defaultForm = {
  courseCode: '',
  name: '',
  description: '',
  department: '',
  credits: 3,
  instructor: '',
  semester: '',
  status: 'active',
  maxStudents: 50,
  currentStudents: 0,
  createdAt: '',
};

const statusOptions = [
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Pasif' },
];

const semesterOptions = [
  { value: 'Güz 2024', label: 'Güz 2024' },
  { value: 'Bahar 2024', label: 'Bahar 2024' },
  { value: 'Yaz 2024', label: 'Yaz 2024' },
  { value: 'Güz 2025', label: 'Güz 2025' },
];

type FormType = typeof defaultForm;

const CourseModal: React.FC<CourseModalProps> = ({ open, onClose, onSave, course }) => {
  const [form, setForm] = useState<FormType>(defaultForm);

  useEffect(() => {
    if (course) {
      const { id, createdAt, ...rest } = course;
      setForm({
        ...rest,
        description: rest.description || '',
        maxStudents: rest.maxStudents || 50,
        currentStudents: rest.currentStudents || 0,
        createdAt: course.createdAt ? String(course.createdAt) : '',
      });
    } else {
      setForm(defaultForm);
    }
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name === 'credits' || name === 'maxStudents' || name === 'currentStudents') {
      setForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      description: form.description || null,
      maxStudents: form.maxStudents || null,
      currentStudents: form.currentStudents || 0,
      createdAt: form.createdAt ? new Date(form.createdAt) : null,
    };
    if (course) {
      onSave({ ...payload, id: course.id });
    } else {
      onSave(payload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>{course ? 'Ders Düzenle' : 'Yeni Ders Ekle'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="block text-sm mb-1">Ders Kodu</label>
            <input name="courseCode" value={form.courseCode} onChange={handleChange} required className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm mb-1">Ders Adı</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm mb-1">Açıklama</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm mb-1">Bölüm</label>
            <input name="department" value={form.department} onChange={handleChange} required className="w-full border rounded px-2 py-1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Kredi</label>
              <input name="credits" value={form.credits} onChange={handleChange} type="number" min={1} max={10} required className="w-full border rounded px-2 py-1" />
            </div>
            <div>
              <label className="block text-sm mb-1">Maksimum Öğrenci</label>
              <input name="maxStudents" value={form.maxStudents} onChange={handleChange} type="number" min={1} className="w-full border rounded px-2 py-1" />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Öğretim Üyesi</label>
            <input name="instructor" value={form.instructor} onChange={handleChange} required className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm mb-1">Dönem</label>
            <select name="semester" value={form.semester} onChange={handleChange} required className="w-full border rounded px-2 py-1">
              <option value="">Dönem seçin</option>
              {semesterOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Durum</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-2 py-1">
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>İptal</Button>
            <Button type="submit">Kaydet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal; 