/**
 * 画像バリデーション用の定数
 */
export const IMAGE_MAX_SIZE = 20 * 1024 * 1024; // 20MB
export const IMAGE_ACCEPT_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
];

/**
 * 画像ファイルのバリデーションを行う
 * @param file 対象のFileオブジェクト
 * @param maxSize 最大ファイルサイズ（バイト）
 * @param acceptTypes 許可するMIMEタイプ配列
 * @returns エラーメッセージ（バリデーションOKならnull）
 */
export const validateImageFile = (file: File): string | null => {
  if (file.size > IMAGE_MAX_SIZE) {
    return 'ファイルサイズが大きすぎます（最大20MB）';
  }
  if (!IMAGE_ACCEPT_TYPES.includes(file.type)) {
    return 'サポートされていない画像形式です';
  }
  return null;
}; 