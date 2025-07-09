/**
 * 画像データの型定義
 */
export interface ImageData {
  /** Base64形式の画像データ */
  base64: string;
  /** ファイル名 */
  fileName: string;
  /** ファイルサイズ（バイト） */
  fileSize: number;
  /** MIMEタイプ */
  mimeType: string;
} 