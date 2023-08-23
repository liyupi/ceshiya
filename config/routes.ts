/**
 * 路由配置
 * @author liyupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
export default [
  {
    path: '/',
    layout: false,
    component: '../layouts/GlobalLayout',
    routes: [
      {
        path: '/law',
        component: './Law',
      },
      {
        path: '/User',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: '登录',
            path: '/User/login',
            component: './User/Login',
          },
        ],
      },
      {
        path: '/op',
        component: '../layouts/AdminLayout',
        access: 'canUser',
        routes: [
          {
            path: '/op',
            redirect: 'question',
            access: 'canAdmin',
          },
          {
            name: '题目管理',
            path: './question',
            component: './OpCenter/ManageQuestion',
          },
          {
            name: '回答管理',
            path: './comment',
            component: './OpCenter/ManageComment',
          },
          {
            name: '回复管理',
            path: './reply',
            component: './OpCenter/ManageReply',
          },
          {
            name: '举报管理',
            path: './report',
            component: './OpCenter/ManageReport',
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            name: '首页',
            path: '/',
            component: './Index',
          },
          {
            name: '个人中心',
            path: '/account',
            access: 'canUser',
            routes: [
              {
                path: '/account',
                redirect: '/account/info',
              },
              {
                name: '个人资料',
                path: './info',
                component: './AccountCenter/MyInfo',
                wrappers: ['@/wrappers/auth'],
              },
              {
                name: '我的收藏',
                path: './favour',
                component: './AccountCenter/MyFavourQuestions',
                wrappers: ['@/wrappers/auth'],
              },
              {
                name: '我的题目',
                path: './question',
                component: './AccountCenter/MyAddQuestions',
                wrappers: ['@/wrappers/auth'],
              },
              {
                name: '我的回答',
                path: './comment',
                component: './AccountCenter/MyAddComments',
                wrappers: ['@/wrappers/auth'],
              },
              {
                name: '消息通知',
                path: './message',
                component: './AccountCenter/MyMessages',
                wrappers: ['@/wrappers/auth'],
              },
            ],
          },
          {
            name: '题目大全',
            path: '/questions',
            wrappers: ['@/wrappers/auth'],
            component: './Questions',
          },
          {
            name: '题目大全',
            path: '/tag/:key',
            wrappers: ['@/wrappers/auth'],
            component: './Questions',
          },
          {
            name: '排行榜',
            path: '/ranking',
            component: './Ranking',
          },
          {
            name: '标签大全',
            path: '/tags',
            wrappers: ['@/wrappers/auth'],
            component: './Tags',
          },
          {
            name: '题目详情',
            path: '/qd/:id',
            wrappers: ['@/wrappers/auth'],
            component: './QuestionDetail',
            hideInMenu: true,
          },
          {
            name: '题目回答详情',
            path: '/qd/:id/c/:commentId',
            wrappers: ['@/wrappers/auth'],
            component: './QuestionDetail',
            hideInMenu: true,
          },
          {
            name: '题目回答详情',
            path: '/cd/:commentId',
            wrappers: ['@/wrappers/auth'],
            component: './QuestionDetail',
            hideInMenu: true,
          },
          {
            name: '用户空间',
            path: '/ud/:id',
            wrappers: ['@/wrappers/auth'],
            component: './AccountCenter/MyInfo',
            hideInMenu: true,
          },
          {
            name: '上传题目',
            path: '/addQuestion',
            component: './AddQuestion',
            wrappers: ['@/wrappers/auth'],
            hideInMenu: true,
          },
          {
            name: '上传成功',
            path: '/addSucceed',
            component: './AddSucceed',
            access: 'canUser',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    layout: false,
    component: './404',
  },
];
