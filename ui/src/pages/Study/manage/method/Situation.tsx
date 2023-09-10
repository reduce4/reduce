import Table from '@/components/Table';
import { removeSituations, saveSituations, situations } from '@/services/reduce';

export default function () {
  return (
    <>
      <Table
        dsl={{
          service: {
            method: situations,
            payload: {},
          },
          updateService: {
            method: saveSituations,
          },
          removeService: {
            method: removeSituations,
          },
          columns: [{ name: 'situationName', label: '场景名' }],
          columnsActions: {
            delete: true,
            addChildren: true,
            update: ['all'],
          },
          tableConfig: {
            tableTitle: '学习场景',
            reloadable: true,
            addable: true,
            wantExpandJsonData: false,
          },
          tableEventHandler: {
            async addablePreInitDataHandler() {
              return {
                situationName: '',
                parentId: 0,
              };
            },
          },
          columnsTypes: [
            {
              columnName: 'situationName',
              columnType: 'text',
            },
          ],
        }}
      />
    </>
  );
}
