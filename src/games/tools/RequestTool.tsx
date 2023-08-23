import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, message, Modal } from 'antd';
import 'intro.js/introjs.css';
import { doGameUnitSucceed } from '@/games/gameState';

export interface RequestToolProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

/**
 * 请求工具
 * @param props
 * @constructor
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
const RequestTool: React.FC<RequestToolProps> = (props) => {
  const { visible, setVisible } = props;

  const [inputValue, setInputValue] = useState<string>('');
  const [inputParams, setInputParams] = useState<string>('');
  const [requestNum, setRequestNum] = useState<number>(1);

  const mockRequestMessage = () => {
    for (let i = 0; i < 3; i++) {
      message.success('请求成功');
    }
    for (let i = 0; i < Math.min(30, requestNum - 3); i++) {
      message.error('请求失败，烫烫烫烫烫！');
    }
  };

  return (
    <Modal
      title="请求工具"
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <p>
        <Form.Item label="请求地址">
          <Input
            prefix={window.location.host + '/'}
            placeholder="请输入地址"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="请求参数">
          <Input
            placeholder="例如：a=1&b=2&c=3"
            value={inputParams}
            onChange={(e) => {
              setInputParams(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="请求次数">
          <InputNumber
            placeholder="要重复发送多少次"
            value={requestNum}
            min={1}
            onChange={(value) => {
              if (value) {
                setRequestNum(value);
              }
            }}
          />
        </Form.Item>
      </p>
      <Button
        type="primary"
        onClick={() => {
          const searchParams = new URLSearchParams('?' + inputParams);
          const pageSize = searchParams.get('pageSize');
          const pageNum = searchParams.get('pageNum');
          // 非法爬虫
          if (inputValue.includes('question/search')) {
            let success = false;
            if (pageSize && Number(pageSize) > 20) {
              success = true;
            } else if (pageNum && Number(pageNum) > 50) {
              success = true;
            }
            if (success) {
              message.success('请求成功，数据到手！');
              doGameUnitSucceed('spider');
              return;
            }
            if (requestNum > 100) {
              mockRequestMessage();
              doGameUnitSucceed('visitCostApi');
            } else {
              message.success('请求成功，毫发无损');
            }
          } else if (inputValue.includes('question/view')) {
            if (requestNum > 100) {
              mockRequestMessage();
              doGameUnitSucceed('viewInfinite');
            }
          } else if (inputValue.includes('delete')) {
            const id = searchParams.get('id');
            if (id) {
              message.success('操作成功');
              doGameUnitSucceed('opBypass');
            }
          } else if (inputValue.includes('touxiang.jpg')) {
            if (requestNum > 100) {
              mockRequestMessage();
              doGameUnitSucceed('visitBigPicture');
            } else {
              message.success('请求成功，毫发无损');
            }
          } else {
            message.error('请求失败');
          }
        }}
      >
        执行
      </Button>
    </Modal>
  );
};

export default RequestTool;
