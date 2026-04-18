export type UserType = 'volunteer' | 'need-help';

export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';

export type MissingType = 'person' | 'child' | 'animal';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  location: string;
  createdAt: Date;
}

export interface Need {
  id: string;
  userId: string;
  userName: string;
  userLocation: string;
  userPhone: string;
  category: string;
  description: string;
  urgency: UrgencyLevel;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: Date;
  volunteerId?: string;
}

export interface Volunteer {
  id: string;
  userId: string;
  name: string;
  location: string;
  phone: string;
  skills: string[];
  availability: string;
  status: 'available' | 'busy';
  helpedCount: number;
}

export interface MissingPerson {
  id: string;
  reportedBy: string;
  reporterPhone: string;
  name: string;
  age?: number;
  type: MissingType;
  description: string;
  lastSeenLocation: string;
  lastSeenDate: Date;
  photoUrl?: string;
  status: 'missing' | 'found';
  createdAt: Date;
}

export interface HelpRequest {
  id: string;
  needUserId: string;
  volunteerId: string;
  volunteerName: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}
