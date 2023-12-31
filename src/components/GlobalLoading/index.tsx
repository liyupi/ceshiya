import { Spin } from 'antd';
import React from 'react';

/**
 * 空 Loading 组件，用于按需加载
 *
 * @author liyupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
const GlobalLoading: React.FC = () => {
  return (
    <div
      style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}
    >
      <Spin size="large" />
    </div>
  );
};

export default GlobalLoading;
