import React, { useState } from 'react';
import { Button, Divider, message, Modal, Space } from 'antd';
import { BAD_TEXT_MAP, gameState, SERVER_IP } from '@/games/gameState';
import 'intro.js/introjs.css';
import copy from 'copy-to-clipboard';
import { history } from 'umi';
import BlastTool from '@/games/tools/BlastTool';
import RequestTool from '@/games/tools/RequestTool';
import BadTool from '@/games/tools/BadTool';
import Text from 'antd/lib/typography/Text';

export interface ToolBoxProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

/**
 * 工具面板
 * @param props
 * @constructor
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
const ToolBox: React.FC<ToolBoxProps> = (props) => {
  const { visible, setVisible } = props;

  const [imgSrc, setImgSrc] = useState('');

  const [showBlastTool, setShowBlastTool] = useState<boolean>(false);
  const [showRequestTool, setShowRequestTool] = useState<boolean>(false);
  const [showBadTool, setShowBadTool] = useState<boolean>(false);

  const doCopy = (text: string) => {
    copy(text);
    message.success('内容已复制');
    if (gameState.gameTip) {
      message.success('快找个地方提交吧！');
    }
  };

  return (
    <>
      <Modal
        title={<>工具包 🔧</>}
        visible={visible}
        footer={null}
        destroyOnClose
        onCancel={() => setVisible(false)}
      >
        <h3>内容生成器</h3>
        <p>
          <Space wrap>
            <Button onClick={() => doCopy(BAD_TEXT_MAP.RUBBISH)}>生成灌水内容</Button>
            <Button onClick={() => doCopy(BAD_TEXT_MAP.AD)}>生成营销广告</Button>
            <Button onClick={() => doCopy(BAD_TEXT_MAP.FUCK)}>生成粗鄙之语</Button>
            <Button onClick={() => doCopy(BAD_TEXT_MAP.FAKE)}>生成虚假内容</Button>
            <Button onClick={() => setImgSrc(BAD_TEXT_MAP.YELLOW)}>生成好康的图</Button>
            {imgSrc && (
              <>
                <p style={{ marginTop: 16 }}>已生成，请右键复制：</p>
                <img src={imgSrc} alt="yellow-color-picture" />
              </>
            )}
          </Space>
        </p>
        <h3>专业工具</h3>
        <p>
          <Space wrap>
            <Button
              onClick={() =>
                Modal.success({
                  content: (
                    <>
                      <p>按右键，选择查看网页源代码。</p>
                      {gameState.gameTip ? <p>鱼皮应该不会傻到把密码写到页面里~ 😋</p> : ''}
                    </>
                  ),
                })
              }
            >
              查看网页源代码
            </Button>
            <Button
              onClick={() =>
                Modal.success({
                  title: 'IP 获取成功',
                  content: (
                    <>
                      <Text copyable>{SERVER_IP}</Text>
                    </>
                  ),
                })
              }
            >
              IP 获取
            </Button>
            <Button
              onClick={() => {
                Modal.success({
                  title: '扫描结果 - 网站目录',
                  content: (
                    <>
                      {gameState.gameTip && '好像有些页面没访问过？'}
                      <Divider />
                      {[
                        '/',
                        '/User/login',
                        '/questions',
                        '/ranking',
                        '/account',
                        '/op',
                        '/op/question',
                      ].map((item) => {
                        return (
                          <p key={item} onClick={() => history.push(item)}>
                            <a>{location.host + item}</a>
                          </p>
                        );
                      })}
                    </>
                  ),
                });
              }}
            >
              网站目录扫描
            </Button>
            <Button onClick={() => setShowBlastTool(true)}>暴力破解工具</Button>
            <Button onClick={() => setShowRequestTool(true)}>请求工具</Button>
            <Button danger onClick={() => setShowBadTool(true)}>
              恶人工具（慎用）
            </Button>
          </Space>
        </p>
      </Modal>
      <BlastTool visible={showBlastTool} setVisible={setShowBlastTool} />
      <RequestTool visible={showRequestTool} setVisible={setShowRequestTool} />
      <BadTool visible={showBadTool} setVisible={setShowBadTool} />
    </>
  );
};

export default ToolBox;
