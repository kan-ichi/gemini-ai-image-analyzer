import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { 
  FIREBASE_API_KEY, 
  FIREBASE_AUTH_DOMAIN, 
  FIREBASE_PROJECT_ID, 
  FIREBASE_STORAGE_BUCKET, 
  FIREBASE_MESSAGING_SENDER_ID, 
  FIREBASE_APP_ID,
  FIREBASE_REALTIME_DATABASE_URL
} from '../_DoNotCommit/env';

/**
 * Firebase設定オブジェクト
 */
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  databaseURL: FIREBASE_REALTIME_DATABASE_URL
};

/**
 * Firebaseアプリの初期化
 */
const app = initializeApp(firebaseConfig);

/**
 * Firebase認証インスタンス
 */
export const auth = getAuth(app);

/**
 * Firebase Realtime Databaseインスタンス
 */
export const database = getDatabase(app);

export default app; 