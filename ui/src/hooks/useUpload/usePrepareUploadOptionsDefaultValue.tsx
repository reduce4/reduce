import { useEffect, useState } from 'react';
import { uploadOption } from './types';
export default function ({ uploadOption }: { uploadOption: uploadOption }) {
  const [formattedUploadOption, setFormattedUploadOption] = useState<uploadOption>();

  useEffect(() => {}, [uploadOption]);

  return {
    formattedUploadOption,
  };
}
