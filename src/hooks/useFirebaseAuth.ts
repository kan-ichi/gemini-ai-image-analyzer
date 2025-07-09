import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { signInAnonymouslyUser, onAuthStateChangedListener } from '../utils/auth';

/**
 * Firebase匿名認証と認証状態管理を行うカスタムフック
 * @returns { user, loading, error }
 */
export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 匿名認証を実行
    signInAnonymouslyUser()
      .catch(() => {
        setError('匿名認証に失敗しました');
        setLoading(false);
      });

    // 認証状態の監視
    const unsubscribe = onAuthStateChangedListener((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading, error };
}; 