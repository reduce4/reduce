import Table from '@/components/Table';
import { llms, removeLLMS, saveLLM } from '@/services/reduce';

export default function () {
  return (
    <>
      <Table
        dsl={{
          service: {
            method: llms,
            payload: {},
          },
          updateService: {
            method: saveLLM,
          },
          removeService: {
            method: removeLLMS,
          },
          columns: [{ name: 'name', label: '大模型名称' }],
          columnsActions: {
            delete: true,
            addChildren: true,
            update: ['all'],
          },
          tableConfig: {
            tableTitle: '大语言模型',
            reloadable: true,
            addable: true,
            wantExpandJsonData: false,
          },
          tableEventHandler: {
            async addablePreInitDataHandler() {
              return {
                name: '',
                parentId: 0,
              };
            },
          },
          columnsTypes: [
            {
              columnName: 'name',
              columnType: 'text',
            },
          ],
        }}
      />
    </>
  );
}
