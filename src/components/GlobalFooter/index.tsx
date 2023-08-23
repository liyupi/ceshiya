import { DefaultFooter } from '@ant-design/pro-layout';
import { GithubOutlined, SketchOutlined, WechatOutlined } from '@ant-design/icons';
import React from 'react';

/**
 * 全局底部组件
 * @constructor
 * @author liyupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
const GlobalFooter: React.FC = () => {
  return (
    <DefaultFooter
      copyright="2023 测逝鸭 | 沪ICP备19026706号-3"
      links={[
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 代码开源
            </>
          ),
          href: 'https://github.com/liyupi/ceshiya',
          blankTarget: true,
        },
        {
          key: 'learn',
          title: (
            <>
              <SketchOutlined /> 编程学习圈
            </>
          ),
          href: 'https://yupi.icu',
          blankTarget: true,
        },
        {
          key: 'contact',
          title: (
            <>
              <WechatOutlined /> 联系作者
            </>
          ),
          href: 'https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default GlobalFooter;
