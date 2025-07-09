import { signInAnonymously, onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';

/**
 * 匿名認証を実行する
 * @returns Promise<User> - 認証されたユーザーオブジェクト
 */
export const signInAnonymouslyUser = async (): Promise<User> => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('匿名認証に失敗しました:', error);
    throw error;
  }
};

/**
 * 認証状態の変更を監視する
 * @param callback - 認証状態が変更された時に呼び出されるコールバック関数
 * @returns 監視を停止する関数
 */
export const onAuthStateChangedListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * 現在のユーザーを取得する
 * @returns User | null - 現在のユーザー、未認証の場合はnull
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
}; 