import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { doGameUnitSucceed, gameState } from '@/games/gameState';
import 'intro.js/introjs.css';

export interface BlastToolProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

/**
 * 暴力破解工具
 * @param props
 * @constructor
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
const BlastTool: React.FC<BlastToolProps> = (props) => {
  const { visible, setVisible } = props;

  const [useDict, setUseDict] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const dict = new Array(1000)
    .fill(0)
    .map((_, index) => {
      return 555000 + index;
    })
    .join('\n');

  return (
    <Modal
      title="🔪 暴力破解工具"
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={() => setVisible(false)}
    >
      {gameState.gameTip && <p>要是能拿到鱼皮的登录码，嘿嘿嘿 🤤</p>}
      <Form.Item label="地址">
        <Input
          prefix={window.location.host + '/'}
          placeholder="请输入目标地址"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </Form.Item>
      <p>
        使用字典：
        <Switch
          onChange={(value) => {
            setUseDict(value);
          }}
        />
      </p>
      {useDict && (
        <p>
          <p>字典列表：</p>
          <TextArea rows={6} readOnly value={dict} />
        </p>
      )}
      <Button
        danger
        type="primary"
        onClick={() => {
          // 爆破登录接口
          if (inputValue.includes('api/User/login') && useDict) {
            Modal.success({
              title: '破解成功',
              content: '管理员密码：555555',
              onOk: () => {
                doGameUnitSucceed('blastPassword');
              },
            });
          } else {
            message.error('破解失败');
          }
        }}
      >
        执行
      </Button>
    </Modal>
  );
};

export default BlastTool;
