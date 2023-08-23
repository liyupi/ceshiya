import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, message, Modal, Space } from 'antd';
import 'intro.js/introjs.css';
import { doGameUnitSucceed, SERVER_IP } from '@/games/gameState';

export interface BlastToolProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

/**
 * 恶人工具
 * @param props
 * @constructor
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 **/
const BadTool: React.FC<BlastToolProps> = (props) => {
  const { visible, setVisible } = props;

  const [userRange, setUserRange] = useState<string[]>(['国内']);
  const [requestNum, setRequestNum] = useState<number>(1);
  const [frequency, setFrequency] = useState<number>(1);
  const [ip, setIp] = useState<string>('');

  const userRangeOptions = ['国内', '国外', '全球'];

  return (
    <Modal
      title="😡 恶人工具"
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Form.Item label="恶人数">
        <InputNumber
          value={requestNum}
          max={100000000}
          min={1}
          onChange={(value) => {
            if (value) {
              setRequestNum(value);
            }
          }}
        />
      </Form.Item>
      <Form.Item label="目标地址">
        <Input
          placeholder="IP:端口号"
          value={ip}
          onChange={(e) => {
            setIp(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="操作频率">
        <InputNumber
          value={frequency}
          max={100000000}
          min={1}
          addonAfter="次 / 秒"
          onChange={(value) => {
            if (value) {
              setFrequency(value);
            }
          }}
        />
      </Form.Item>
      <Form.Item label="恶人分布">
        <Checkbox.Group
          options={userRangeOptions}
          value={userRange}
          onChange={(values) => setUserRange(values as string[])}
        />
      </Form.Item>
      <p>恶人操作：</p>
      <Space>
        <Button
          danger
          onClick={() => {
            // CC
            if (requestNum >= 100000) {
              if (SERVER_IP !== ip) {
                message.error('往哪儿打呢？');
                return;
              }
              doGameUnitSucceed('cc');
              window.open(SERVER_IP);
            } else {
              message.success('操作成功');
            }
          }}
        >
          直接访问
        </Button>
        <Button
          danger
          onClick={() => {
            if (frequency * requestNum >= 100000) {
              if (SERVER_IP !== ip) {
                message.error('往哪儿打呢？');
                return;
              }
              window.open(SERVER_IP);
              // dos
              if (requestNum === 1) {
                doGameUnitSucceed('dos');
              } else {
                // ddos
                doGameUnitSucceed('ddos');
              }
            } else {
              message.success('操作成功');
            }
          }}
        >
          发 UDP 包
        </Button>
      </Space>
    </Modal>
  );
};

export default BadTool;
