import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type MessageType = 'text' | 'job_attachment' | 'system';

export interface JobAttachment {
  jobId: string;
  title: string;
  type: 'seasonal' | 'fulltime';
  rate?: {
    amount: number;
    unit: string;
  };
  location?: string[];
  schedule?: {
    start: string;
    end: string;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  type: MessageType;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  readBy: string[];
  metadata?: {
    jobAttachment?: JobAttachment;
  };
}

export interface Chat {
  id: string;
  participants: string[];
  participantIds: { [userId: string]: boolean };
  lastMessage: string;
  lastMessageAt: FirebaseFirestoreTypes.Timestamp;
  lastMessageBy: string;
  unreadCount: { [userId: string]: number };
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
}

export interface ChatWithUser extends Chat {
  otherUser: {
    id: string;
    name: string;
    photo: string;
  };
}