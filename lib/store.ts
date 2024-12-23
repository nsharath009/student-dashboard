import { create } from "zustand";
import { Student, Course, NewStudent } from "./types";

interface StoreState {
  students: Student[];
  courses: Course[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  academicYear: string;
  selectedClass: string;
  setStudents: (students: Student[]) => void;
  setCourses: (courses: Course[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setAcademicYear: (year: string) => void;
  setSelectedClass: (className: string) => void;
  fetchStudents: () => Promise<void>;
  fetchCourses: () => Promise<void>;
  addStudent: (student: NewStudent) => Promise<void>;
  updateStudent: (id: string, student: Partial<NewStudent>) => Promise<void>;
  updateStudentStatus: (id: string, status: boolean) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  students: [],
  courses: [],
  loading: false,
  error: null,
  searchQuery: "",
  academicYear: "AY 2024-25",
  selectedClass: "CBSE 9",

  setStudents: (students) => set({ students }),
  setCourses: (courses) => set({ courses }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setAcademicYear: (year) => set({ academicYear: year }),
  setSelectedClass: (className) => set({ selectedClass: className }),

  fetchStudents: async () => {
    const { academicYear, selectedClass, searchQuery } = get();
    try {
      set({ loading: true, error: null });
      const params = new URLSearchParams({
        cohort: academicYear,
        class: selectedClass,
        search: searchQuery,
      });
      const response = await fetch(`/api/students?${params}`);
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      set({ students: data.students, loading: false });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: "Failed to fetch students", loading: false });
    }
  },

  fetchCourses: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch("/api/courses");
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      set({ courses: data, loading: false });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: "Failed to fetch courses", loading: false });
    }
  },

  addStudent: async (studentData) => {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) throw new Error("Failed to add student");
      const newStudent = await response.json();
      set((state) => ({
        students: [...state.students, newStudent],
      }));
    } catch (error) {
      set({ error: "Failed to add student" });
      throw error;
    }
  },

  updateStudent: async (id, studentData) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) throw new Error("Failed to update student");
      const updatedStudent = await response.json();
      set((state) => ({
        students: state.students.map((student) =>
          student.id === id ? updatedStudent : student
        ),
      }));
    } catch (error) {
      set({ error: "Failed to update student" });
      throw error;
    }
  },

  updateStudentStatus: async (id, status) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update student status");
      set((state) => ({
        students: state.students.map((student) =>
          student.id === id ? { ...student, status } : student
        ),
      }));
    } catch (error) {
      set({ error: "Failed to update student status" });
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete student");
      set((state) => ({
        students: state.students.filter((student) => student.id !== id),
      }));
    } catch (error) {
      set({ error: "Failed to delete student" });
      throw error;
    }
  },
}));
