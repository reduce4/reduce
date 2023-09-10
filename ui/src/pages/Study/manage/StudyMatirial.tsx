import Table from '@/components/Table';
import { removeStudyMerials, saveStudyMerials, studyMerials } from '@/services/reduce';

export default function () {
  return (
    <>
      <Table
        dsl={{
          service: {
            method: studyMerials,
            payload: {},
          },
          updateService: {
            method: saveStudyMerials,
          },
          removeService: {
            method: removeStudyMerials,
          },
          columns: [
            { name: 'resourceName', label: '资源名称' },
            { name: 'resourceAddressUrl', label: '资源地址' },
            { name: 'resourceQualityMark', label: '资源得分' },
          ],
          columnsActions: {
            delete: true,
            addChildren: true,
            update: ['all'],
          },
          tableConfig: {
            tableTitle: '学习材料',
            reloadable: true,
            addable: true,
            wantExpandJsonData: false,
          },
          tableEventHandler: {
            async addablePreInitDataHandler() {
              return {
                resourceName: '',
                resourceAddressUrl: '',
                resourceQualityMark: 0,
                parentId: 0,
              };
            },
          },
          columnsTypes: [
            {
              columnName: 'resourceName',
              columnType: 'text',
            },
            {
              columnName: 'resourceAddressUrl',
              columnType: 'text',
            },
            {
              columnName: 'resourceQualityMark',
              columnType: 'number',
            },
          ],
        }}
      />
    </>
  );
}
