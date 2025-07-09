/**
 * FileオブジェクトをBase64形式のデータURIに変換する
 * @param file 変換するFileオブジェクト
 * @returns Base64形式のデータURI
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
    reader.readAsDataURL(file);
  });
}; 