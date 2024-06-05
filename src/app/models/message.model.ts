// models/message.model.ts
export interface Message {
  role: 'system' | 'user' | 'assistant' | 'error';
  content: string;
}