import React from 'react';

/**
 * 関連質問ボタンのProps
 */
export interface SuggestionButtonsProps {
  /** 表示する関連質問の配列 */
  questions: string[];
  /** 質問ボタンクリック時のコールバック */
  onClick: (question: string) => void;
  /** ローディング中かどうか */
  loading?: boolean;
}

/**
 * 関連質問をボタンで表示するコンポーネント
 */
export const SuggestionButtons: React.FC<SuggestionButtonsProps> = ({ questions, onClick, loading = false }) => {
  if (loading) {
    return <div className="text-xs text-gray-400">関連質問を生成中...</div>;
  }
  if (!questions.length) {
    return <div className="text-xs text-gray-400">画像を解析すると関連質問が表示されます</div>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((q, idx) => (
        <button
          key={idx}
          type="button"
          className="text-xs bg-blue-100 text-blue-700 px-3 py-2 rounded-full hover:bg-blue-200 transition-colors mr-2 mb-2 border border-blue-200 hover:border-blue-300"
          onClick={() => onClick(q)}
        >
          {q}
        </button>
      ))}
    </div>
  );
};

export default SuggestionButtons; 