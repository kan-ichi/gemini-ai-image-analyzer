import React from 'react';

/**
 * 画像解析ボタンのProps
 */
export interface AnalyzeButtonProps {
  /** ボタンがクリックされたときのコールバック */
  onClick: () => void;
  /** ボタンの有効/無効状態 */
  disabled?: boolean;
  /** ローディング中かどうか */
  loading?: boolean;
}

/**
 * 画像解析を実行するボタンコンポーネント
 */
export const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({ onClick, disabled = false, loading = false }) => {
  return (
    <button
      type="button"
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <svg className="animate-spin-slow h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <span>{loading ? '解析中...' : '画像を解析する'}</span>
    </button>
  );
};

export default AnalyzeButton; 