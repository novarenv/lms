// roles.ts
export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}