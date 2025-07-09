import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState, useRef } from 'react';
import type { Message } from '../types/Message';
import type { ImageData } from '../types/ImageData';
import { getGeminiApiKey } from '../utils/apiKey';

/**
 * GoogleGenerativeAI型の最低限の型定義
 */
type GenerativeModel = {
  startChat: (options: { history: unknown[] }) => ChatSession;
  generateContent: (options: unknown) => Promise<unknown>;
};

type ChatSession = {
  sendMessage: (input: unknown) => Promise<unknown>;
};

/**
 * Gemini APIとの会話・画像解析を管理するカスタムフック
 */
export const useGeminiChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const generativeModelRef = useRef<unknown>(null);
  const chatSessionRef = useRef<unknown>(null);
  const [apiKeyLoaded, setApiKeyLoaded] = useState(false);

  /**
   * Gemini APIの初期化
   */
  const initializeGemini = async () => {
    if (apiKeyLoaded) return;
    try {
      const apiKey = await getGeminiApiKey();
      const model = new GoogleGenerativeAI(atob(apiKey)).getGenerativeModel({ model: 'gemini-2.0-flash' });
      generativeModelRef.current = model;
      chatSessionRef.current = (model as { startChat: (params: { history: unknown[] }) => unknown }).startChat({ history: [] });
      setApiKeyLoaded(true);
    } catch {
      setError('Gemini APIの初期化に失敗しました');
    }
  };

  /**
   * 画像解析を実行
   */
  const analyzeImage = async (image: ImageData) => {
    setLoading(true);
    setError(null);
    await initializeGemini();
    if (!chatSessionRef.current) {
      setError('Gemini APIの初期化に失敗しました');
      setLoading(false);
      return;
    }
    const promptText = 'この画像に写っているものを説明してください。日本語で説明してください。';
    setMessages(prev => [...prev, { role: 'user', content: promptText, timestamp: new Date().toLocaleTimeString('ja-JP') }]);
    try {
      const base64Data = image.base64.split(',')[1];
      const result = await (chatSessionRef.current as { sendMessage: (input: unknown) => Promise<unknown> }).sendMessage([
        { text: promptText },
        { inlineData: { mimeType: image.mimeType, data: base64Data } }
      ]);
      const responseText = await (result as { response: { text: () => Promise<string> } }).response.text();
      setMessages(prev => [...prev, { role: 'assistant', content: responseText, timestamp: new Date().toLocaleTimeString('ja-JP') }]);
      await generateSuggestions(responseText);
    } catch {
      setError('画像の解析中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 追加質問を送信
   */
  const sendQuestion = async (question: string) => {
    setLoading(true);
    setError(null);
    await initializeGemini();
    if (!chatSessionRef.current) {
      setError('Gemini APIの初期化に失敗しました');
      setLoading(false);
      return;
    }
    setMessages(prev => [...prev, { role: 'user', content: question, timestamp: new Date().toLocaleTimeString('ja-JP') }]);
    try {
      const result = await (chatSessionRef.current as { sendMessage: (input: unknown) => Promise<unknown> }).sendMessage(question);
      const responseText = await (result as { response: { text: () => Promise<string> } }).response.text();
      setMessages(prev => [...prev, { role: 'assistant', content: responseText, timestamp: new Date().toLocaleTimeString('ja-JP') }]);
      await generateSuggestions(responseText);
    } catch {
      setError('質問の処理中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 関連質問を生成
   */
  const generateSuggestions = async (latestResponse: string) => {
    if (!generativeModelRef.current) return;
    try {
      const conversationContext = messages
        .map(msg => `${msg.role === 'user' ? 'Q: ' : 'A: '}${msg.content}`)
        .join('\n\n');
      const prompt = `会話履歴を基に、ユーザーが次に興味を持ちそうな追加質問を簡潔に3つ生成してください。最新の回答内容を特に重視し、より深掘りできる質問や関連する新しい観点からの質問を提案してください。\n\n会話履歴：\n${conversationContext}\n\n最新の回答：\n${latestResponse}\n\n以下の形式で出力してください：\n1. [質問1]\n2. [質問2]\n3. [質問3]`;
      const result = await (generativeModelRef.current as { generateContent: (input: unknown) => Promise<unknown> }).generateContent({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topP: 0.9,
          maxOutputTokens: 500
        }
      });
      const questionsText = await (result as { response: { text: () => Promise<string> } }).response.text();
      const questions = questionsText
        .split('\n')
        .filter((line: string) => /^\d+\./.test(line.trim()))
        .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
        .filter((q: string) => q.length > 0);
      setSuggestions(questions.slice(0, 5));
    } catch {
      setSuggestions([]);
    }
  };

  /**
   * 会話履歴・提案のリセット
   */
  const clearChat = () => {
    setMessages([]);
    setSuggestions([]);
    setError(null);
    setApiKeyLoaded(false);
    generativeModelRef.current = null;
    chatSessionRef.current = null;
  };

  return {
    messages,
    loading,
    error,
    suggestions,
    analyzeImage,
    sendQuestion,
    clearChat,
  };
}; 