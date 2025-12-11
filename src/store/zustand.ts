import { create } from "zustand";

type CourseState = {
  courseName: string | null;
  setCourseName: (id: string) => void;
  clearCourseName: () => void;
};

export const useCourseStore = create<CourseState>((set) => ({
  courseName: null,
  setCourseName: (name) => set({ courseName: name }),
  clearCourseName: () => set({ courseName: null }),
}));
