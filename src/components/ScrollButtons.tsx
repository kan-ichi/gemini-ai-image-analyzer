import React from 'react';

/**
 * スクロールボタンのProps
 */
export interface ScrollButtonsProps {
  /** トップへスクロールするコールバック */
  onScrollToTop: () => void;
  /** ボトムへスクロールするコールバック */
  onScrollToBottom: () => void;
  /** ボタンの表示/非表示制御 */
  visible?: boolean;
}

/**
 * トップ・ボトムへのスクロールボタンを表示するコンポーネント
 */
export const ScrollButtons: React.FC<ScrollButtonsProps> = ({ onScrollToTop, onScrollToBottom, visible = true }) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        title="トップへスクロール"
        onClick={onScrollToTop}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
      <button
        type="button"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        title="ボトムへスクロール"
        onClick={onScrollToBottom}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </button>
    </div>
  );
};

export default ScrollButtons; 