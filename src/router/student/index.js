const studentRoutes = [
  {
    path: "example/student",
    name: "StudentContainer",
    component: () => import('@/modules/student/views/index.vue'),
    meta: {
      title: "学生管理",
    },
  },
];

export default studentRoutes;
