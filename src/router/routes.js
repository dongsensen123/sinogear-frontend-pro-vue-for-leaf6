// 首页
import HomeContainer from '../modules/home/views/index.vue';
import GuideContainer from '../modules/guide/views/index.vue';
import LoginContainer from '../modules/user/login/views/index.vue';
import RegisterContainer from '../modules/user/register/views/index.vue';
import ForgotPassword from '../modules/user/password/forgot-password/views/index.vue';
import StudentContainer from '../modules/student/views/index.vue';
import LayoutContainer from '../layouts/Layout.vue';
import Exception404 from '../modules/exception/views/404.vue';
import ArticlesContainer from '../modules/list/search-list/views/Articles.vue';
import Exception401 from '../modules/exception/views/401.vue';
import Exception403 from '../modules/exception/views/403.vue';
import AccountContainer from '../modules/account/views/index.vue';
import BaseContainer from '../modules/account/views/Base.vue';
import NotificationContainer from '../modules/account/views/Notification.vue';
import UpdatePassword from '../modules/account/views/UpdatePassword.vue';
import UserStatus from '../modules/account/views/UserStatus.vue';
import BlankLayout from '../layouts/BlankLayout.vue';
import DemoHome from '../modules/example/demo/views/index.vue';
import EditorDemo from '../modules/example/demo/editor/views/index.vue';
import CacheDemo from '../modules/example/demo/cache/views/index.vue';
import TriggerException from '../modules/exception/views/TriggerException.vue';
import BasicForm from "../modules/forms/basic-form/views/BasicForm.vue";
import StepForm from "../modules/forms/step-form/views/StepForm.vue";
import AdvancedForm from "../modules/forms/advanced-form/views/AdvancedForm.vue";
import Advanced from "../modules/profile/advanced/views/Advanced.vue";
import BasicProfile from "../modules/profile/basic/views/BasicProfile.vue";
import Failed from "../modules/result/failed/views/Failed.vue";
import Success from "../modules/result/success/views/Success.vue";
import CardList from "../modules/list/card-list/views/CardList.vue";
import BasicList from "../modules/list/basic-list/views/BasicList.vue";
import TableList from "../modules/list/table-list/views/TableList.vue";
import Projects from "../modules/list/search-list/views/Projects.vue";
import Applications from "../modules/list/search-list/views/Applications.vue";
import Analysis from "../modules/chart/analysis/views/Analysis.vue";
import Monitor from "../modules/chart/monitor/views/Monitor.vue";
import DictForm from "../modules/forms/dict-form/views/DictForm.vue";
import MacroAppLayout from '../layouts/MacroAppLayout.vue';

