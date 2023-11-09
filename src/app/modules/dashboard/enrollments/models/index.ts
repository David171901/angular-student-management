import { Course } from "../../courses/models";
import { Student } from "../../students/models";

export interface Enrollment {
  studentId: string;
  courseId: string;
  studentInfo: Student;
  courseInfo: Course;
}