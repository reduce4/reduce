export default [
  { path: '/', redirect: '/workbench' },
  { path: '/workbench', name: '工作台', component: './Workbench' },
  {
    path: '/study',
    name: '学习管理',
    routes: [
      {
        path: '/study/plan',
        name: '学习计划',
        routes: [
          { path: '/study/plan/empty-time', name: '空余时间' },
          {
            path: '/study/plan/method',
            name: '学习方法',
            routes: [
              {
                path: '/study/plan/method/scene',
                name: '学习场景',
                component: './Study/manage/method/Situation',
              },
            ],
          },
          {
            path: '/study/plan/matirial',
            name: '学习材料',
            component: './Study/manage/StudyMatirial',
          },
        ],
      },
      {
        path: '/study/practice',
        name: '实践',
        routes: [{ path: '/study/practice/study-thinking-join', name: '学习思考结合' }],
      },
    ],
  },
  {
    path: '/mind',
    name: '思考',
    routes: [
      { path: '/mind/prethinking', name: '潜意识' },
      { path: '/mind/thinking', name: '意识' },
    ],
  },
  { path: '/llm', name: '大语言模型', component: './LLM' },
  { path: '/environment', name: '环境' },
  { path: '/resource-pool', name: '资源池', component: './ResourcePool' },
];
