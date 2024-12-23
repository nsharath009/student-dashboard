export interface Course {
  id: string;
  name: string;
  iconType: "math" | "science";
}

export interface CourseEnrollment {
  id: string;
  course: Course;
}

export interface Student {
  id: string;
  name: string;
  cohort: string;
  class: string;
  dateJoined: string;
  lastLogin: string;
  status: boolean;
  courses: CourseEnrollment[];
}

export type NewStudent = Omit<
  Student,
  "id" | "dateJoined" | "lastLogin" | "courses"
> & {
  courses: string[];
};
