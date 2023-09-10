export interface TableProps {
  dsl: TableDsl;
}

interface TableDsl {
  service: { method: Function; payload: Object }; //table的业务函数
  updateService: { method: Function }; //table的更新业务
  removeService: { method: Function }; //table的删除业务
  columns: ColumnsProps; //table的column
  columnsTypes: Array<ColumnsTypes>; //table的column定制类型
  columnsActions: ColumnsActions; //table的column的动作
  tableConfig?: TableConfig; //table的配置
  tableEventHandler?: TableEventHandler; //table事件处理
}

type ColumnsProps = Array<ColumnProps>;
type ColumnProps = {
  name: string; //列的名称
  label: string; //列的展示名称
};
type ColumnName = TableDsl['columns'][number]['name'];

export type ColumnsActions = {
  update: Array<'all' | string>;
  delete: boolean;
  addChildren: boolean;
};

interface TableConfig {
  tableTitle?: string; //表格的标题
  reloadable?: boolean; //表格是否显示刷新按钮
  addable?: boolean; //表格是否可以增加新行
  //@废弃
  wantExpandJsonData?: boolean; //表格是否可以展开显示当前行的json信息
}
interface TableEventHandler {
  addablePreInitDataHandler: () => Promise<any>; //准备新行数据
}

type ColumnsTypes = {
  columnName: ColumnName;
  columnType: 'text' | 'number';
};
