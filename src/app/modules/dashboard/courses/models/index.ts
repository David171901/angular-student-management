export interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  professor: string;
  area: string;
  startDate: string | Date;
  endDate: string | Date;
  maxStudents: number;
}
