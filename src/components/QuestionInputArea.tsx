import React, { useState } from 'react';

/**
 * 追加質問入力コンポーネントのProps
 */
export interface QuestionInputAreaProps {
  /** 質問送信時のコールバック */
  onSend: (question: string) => void;
  /** ローディング中かどうか */
  loading?: boolean;
}

/**
 * 追加質問を入力・送信するコンポーネント
 */
export const QuestionInputArea: React.FC<QuestionInputAreaProps> = ({ onSend, loading = false }) => {
  const [input, setInput] = useState('');

  /**
   * 質問送信処理
   */
  const handleSend = () => {
    const question = input.trim();
    if (!question) return;
    onSend(question);
    setInput('');
  };

  /**
   * Enterキーで送信
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.isComposing) {
      handleSend();
    }
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="例：この建物の建築様式は何ですか？"
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={loading}
      />
      <button
        type="button"
        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin-slow h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <span>質問</span>
        )}
      </button>
    </div>
  );
};

export default QuestionInputArea; 