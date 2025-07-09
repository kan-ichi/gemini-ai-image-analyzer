import { ref, get } from 'firebase/database';
import { database } from '../lib/firebase';

/**
 * Firebase Realtime DatabaseからGemini APIキーを取得する
 * @returns Promise<string> - Gemini APIキー
 * @throws Error - APIキーの取得に失敗した場合
 */
export const getGeminiApiKey = async (): Promise<string> => {
  try {
    const apiKeyRef = ref(database, 'config/gemini_api_key');
    const snapshot = await get(apiKeyRef);
    
    if (snapshot.exists()) {
      const apiKey = btoa(snapshot.val());
      if (typeof apiKey === 'string' && apiKey.trim() !== '') {
        return apiKey;
      }
    }
    
    throw new Error('APIキーが設定されていません');
  } catch (error) {
    console.error('APIキーの取得に失敗しました:', error);
    throw new Error('APIキーの取得に失敗しました');
  }
}; 