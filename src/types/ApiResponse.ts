/**
 * Gemini APIレスポンスの型定義
 */
export interface ApiResponse {
  /** レスポンステキスト */
  text: string;
  /** エラーメッセージ（エラー時） */
  error?: string;
} 