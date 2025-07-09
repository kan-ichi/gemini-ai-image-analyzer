import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { useGeminiChat } from './hooks/useGeminiChat';
import ImageUploader from './components/ImageUploader';
import ImagePreview from './components/ImagePreview';
import AnalyzeButton from './components/AnalyzeButton';
import ConversationArea from './components/ConversationArea';
import QuestionInputArea from './components/QuestionInputArea';
import SuggestionButtons from './components/SuggestionButtons';
import ScrollButtons from './components/ScrollButtons';
import ErrorMessage from './components/ErrorMessage';
import type { ImageData } from './types/ImageData';
import { RECAPTCHA_SITE_KEY, RECAPTCHA_ENABLED } from './_DoNotCommit/env';

const App: React.FC = () => {
  const { loading: authLoading, error: authError } = useFirebaseAuth();
  const {
    messages,
    loading: geminiLoading,
    error: geminiError,
    suggestions,
    analyzeImage,
    sendQuestion,
    clearChat,
  } = useGeminiChat();

  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  /** 画像選択時の処理 */
  const handleImageSelected = (image: ImageData) => {
    setSelectedImage(image);
    clearChat();
  };

  /** 画像解析ボタン押下時 */
  const handleAnalyze = () => {
    if (selectedImage) {
      if (RECAPTCHA_ENABLED) {
        recaptchaRef.current?.execute();
      } else {
        analyzeImage(selectedImage);
      }
    }
  };

  /** reCAPTCHAチャレンジ成功時のコールバック */
  const onRecaptchaChange = async (token: string | null) => {
    if (token && selectedImage) {
      await analyzeImage(selectedImage);
    }
    recaptchaRef.current?.reset();
  };

  /** 追加質問送信 */
  const handleSendQuestion = async (question: string) => {
    setSuggestionLoading(true);
    await sendQuestion(question);
    setSuggestionLoading(false);
  };

  /** 関連質問ボタン押下時 */
  const handleSuggestionClick = async (question: string) => {
    setSuggestionLoading(true);
    await sendQuestion(question);
    setSuggestionLoading(false);
  };

  /** スクロール */
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Gemini AI 画像解析</h1>
          <p className="text-gray-600">画像をアップロードしてAIによる解析を行います</p>
        </div>

        {RECAPTCHA_ENABLED && (
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={onRecaptchaChange}
          />
        )}

        {authLoading && <div className="text-center text-gray-500">Firebase認証中...</div>}
        {authError && <ErrorMessage message={authError} />}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            画像を選択してください
          </label>
          {!selectedImage && <ImageUploader onImageSelected={handleImageSelected} />}
          <ImagePreview image={selectedImage} />
          <p className="text-xs text-gray-500 m-3">
              対応形式: JPEG, PNG, WEBP, HEIC, HEIF（最大20MB）
          </p>
          <AnalyzeButton
            onClick={handleAnalyze}
            disabled={!selectedImage || geminiLoading}
            loading={geminiLoading}
          />
        </div>

        <ErrorMessage message={geminiError} />

        {messages.length > 0 && (
          <>
            <ConversationArea messages={messages} />
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <QuestionInputArea onSend={handleSendQuestion} loading={geminiLoading || suggestionLoading} />
              <div className="mb-4">
                <p className="text-xs text-gray-500 m-2">関連質問（クリックで自動送信）:</p>
                <SuggestionButtons
                  questions={suggestions}
                  onClick={handleSuggestionClick}
                  loading={suggestionLoading}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                  onClick={clearChat}
                >
                  <span>履歴クリア</span>
                </button>
              </div>
            </div>
          </>
        )}

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by Gemini AI</p>
        </div>
      </div>
      <ScrollButtons
        onScrollToTop={scrollToTop}
        onScrollToBottom={scrollToBottom}
      />
    </div>
  );
};

export default App;
