import { Modal } from 'antd';

export default function ({ open, onDelete, recordRow, onClose }: any) {
  return (
    <Modal
      open={open}
      title={'删除记录'}
      mask={true}
      onCancel={() => onClose()}
      onOk={() => {
        onDelete(recordRow.id);
        onClose();
      }}
    >
      您确认要删除【ID:{recordRow?.id}】的数据吗？
    </Modal>
  );
}
