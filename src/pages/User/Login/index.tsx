import { Button, Image, message, Tabs, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { LoginParamsType } from '@/services/login';
import { QrcodeOutlined } from '@ant-design/icons/lib';
import { QR_CODE } from '@/constant';
import styles from './index.less';
import { login } from '@/services/login';
import { useModel } from '@@/plugin-model/useModel';
import { DEFAULT_USER_CAPTCHA, doGameUnitSucceed, gameState } from '@/games/gameState';

/**
 * 用户登录
 *
 * @constructor
 * @author yupili https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
const Login: React.FC = () => {
  const [type, setType] = useState<string>('scan');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [captchaCount, setCaptchaCount] = useState<number>(0);
  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCaptchaCount(0);
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleSubmit = async (values: LoginParamsType) => {
    let { captcha = '' } = values;
    captcha = captcha.trim();
    if (!captcha || captcha.length !== 6) {
      message.error('请输入 6 位动态码！');
      return;
    }
    values.captcha = captcha;
    setSubmitting(true);
    const currentUser = await login(values);
    if (currentUser) {
      message.success('登录成功');
      await setInitialState({ ...initialState, currentUser });
    } else {
      message.error('登录失败，请检查验证码后重试！');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.main}>
      <ProForm
        isKeyPressSubmit
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async (values) => {
          handleSubmit(values as LoginParamsType);
        }}
      >
        <Tabs activeKey={type} onChange={setType} centered>
          <Tabs.TabPane key="scan" tab="拿硬币砸『 程序员鱼皮 』登录" />
        </Tabs>
        {type === 'scan' && (
          <>
            <Image preview={false} src={QR_CODE} className={styles.qrcode} />
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <QrcodeOutlined className={styles.prefixIcon} />,
                addonAfter: (
                  <>
                    <Tooltip
                      title={
                        '点击获取动态码，30 秒一次' + (gameState.gameTip ? '，发送码不要钱！' : '')
                      }
                      placement="topRight"
                    >
                      <Button
                        type="text"
                        size="small"
                        style={{ fontSize: 18 }}
                        onClick={() => {
                          const nextCount = captchaCount + 1;
                          if (nextCount === 5) {
                            doGameUnitSucceed('tooFrequentCaptcha');
                            message.error('动态码发送过于频繁');
                            return;
                          }
                          setCaptchaCount(nextCount);
                          message.success('普通用户动态码：' + DEFAULT_USER_CAPTCHA);
                        }}
                      >
                        🪙
                      </Button>
                    </Tooltip>
                  </>
                ),
              }}
              name="captcha"
              placeholder="请输入6位动态码"
              rules={[
                {
                  required: true,
                  message: '动态码是必填项！',
                },
              ]}
            />
          </>
        )}
      </ProForm>
    </div>
  );
};

export default Login;
