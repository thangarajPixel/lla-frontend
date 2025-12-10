import { create } from "zustand";

type CourseState = {
  courseId: string | null;
  setCourseId: (id: string) => void;
  clearCourseId: () => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courseId: null,
  setCourseId: (id) => set({ courseId: id }),
  clearCourseId: () => set({ courseId: null }),
}));
