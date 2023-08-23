import { MenuDataItem } from '@ant-design/pro-layout';
import {
  BellOutlined,
  FileOutlined,
  GithubOutlined,
  HomeOutlined,
  MessageOutlined,
  SafetyOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import questionMenu from './questionMenu';

/**
 * 顶部菜单项
 * @author liyupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
export default [
  {
    path: '/',
    name: '首页',
    icon: <HomeOutlined />,
  },
  {
    path: '/questions',
    name: '题目',
    icon: <FileOutlined />,
    children: questionMenu,
  },
  {
    path: '/account',
    name: '个人',
    icon: <UserOutlined />,
    children: [
      {
        name: '个人资料',
        path: '/account/info',
        icon: <UserOutlined />,
      },
      {
        name: '我的收藏',
        path: '/account/favour',
        icon: <StarOutlined />,
      },
      {
        name: '我的题目',
        path: '/account/question',
        icon: <FileOutlined />,
      },
      {
        name: '我的回答',
        path: '/account/comment',
        icon: <MessageOutlined />,
      },
      {
        name: '消息通知',
        path: '/account/message',
        icon: <BellOutlined />,
      },
    ],
  },
  {
    path: '/op',
    name: '运营',
    icon: <SafetyOutlined />,
  },
  {
    path: 'https://github.com/liyupi/ceshiya',
    name: '代码开源',
    icon: <GithubOutlined />,
  },
] as MenuDataItem[];
