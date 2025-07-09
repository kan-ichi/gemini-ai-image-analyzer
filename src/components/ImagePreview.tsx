import React from 'react';
import type { ImageData } from '../types/ImageData';

/**
 * 画像プレビューコンポーネントのProps
 */
export interface ImagePreviewProps {
  /** プレビュー表示する画像データ */
  image: ImageData | null;
}

/**
 * 画像プレビューを表示するコンポーネント
 */
export const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
  if (!image) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 mb-4">
      <img
        src={image.base64}
        alt={image.fileName}
        className="max-w-full h-auto max-h-96 mx-auto rounded-lg shadow-md"
      />
      <div className="mt-2 text-xs text-gray-500 text-center">
        {image.fileName}（{(image.fileSize / 1024).toFixed(1)} KB）
      </div>
    </div>
  );
};

export default ImagePreview; 