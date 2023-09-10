import { message } from 'antd';
import { useCallback, useEffect } from 'react';
import { uploadOption } from './types';
/**
 * 用于校验用户上传文件的目的和愿望
 *
 * 如果用户传入了错误的配置，将会提示失败，直到成功
 */
export default function ({ uploadOption }: { uploadOption: uploadOption }) {
  const errorHandler = useCallback(
    ({ errorMsg }: { errorMsg: string }) => {
      message.error({
        content: errorMsg,
        duration: 0.5,
      });
      throw new Error(errorMsg);
    },
    [uploadOption],
  );

  useEffect(() => {
    switch (true) {
      case uploadOption.serverUploadApi.serverSupportedUploadContentType ==
        'application/x-www-form-urlencoded':
        if (uploadOption.multipleSelect) {
          errorHandler({
            errorMsg: '此方式不允许上传多个文件',
          });
        }
        break;
      case uploadOption.serverUploadApi.serverSupportedUploadContentType ==
        'application/octet-stream':
        break;
      case uploadOption.serverUploadApi.serverSupportedUploadContentType == 'multipart/form-data':
        break;
      case uploadOption.serverUploadApi.serverSupportedUploadContentType == 'custome':
        if (uploadOption.serverUploadApi.customeContentType == null) {
          errorHandler({
            errorMsg: '选择了服务器自定义ContentType类型但没有提供自定义ContentType',
          });
        }
        break;
    }
  }, [uploadOption]);
}
