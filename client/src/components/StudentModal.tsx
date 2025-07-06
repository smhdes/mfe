import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Student } from '@shared/schema';

interface StudentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, 'id'> | Student) => void;
  student: Student | null;
}

const defaultForm = {
  studentId: '',
  name: '',
  email: '',
  department: '',
  year: 1,
  isInternational: false,
  status: 'active',
  avatar: '',
  country: '',
  createdAt: '',
};

const statusOptions = [
  { value: 'active', label: 'Aktif' },
  { value: 'pending', label: 'Beklemede' },
  { value: 'inactive', label: 'Pasif' },
];

type FormType = typeof defaultForm;

const StudentModal: React.FC<StudentModalProps> = ({ open, onClose, onSave, student }) => {
  const [form, setForm] = useState<FormType>(defaultForm);

  useEffect(() => {
    if (student) {
      const { id, createdAt, avatar, country, ...rest } = student;
      setForm({
        ...rest,
        avatar: avatar ?? '',
        country: country ?? '',
        createdAt: student.createdAt ? String(student.createdAt) : '',
      });
    } else {
      setForm(defaultForm);
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === 'year') {
      setForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      avatar: form.avatar || null,
      country: form.country || null,
      createdAt: form.createdAt ? new Date(form.createdAt) : null,
    };
    if (student) {
      onSave({ ...payload, id: student.id });
    } else {
      onSave(payload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>{student ? 'Öğrenci Düzenle' : 'Yeni Öğrenci Ekle'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="block text-sm mb-1">Ad Soyad</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm mb-1">E-posta</label>
            <input name="email" value={form.email} onChange={handleChange} required type="email" className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm mb-1">Öğrenci No</label>
            <input name="studentId" value={form.studentId} onChange={handleChange} required className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm mb-1">Bölüm</label>
            <input name="department" value={form.department} onChange={handleChange} required className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm mb-1">Sınıf</label>
            <input name="year" value={form.year} onChange={handleChange} type="number" min={1} max={8} required className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm mb-1">Ülke</label>
            <input name="country" value={form.country} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="isInternational" name="isInternational" checked={form.isInternational} onChange={handleChange} />
            <label htmlFor="isInternational" className="text-sm">Yabancı Öğrenci</label>
          </div>
          <div>
            <label className="block text-sm mb-1">Durum</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-2 py-1">
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Avatar (URL)</label>
            <input name="avatar" value={form.avatar} onChange={handleChange} className="w-full border rounded px-2 py-1" />
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

export default StudentModal; 