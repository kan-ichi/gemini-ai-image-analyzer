import React, { useRef } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import type { ImageData } from '../types/ImageData';
import { fileToBase64 } from '../utils/base64';
import { IMAGE_ACCEPT_TYPES, validateImageFile } from '../features/validateImage';

/**
 * 画像アップロードコンポーネントのProps
 */
export interface ImageUploaderProps {
  /** 画像が選択されたときに呼ばれるコールバック */
  onImageSelected: (image: ImageData) => void;
}

/**
 * 画像アップロード・ドラッグ＆ドロップ対応コンポーネント
 */
export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * ファイル選択時の処理
   */
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    await handleFile(file);
  };

  /**
   * ドロップ時の処理
   */
  const handleDrop = async (e: DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) await handleFile(file);
  };

  /**
   * ファイルのバリデーションとBase64変換
   */
  const handleFile = async (file: File): Promise<void> => {
    const error = validateImageFile(file);
    if (error) {
      alert(error);
      return;
    }
    const base64 = await fileToBase64(file);
    onImageSelected({
      base64,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    });
  };

  return (
    <div
      className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors bg-white cursor-pointer"
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      tabIndex={0}
      role="button"
      aria-label="画像をアップロードまたはドロップ"
    >
      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_ACCEPT_TYPES.join(',')}
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="text-center text-gray-500">
        このエリアをクリックまたはドラッグ＆ドロップで選択してください<br />
      </div>
    </div>
  );
};

export default ImageUploader; 