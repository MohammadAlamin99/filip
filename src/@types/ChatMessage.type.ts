export type ChatMessage = {
  id: string;
  text: string;
  time: string;
  sender: string;
  isMe: boolean;
  avatar?: string;
  type?: 'text' | 'job_attachment' | 'system';
  metadata?: any;
};
