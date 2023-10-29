export interface User {
  id: string;
  firstName: string;
  lastName: string;
  documentNumber: number;
  dob: string | Date;
  gender: string;
  email: string;
  phoneNumber: number;
  education: string;
}