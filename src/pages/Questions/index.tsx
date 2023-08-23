import React, { useEffect } from 'react';
import { message, notification } from 'antd';
import { toLoginPage } from '@/utils/businessUtils';
import QuestionQueryList from '@/components/QuestionQueryList';
import { useModel } from '@@/plugin-model/useModel';
import type { CurrentUser } from '@/models/user';
import { gameState } from '@/games/gameState';
import './style.less';

interface QuestionsProps {
  match: any;
  location: {
    pathname: string;
    query: {
      q?: string;
    };
  };
}

/**
 * 题目大全页
 *
 * @param props
 * @constructor
 * @author yupili https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
const Questions: React.FC<QuestionsProps> = (props) => {
  const { location, match } = props;
  const searchText = location.query.q;
  const { initialState } = useModel('@@initialState');
  const { currentUser = {} as CurrentUser } = initialState || {};
  const { key } = match.params;

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    window.scrollTo(0, 0);
    if (gameState.gameTip) {
      setTimeout(() => {
        notification.info({
          message: '竟然有 60000 多个题目，要是都能拿到就好了嘿嘿嘿 😋 看看数据是怎么请求来的？',
          duration: 6000,
        });
      }, 5000);
    }
  }, []);

  // 登录后才允许搜索
  if (searchText !== undefined && !currentUser._id) {
    message.info('登录后才能搜索哦');
    toLoginPage();
    return <></>;
  }

  return (
    <div className="questions">
      {/* 提取问题查找列表为单独组件 */}
      <QuestionQueryList searchText={searchText} tagKey={key} />
    </div>
  );
};

export default Questions;
