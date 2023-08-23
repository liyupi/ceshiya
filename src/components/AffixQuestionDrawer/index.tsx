import React, { useEffect, useState } from 'react';
import { Affix, Button, Drawer, message, Space } from 'antd';
import { useSelector } from 'umi';
import PickedQuestionList from '@/components/PickedQuestionList';
import { doGameUnitSucceed, gameState } from '@/games/gameState';
import './index.less';

/**
 * 题目抽屉按钮
 * @constructor
 * @author liyupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
const AffixQuestionDrawer: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const { pickedQuestions } = useSelector((state: any) => state.editPaper);

  useEffect(() => {
    let timeout: any;
    if (drawerVisible && gameState.gameTip) {
      timeout = setTimeout(() => {
        message.info('把所有题目都取消掉会怎么样呢？');
      }, 3000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [drawerVisible]);

  return (
    <div className="affix-question-drawer">
      {drawerVisible ? null : (
        <Affix className="affix">
          <Button
            style={{
              height: 'auto',
              padding: 4,
            }}
            type="primary"
            onClick={() => setDrawerVisible(true)}
          >
            <div>试</div>
            <div>题</div>
            <div>篮</div>
          </Button>
        </Affix>
      )}
      <Drawer
        title="试题篮（仅本地保存）"
        placement="right"
        width="80%"
        contentWrapperStyle={{ maxWidth: 800 }}
        bodyStyle={{ padding: 0 }}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <PickedQuestionList showTitle={false} />
        <div style={{ textAlign: 'center' }}>
          <Space size={16}>
            <Button
              type="primary"
              onClick={() => {
                const totalPickedQuestionNum = Object.keys(pickedQuestions)
                  .map((key) => pickedQuestions[key].length)
                  .reduce((previousValue, currentValue) => {
                    return previousValue + currentValue;
                  });
                if (!totalPickedQuestionNum) {
                  doGameUnitSucceed('noQuestionAddPaper');
                }
              }}
            >
              组卷
            </Button>
          </Space>
        </div>
      </Drawer>
    </div>
  );
};

export default AffixQuestionDrawer;