const routes = [
  {
    path: '/',
    name: 'LayoutContainer',
    component: LayoutContainer,
    redirect: '/home',
    children: [
      {
        path: 'management*',
        name: 'MacroAppLayout',
        component: MacroAppLayout // 可指定任意空组件
      },
      {
        path: 'home',
        name: 'HomeContainer',
        component: HomeContainer,
        meta: {
          title: '主页'
        },
      },
      {
        path: 'example',
        name: 'Example',
        meta: {
          title: '示例模块'
        },
      },
      {
        path: 'example/student',
        name: 'StudentContainer',
        component: StudentContainer,
        meta: {
          title: '学生管理'
        }
      },
      {
        path: 'example/other-demo/home',
        name: 'DemoHome',
        component: DemoHome,
        meta: {
          title: '综合示例'
        }
      },
      {
        path: 'example/other-demo/editor',
        name: 'EditorDemo',
        component: EditorDemo,
        meta: {
          title: '富文本编辑器'
        }
      },
      {
        path: 'example/other-demo/cache',
        name: 'CacheDemo',
        component: CacheDemo,
        meta: {
          title: '缓存示例'
        }
      },
      {
        path: 'guide',
        name: 'GuideContainer',
        component: GuideContainer,
        meta: {
          layout: 'blank-layout'
        }
      },
      {
        path: 'user/login',
        component: LoginContainer,
        name: 'LoginContainer',
        meta: {
          layout: 'login-layout'
        }
      },
      {
        path: 'user/register',
        component: RegisterContainer,
        name: 'RegisterContainer',
        meta: {
          layout: 'login-layout'
        }
      },
      {
        path: 'user/forgotPassword',
        component: ForgotPassword,
        name: 'ForgotPassword',
        meta: {
          layout: 'login-layout'
        }
      },
      {
        path: 'exception/404',
        component: Exception404,
        name: 'Exception404',
        meta: {
          title: '404'
        }
      },
      {
        path: 'exception/401',
        component: Exception401,
        name: 'Exception401',
        meta: {
          title: '401'
        }
      },
      {
        path: 'exception/403',
        component: Exception403,
        name: 'Exception403',
        meta: {
          title: '403'
        }
      },
      {
        path: 'trigger/exception',
        component: TriggerException,
        name: 'TriggerException',
        meta: {
          title: '触发异常'
        }
      },
      {
        path: 'list/search/articles',
        component: ArticlesContainer,
        name: 'ArticlesContainer',
        meta: {
          title: '搜索列表（文章）'
        }
      },
      {
        path: 'account/setting',
        name: 'AccountContainer',
        component: AccountContainer,
        redirect: 'account/setting/base',
        meta: {
          title: '个人设置'
        },
        children: [
          {
            path: 'base',
            component: BaseContainer,
            name: 'BaseContainer',
            meta: {
              title: '个人信息'
            }
          },
          {
            path: 'notification',
            component: NotificationContainer,
            name: 'NotificationContainer',
            meta: {
              title: '新消息通知'
            }
          },
          {
            path: 'update-password',
            component: UpdatePassword,
            name: 'UpdatePassword',
            meta: {
              title: '修改密码'
            }
          },
          {
            path: 'user-status',
            component: UserStatus,
            name: 'UserStatus',
            meta: {
              title: '登录状态'
            }
          }
        ]
      },
      {
        path: 'form/basic-form',
        name: 'BasicForm',
        component: BasicForm,
        meta: {
          title: '基础表单'
        }
      },
      {
        path: 'form/step-form/info',
        name: 'StepForm',
        component: StepForm,
        meta: {
          title: '分步表单'
        }
      },
      {
        path: 'form/dict-form',
        name: 'DictForm',
        component: DictForm,
        meta: {
          title: '字典表单'
        }
      },
      {
        path: 'form/advanced-form',
        name: 'AdvancedForm',
        component: AdvancedForm,
        meta: {
          title: '高级表单'
        }
      },
      {
        path: 'profile/basic',
        name: 'BasicProfile',
        component: BasicProfile,
        meta: {
          title: '基础详情页'
        }
      },
      {
        path: 'profile/advanced',
        name: 'Advanced',
        component: Advanced,
        meta: {
          title: '高级详情页'
        }
      },
      {
        path: 'result/success',
        name: 'Success',
        component: Success,
        meta: {
          title: '成功'
        }
      },
      {
        path: 'result/fail',
        name: 'Failed',
        component: Failed,
        meta: {
          title: '失败'
        }
      },
      {
        path: 'list/table-list',
        name: 'TableList',
        component: TableList,
        meta: {
          title: '查询表格'
        }
      },
      {
        path: 'list/basic-list',
        name: 'BasicList',
        component: BasicList,
        meta: {
          title: '标准列表'
        }
      },
      {
        path: 'list/card-list',
        name: 'CardList',
        component: CardList,
        meta: {
          title: '卡片列表'
        }
      },
      {
        path: 'list/search/projects',
        component: Projects,
        name: 'Projects',
        meta: {
          title: '搜索列表（项目）'
        }
      },
      {
        path: 'list/search/applications',
        component: Applications,
        name: 'Applications',
        meta: {
          title: '搜索列表（应用）'
        }
      },
      {
        path: 'chart/analysis',
        component: Analysis,
        name: 'Analysis',
        meta: {
          title: '分析页'
        }
      },
      {
        path: 'chart/monitor',
        component: Monitor,
        name: 'Monitor',
        meta: {
          title: '分析页'
        }
      }
    ]
  }
];

export default routes;