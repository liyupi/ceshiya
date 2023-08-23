import React, { useEffect } from 'react';
import { doGameUnitSucceed } from '@/games/gameState';

/**
 * 法律信息
 * @constructor
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
const Law: React.FC = () => {
  useEffect(() => {
    return () => {
      doGameUnitSucceed('readLaw');
    };
  }, []);

  return (
    <>
      <iframe width="100%" height="100%" src="https://www.hongjibp.com/laws-14402.html" />
    </>
  );
};

export default Law;
