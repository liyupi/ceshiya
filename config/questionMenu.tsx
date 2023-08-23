import { MenuDataItem } from '@ant-design/pro-layout';
import {
  AimOutlined,
  BranchesOutlined,
  CodeOutlined,
  FieldBinaryOutlined,
  TagsOutlined,
} from '@ant-design/icons';

/**
 * 题目菜单项
 * @author liyupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
export default [
  {
    path: '/tag/language',
    name: '编程语言',
    icon: <CodeOutlined />,
    children: [
      {
        path: '/tag/java',
        name: 'java',
      },
      {
        path: '/tag/python',
        name: 'python',
      },
      {
        path: '/tag/cpp',
        name: 'c++',
      },
      {
        path: '/tag/c',
        name: 'c 语言',
      },
      {
        path: '/tag/golang',
        name: 'golang',
      },
      {
        path: '/tag/javascript',
        name: 'javascript',
      },
      {
        path: '/tag/php',
        name: 'php',
      },
      {
        path: '/tag/csharp',
        name: 'c#',
      },
    ],
  },
  {
    path: '/tag/knowledge',
    name: '学科知识',
    icon: <FieldBinaryOutlined />,
    children: [
      {
        path: '/tag/数据结构',
        name: '数据结构',
      },
      {
        path: '/tag/算法',
        name: '算法',
      },
      {
        path: '/tag/软件工程',
        name: '软件工程',
      },
      {
        path: '/tag/数据库',
        name: '数据库',
      },
      {
        path: '/tag/操作系统',
        name: '操作系统',
      },
      {
        path: '/tag/网络',
        name: '网络',
      },
      {
        path: '/tag/设计模式',
        name: '设计模式',
      },
      {
        path: '/tag/分布式',
        name: '分布式',
      },
      {
        path: '/tag/linux',
        name: 'Linux',
      },
    ],
  },
  {
    path: '/tag/goal',
    name: '备战目标',
    icon: <AimOutlined />,
    children: [
      {
        path: '/tag/实习',
        name: '实习',
      },
      {
        path: '/tag/校招',
        name: '校招',
      },
      {
        path: '/tag/社招',
        name: '社招',
      },
      {
        path: '/tag/比赛',
        name: '比赛',
      },
      {
        path: '/tag/考试',
        name: '考试',
      },
      {
        path: '/tag/考研',
        name: '考研',
      },
      {
        path: '/tag/考证',
        name: '考证',
      },
    ],
  },
  {
    path: '/tag/domain',
    name: '领域方向',
    icon: <BranchesOutlined />,
    children: [
      {
        path: '/tag/前端',
        name: '前端',
      },
      {
        path: '/tag/后端',
        name: '后端',
      },
      {
        path: '/tag/人工智能',
        name: '人工智能',
      },
      {
        path: '/tag/大数据',
        name: '大数据',
      },
      {
        path: '/tag/云计算',
        name: '云计算',
      },
      {
        path: '/tag/物联网',
        name: '物联网',
      },
      {
        path: '/tag/测试',
        name: '软件测试',
      },
      {
        path: '/tag/android',
        name: 'Android 开发',
      },
      {
        path: '/tag/ios',
        name: 'IOS 开发',
      },
      {
        path: '/tag/运维',
        name: '运维',
      },
      {
        path: '/tag/安全',
        name: '安全',
      },
      {
        path: '/tag/产品',
        name: '产品',
      },
      {
        path: '/tag/设计',
        name: '设计',
      },
      {
        path: '/tag/小程序',
        name: '小程序',
      },
      {
        path: '/tag/区块链',
        name: '区块链',
      },
    ],
  },
  {
    path: '/tags',
    name: '标签大全',
    icon: <TagsOutlined />,
  },
  {
    path: '/tag/:key',
  },
] as MenuDataItem[];
