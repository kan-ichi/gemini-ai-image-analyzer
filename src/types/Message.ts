/**
 * 会話メッセージの型定義
 */
export interface Message {
  /** メッセージの送信者（'user' | 'assistant'） */
  role: 'user' | 'assistant';
  /** メッセージの内容 */
  content: string;
  /** メッセージのタイムスタンプ */
  timestamp?: string;
} 