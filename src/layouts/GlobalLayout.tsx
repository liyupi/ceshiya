import React, { useEffect } from 'react';
import GameBox from '@/games/GameBox';

/**
 * 全局基础布局
 * @param props
 * @constructor
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
const GlobalLayout: React.FC = (props) => {
  const { children } = props;

  useEffect(() => {}, []);

  return (
    <>
      {children}
      <GameBox />
    </>
  );
};

export default GlobalLayout;
