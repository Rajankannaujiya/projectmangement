export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}


export interface Comment{
  id: number;
  text: string;
  taskId: number;      
  userId: number;
}


export interface Task {
  id:number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: Date;
  dueDate?: Date;
  points?: string;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

enum Priority {
  Urgent = "URGENT",
  High = "HIGH",
  Medium = "MEDIUM",
  Low = "LOW",
  Backlog = "BACKLOG",
}

enum Status {
  Pending = "PENDING",
  Completed = "COMPLETED",
  Progress = "PROGRESS",
  UnderReview = "UNDER_REVIEW"
}