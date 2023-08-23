import type { Settings as ProSettings } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import AvatarDropdown from './AvatarDropdown';
import HeaderSearch from '@/components/HeaderSearch';
import { Link, useLocation } from 'umi';
import { isMobile } from '@/utils/utils';
import styles from './index.less';
import { gameState } from '@/games/gameState';

type GlobalHeaderRightProps = Partial<ProSettings>;

/**
 * 全局菜单右侧
 * @constructor
 * @author liyupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = () => {
  const location = useLocation();
  // @ts-ignore
  const [searchText, setSearchText] = useState<string>(location.query.q);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/addQuestion">上传题目</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.right}>
      <div style={{ width: '40vw' }}>
        <HeaderSearch
          value={searchText}
          placeholder={'全站搜索面试题目' + (gameState.gameTip ? '（这里没有 Bug）' : '')}
          onChange={(value) => {
            setSearchText(value);
          }}
        />
      </div>
      {!isMobile() && (
        <Dropdown overlay={menu} placement="bottom">
          <Link to="/addQuestion">
            <Button
              type="primary"
              className="uploadDropdown"
              style={{ marginLeft: 24, marginRight: 8 }}
            >
              上传
            </Button>
          </Link>
        </Dropdown>
      )}
      <AvatarDropdown />
    </div>
  );
};

export default GlobalHeaderRight;
