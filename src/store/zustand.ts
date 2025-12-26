import { create } from "zustand";

type CourseState = {
  courseName: string | null;
  setCourseName: (id: string) => void;
  clearCourseName: () => void;
  isHeaderVisible?: boolean;
  setIsHeaderVisible?: (visible: boolean) => void;
};

export const useCourseStore = create<CourseState>((set) => ({
  courseName: null,
  setCourseName: (name) => set({ courseName: name }),
  clearCourseName: () => set({ courseName: null }),
  isHeaderVisible: false,
  setIsHeaderVisible: (visible) => set({ isHeaderVisible: visible }),
}));
