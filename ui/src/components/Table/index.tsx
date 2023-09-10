import { ReloadOutlined, UserAddOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Card, Form, message, Space, Table as AntdTable, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import EditableCell from './EditableCell';
import {
  formatColumnEditor,
  formatColumns,
  formatColumnsOperations,
  formatDataSource,
} from './formatter';
import DeleteModal from './modals/DeleteModal';
import { TableProps } from './types';

/**
 * dsl table
 * 用于快速铺设一个table
 */
const Table: React.FC<TableProps> = ({ dsl }) => {
  const [form] = Form.useForm();
  const {
    run: reload,
    data: dataSource,
    loading,
  } = useRequest(() => dsl.service.method(dsl.service.payload), { manual: true });
  const [updatePairs, setUpdatePairs] = useState<Array<any>>([]);
  const { run: runUpdate, loading: updating } = useRequest(
    () => dsl.updateService.method(updatePairs),
    {
      manual: true,
    },
  );
  const [removePairIds, setRemovePairIds] = useState<Array<any>>([]);
  const { run: runRemove, loading: removing } = useRequest(
    () => dsl.removeService.method(removePairIds),
    {
      manual: true,
    },
  );
  const tableConfig = dsl?.tableConfig ?? {};
  const [modalOpen, setModalOpen] = useState({
    delete: false,
  });
  const [cItem, setCItem] = useState();
  const [formattedDataSource, setFormattedDataSource] = useState<Array<any>>();
  const updateColumns: Array<string> =
    dsl.columnsActions.update[0] == 'all'
      ? dsl.columns.map((c) => c.name)
      : dsl.columnsActions.update;
  const columnsType = dsl.columnsTypes;
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: any) => record.key === editingKey;
  const wantShowJson = dsl.tableConfig?.wantExpandJsonData ?? false;
  const addChildrenRow = (parentId: number) => {
    const add = async () => {
      const newRowInitData = await dsl.tableEventHandler?.addablePreInitDataHandler();
      newRowInitData.parentId = parentId;
      setUpdatePairs([newRowInitData]);
    };
    add();
  };

  useEffect(() => {
    setFormattedDataSource(formatDataSource(dataSource ?? []));
  }, [dataSource]);
  useEffect(() => {
    reload();
  }, []);
  useEffect(() => {
    if (loading) {
      message.loading({
        content: '数据获取中',
        duration: 0.5,
      });
    }
  }, [loading]);
  useEffect(() => {
    if (updating || updatePairs.length == 0) {
      return;
    }
    reload();
    setEditingKey('');
  }, [updating]);
  useEffect(() => {
    if (updatePairs.length == 0) {
      return;
    }
    runUpdate();
    message.loading({
      content: '数据更新中',
      duration: 0.5,
    });
  }, [updatePairs]);
  const onNewRowAdd = useCallback(async () => {
    const newRowData = await dsl.tableEventHandler?.addablePreInitDataHandler();
    const newRowDatas = [];
    newRowDatas.push(newRowData);
    setUpdatePairs(newRowDatas);
  }, []);
  useEffect(() => {
    if (removing || removePairIds.length == 0) {
      return;
    }
    reload();
  }, [removing]);
  useEffect(() => {
    if (removePairIds.length == 0) {
      return;
    }
    runRemove();
    message.loading({
      content: '数据移除中',
      duration: 0.5,
    });
  }, [removePairIds]);

  const onSave = async (record: any) => {
    const updatePair = {
      ...form.getFieldsValue(),
      id: record.key,
      parentId: record.parentId,
    };
    setUpdatePairs([updatePair]);
  };

  return (
    <Card
      title={tableConfig?.tableTitle ?? ''}
      bodyStyle={{ padding: 8 }}
      extra={
        <>
          <Space>
            {tableConfig?.addable ?? null ? (
              <Tooltip title="增加新行">
                <UserAddOutlined onClick={onNewRowAdd} />
              </Tooltip>
            ) : (
              <></>
            )}
            {tableConfig?.reloadable ?? null ? (
              <Tooltip title="刷新">
                <ReloadOutlined onClick={() => reload()} />
              </Tooltip>
            ) : (
              <></>
            )}
          </Space>
        </>
      }
    >
      <Form form={form} component={false}>
        <AntdTable
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          sticky
          dataSource={formattedDataSource}
          rowClassName="editable-row"
          columns={formatColumnEditor(
            formatColumnsOperations(
              formatColumns(dsl.columns),
              dsl.columnsActions,
              setModalOpen,
              setCItem,
              form,
              updateColumns,
              setEditingKey,
              isEditing,
              onSave,
              wantShowJson,
              addChildrenRow,
            ),
            isEditing,
            columnsType,
          )}
          loading={loading}
        ></AntdTable>
        <DeleteModal
          open={modalOpen.delete}
          onClose={() => setModalOpen((modals) => ({ ...modals, delete: false }))}
          onDelete={(deleteId: number) => setRemovePairIds([deleteId])}
          recordRow={cItem}
        />
      </Form>
    </Card>
  );
};
export default Table;
