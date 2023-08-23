import React from 'react';
import { Popover } from 'antd';
import { Link } from 'umi';
import type { SimpleUser } from '@/models/user';
import UserInfoCard from '@/components/UserInfoCard';
import { useAccess } from '@@/plugin-access/access';
import './style.less';

interface UserInfoCardPopoverProps {
  user?: SimpleUser;
  children: React.ReactNode;
}

/**
 * 用户信息卡片悬浮框
 * @param props
 * @constructor
 * @author yupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
// @ts-ignore
const UserInfoCardPopover: React.FC<UserInfoCardPopoverProps> = (props) => {
  const { user, children } = props;
  const access = useAccess();

  if (!user) {
    return <></>;
  }

  return access.canAdmin ? (
    <Popover content={<UserInfoCard user={user} />} trigger="hover">
      <Link to={`/ud/${user._id}`} className="my-link">
        {children}
      </Link>
    </Popover>
  ) : (
    children
  );
};

export default UserInfoCardPopover;
