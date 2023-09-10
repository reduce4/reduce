import { Space, Table } from 'antd';
import { ColumnsActions } from './types';
export const formatColumnEditor = (
  columns: any,
  isEditing: (record: any) => boolean,
  columnsType: any,
) => {
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType:
          columnsType.find((e: any) => e.columnName == col.dataIndex)?.columnType ?? 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
};

export const formatColumnsOperations = (
  columns: any,
  columnActions: ColumnsActions,
  setModalOpen: Function,
  setCItem: Function,
  form: any,
  updateColumns: Array<string>,
  setEditingKey: any,
  isEditing: (record: any) => boolean,
  onSave: Function,
  wantShowJson: boolean,
  addChildrenRow: Function,
) => {
  var cColumns = [...columns];
  let addColumn = {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    render: (_: any, record: { key: React.Key }) => {
      return (
        <Space>
          {columnActions.update.length == 0 ? (
            <></>
          ) : isEditing(record) ? (
            <>
              <a
                onClick={() => {
                  onSave(record);
                }}
              >
                保存修改
              </a>
              <a
                onClick={() => {
                  setEditingKey(null);
                }}
              >
                取消修改
              </a>
            </>
          ) : (
            <a
              onClick={() => {
                form.setFieldsValue({
                  ...record,
                });
                setEditingKey(record.key);
              }}
            >
              修改
            </a>
          )}
          {!columnActions.delete ? (
            <></>
          ) : (
            <a
              onClick={() => {
                setCItem(record);
                setModalOpen((modals: any) => ({ ...modals, delete: true }));
              }}
            >
              删除
            </a>
          )}
          {!columnActions.addChildren ? (
            <></>
          ) : (
            <a onClick={() => addChildrenRow(record.key)}>增加子行</a>
          )}
        </Space>
      );
    },
  };
  for (const c of cColumns) {
    if (updateColumns.includes(c.dataIndex)) {
      c.editable = true;
    }
  }
  const addExpandColumn = Table.EXPAND_COLUMN;
  cColumns = [...cColumns, wantShowJson ? addExpandColumn : {}, addColumn];
  return cColumns;
};
export const formatColumns = (columns: any) => {
  const newColumns = [];
  for (const col of columns) {
    newColumns.push({
      title: col.label,
      dataIndex: col.name,
      key: col.name,
    });
  }
  return newColumns;
};

const formatDataSourceAddParent = (dataSource: any) => {
  for (const row of dataSource) {
    if (row.parentId == null) {
      continue;
    }
    const parentRow = dataSource.find((e: any) => e.id == row.parentId);
    if (parentRow) {
      if (parentRow.children == null) {
        parentRow.children = [];
      }
      parentRow.children.push(row);
    }
  }
  const answer: any = [];
  for (const row of dataSource) {
    if (row.parentId != null && row.parentId != 0) {
      continue;
    }
    answer.push(row);
  }
  return answer;
};
export const formatDataSource = (dataSource: any) => {
  if (dataSource == null) {
    return [];
  }
  var cDataSource = [...dataSource];

  for (const data of cDataSource) {
    data.key = data.id;
  }
  cDataSource = formatDataSourceAddParent(cDataSource);
  return cDataSource;
};
