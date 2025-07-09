import React from 'react';
import type { Message } from '../types/Message';

/**
 * 会話履歴表示コンポーネントのProps
 */
export interface ConversationAreaProps {
  /** 表示する会話履歴 */
  messages: Message[];
}

/**
 * Gemini AIとの会話履歴を表示するコンポーネント
 * 吹き出し風デザイン（右下・左下に三角しっぽ）
 */
export const ConversationArea: React.FC<ConversationAreaProps> = ({ messages }) => {
  if (!messages.length) return null;

  return (
    <div className="space-y-6">
      {messages.map((msg, idx) => {
        const isUser = msg.role === 'user';
        return (
          <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
            <div
              className={`relative p-4 whitespace-pre-wrap leading-relaxed shadow-md
                ${isUser
                  ? 'bg-blue-600 text-white rounded-2xl rounded-br-none'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-none'}
              `}
              style={{ wordBreak: 'break-word' }}
            >
              {msg.content}
              <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>{msg.timestamp || ''}</div>
              {/* 吹き出しのしっぽ（三角形） */}
              {isUser ? (
                <div className="absolute bottom-0 right-[-8px] w-0 h-0 border-b-8 border-b-transparent border-l-8 border-l-blue-600" />
              ) : (
                <div className="absolute bottom-0 left-[-8px] w-0 h-0 border-b-8 border-b-transparent border-r-8 border-r-white" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationArea; 