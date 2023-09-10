import { uploadOption } from './types';
import usePrepareUploadOptionsDefaultValue from './usePrepareUploadOptionsDefaultValue';
import usePrepare from './usePrepareUploadUIStatus';
import useValidateUploadOptions from './useValidateUploadOptions';

export default function ({ uploadOption }: { uploadOption: uploadOption }) {
  const { setUpload, uploading } = usePrepare({
    uploadOption,
  });
  useValidateUploadOptions({
    uploadOption,
  });
  const { formattedUploadOption } = usePrepareUploadOptionsDefaultValue({
    uploadOption,
  });

  return {
    setUpload,
    uploading,
  };
}
