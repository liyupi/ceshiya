import React, { useEffect, useState } from 'react';
import { Affix, Button, Divider, List, message, Modal, Space } from 'antd';
import { BugOutlined, LinkOutlined, ToolOutlined } from '@ant-design/icons';
import { Steps } from 'intro.js-react';
import { gameState, updateGameState } from '@/games/gameState';
import type { GameUnitType } from '@/games/gameUnit';
import { GAME_UNIT_LIST, GAME_UNIT_MAP, TOTAL_GAME_SCORE } from '@/games/gameUnit';
import ToolBox from '@/games/ToolBox';
import 'intro.js/introjs.css';

/**
 * 游戏盒属性
 */
export interface GameBoxProps {
  // 啥都没有，可以自定义一些全局属性
}

/**
 * 全局游戏盒
 * @constructor
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
const GameBox: React.FC<GameBoxProps> = () => {
  const [steps] = useState([
    {
      title: '欢迎来到测逝鸭 🦆',
      intro: '这是一个锻炼你网络安全能力的破站，准备好旅程了么？🧑🏻‍🦲',
      position: 'top',
    },
    {
      title: '目标 🎯',
      intro:
        '你要做的就是运用你的智慧和强大的洞察力，尽可能多地发现并利用该网站的 Bug、对网站造成破坏！🦖',
      nextLabel: '应该的应该的',
    },
    {
      title: 'Bug 可能藏在哪？🤔',
      intro: '不要放过页面上的任何按钮和输入框！90% 的 Bug 都源于用户 🐶',
      element: '.do-favour-0',
      nextLabel: '小菜一碟',
    },
    {
      title: '奖励 💰',
      intro:
        '每当找到 Bug 或成功攻击网站，都能帮助鱼皮提升血鸭。请注意，血鸭值仅在当前浏览器累积！',
      nextLabel: '冲冲冲',
    },
    {
      title: '工具包 🔧',
      intro: '鱼皮担心你不会攻击他的网站，贴心地提供了工具包，三连可使用 🪙',
      element: '.game-tools',
      nextLabel: '那必须给！',
    },
    {
      title: '游戏面板 🎮',
      intro: '点击这里查看鱼皮的血鸭 🦆、已发现的 Bug，获取提示、交流讨论等 🙋🏻‍',
      element: '.game-state',
    },
    {
      title: '加油吧少年 💪🏻',
      intro: '期待这个网站帮你打开编程兴趣的大门！',
    },
  ]);

  const [enabled, setEnabled] = useState(false);
  const [showStateBoard, setShowStateBoard] = useState<boolean>(false);
  const [showToolBox, setShowToolBox] = useState<boolean>(false);
  const [list, setList] = useState<GameUnitType[]>([]);

  const [options, setOptions] = useState({
    nextLabel: '知道了知道了',
    prevLabel: '上一步',
    doneLabel: '冲！我未来可期',
    exitOnEsc: false,
    exitOnOverlayClick: false,
    showBullets: false,
    overlayOpacity: 0.8,
  });

  useEffect(() => {
    setTimeout(() => {
      if (gameState?.init) {
        setEnabled(true);
      }
    }, 1500);
    setList(
      gameState.succeedUnitList.map((item) => GAME_UNIT_MAP[item]).sort((a, b) => a.no - b.no),
    );
  }, [gameState]);

  return (
    <>
      <Steps
        enabled={enabled}
        options={options}
        steps={steps}
        initialStep={0}
        onExit={() => {
          gameState.init = false;
          updateGameState(gameState);
        }}
        onBeforeChange={(nextStepIndex) => {
          const nextLabel = steps[nextStepIndex]?.nextLabel ?? '知道了知道了';
          setOptions({
            ...options,
            nextLabel,
          });
        }}
      />
      <Modal
        title="游戏面板 🎮"
        visible={showStateBoard}
        footer={null}
        destroyOnClose
        onCancel={() => setShowStateBoard(false)}
      >
        <p>
          鱼皮的血鸭：{gameState.score} / {TOTAL_GAME_SCORE} 🦆
        </p>
        <Space>
          <Button
            danger={gameState.gameTip}
            onClick={() => {
              updateGameState({
                ...gameState,
                gameTip: !gameState.gameTip,
              });
              message.success('操作成功');
            }}
          >
            {gameState.gameTip ? '关闭' : '开启'}提示
          </Button>
          <Button
            onClick={() =>
              Modal.info({
                icon: false,
                maskClosable: true,
                title: '全部提示（得分点）',
                content: (
                  <List
                    dataSource={GAME_UNIT_LIST}
                    renderItem={(item) => {
                      return (
                        <List.Item key={item.key}>
                          <List.Item.Meta
                            title={`${item.no}. ${item.desc} +${item.score}`}
                            description={
                              <div>
                                小知识：{item.knowledge}
                                {item.href && (
                                  <span>
                                    <br />
                                    <a href={item.href} target="_blank" rel="noreferrer">
                                      <LinkOutlined />
                                      学习更多
                                    </a>
                                  </span>
                                )}
                              </div>
                            }
                          />
                        </List.Item>
                      );
                    }}
                    pagination={{
                      defaultPageSize: 6,
                    }}
                  />
                ),
              })
            }
          >
            查看全部提示
          </Button>
          <Button onClick={() => window.open('https://www.bilibili.com/video/BV1DB4y1m7H8/')}>
            参与讨论
          </Button>
          <Button
            onClick={() =>
              Modal.success({
                icon: false,
                content: (
                  <>
                    当前得分 {gameState.score}，超过 {100 * (gameState.score / TOTAL_GAME_SCORE)} %
                    的同学（估算值）！
                  </>
                ),
              })
            }
          >
            我的排名
          </Button>
        </Space>
        <Divider />
        <div>
          我的发现（{gameState.succeedUnitList.length} / {GAME_UNIT_LIST.length}）：
        </div>
        <List
          dataSource={list}
          renderItem={(item, index) => {
            return (
              <List.Item key={item.key + index}>
                <List.Item.Meta
                  title={`${item.no}. ${item.desc} +${item.score}`}
                  description={
                    <div>
                      小知识：{item.knowledge}
                      {item.href && (
                        <span>
                          <br />
                          <a href={item.href} target="_blank" rel="noreferrer">
                            <LinkOutlined />
                            学习更多
                          </a>
                        </span>
                      )}
                    </div>
                  }
                />
              </List.Item>
            );
          }}
          pagination={{
            defaultPageSize: 6,
          }}
        />
      </Modal>
      <ToolBox visible={showToolBox} setVisible={setShowToolBox} />
      <Affix className="game-tools" style={{ position: 'fixed', right: 50, bottom: 120 }}>
        <Button
          type="primary"
          shape="circle"
          style={{ height: 56, width: 56 }}
          onClick={() => setShowToolBox(true)}
        >
          <ToolOutlined style={{ fontSize: 24 }} />
        </Button>
      </Affix>
      <Affix className="game-state" style={{ position: 'fixed', right: 50, bottom: 50 }}>
        <Button
          danger
          type="primary"
          shape="circle"
          style={{ height: 56, width: 56 }}
          onClick={() => setShowStateBoard(true)}
        >
          <BugOutlined style={{ fontSize: 24 }} />
        </Button>
      </Affix>
    </>
  );
};

export default GameBox;
