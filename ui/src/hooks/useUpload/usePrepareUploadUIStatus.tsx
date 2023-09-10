import { useCallback, useEffect, useRef, useState } from 'react';
import { uploadOption } from './types';
/**
 * 文件上传的准备工作
 */
export default function ({ uploadOption }: { uploadOption: uploadOption }) {
  //暂存dom准备上传
  const fileRef = useRef<HTMLInputElement>();
  const uploadFileHandler = useCallback(() => {}, []);
  //暂存dom准备上传 end
  //文件上传点击status
  const [upload, setUpload] = useState<any>();
  const [uploading, setUploading] = useState<boolean>(false);
  //文件上传点击status end

  //暂存dom准备上传 effect
  useEffect(() => {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.multiple = uploadOption?.multipleSelect ?? false;
    fileRef.current = inputFile;
    inputFile.addEventListener('click', uploadFileHandler);
    return () => inputFile.removeEventListener('click', uploadFileHandler);
  }, [uploadOption]);
  //暂存dom准备上传 effect end

  //文件上传点击effect
  useEffect(() => {
    if (upload == null) {
      return;
    }
    setUploading(true);
  }, [upload]);
  useEffect(() => {
    if (!uploading) {
      return;
    }
    fileRef.current?.click();
  }, [uploading]);
  //文件上传点击end

  return {
    setUpload,
    uploading,
  };
}
