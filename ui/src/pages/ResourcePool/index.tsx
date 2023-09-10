import useUpload from '@/hooks/useUpload';
import { Button } from 'antd';

export default function () {
  const { setUpload, uploading } = useUpload({
    uploadOption: {
      multipleSelect: true,
    },
  });
  return (
    <>
      <Button type="primary" disabled={uploading} onClick={() => setUpload((r) => ~r)}>
        上传
      </Button>
    </>
  );
}
