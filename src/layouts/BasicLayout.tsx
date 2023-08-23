import type { BasicLayoutProps as ProLayoutProps, MenuDataItem } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { history, Link, useAccess } from 'umi';
import RightContent from '@/components/GlobalHeader/RightContent';
import GlobalFooter from '@/components/GlobalFooter';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import defaultSettings from '../../config/defaultSettings';
import menu from '../../config/headerMenu';
import { SLOGAN } from '@/constant';
import { useModel } from '@@/plugin-model/useModel';
import type { AccessType } from '@/access';
import { Inspector } from 'react-dev-inspector';
import AffixQuestionDrawer from '@/components/AffixQuestionDrawer';
import { isMobile } from '@/utils/utils';
import SYSTEM_LOGO from '@/assets/logo.png';
import './BasicLayout.less';

const isDev = process.env.NODE_ENV === 'development';
const InspectorWrapper = isDev ? Inspector : React.Fragment;

export interface BasicLayoutProps extends ProLayoutProps {
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
}

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[], access: AccessType): MenuDataItem[] => {
  return menuList.filter((menuItem) => {
    return !menuItem.access || access[menuItem.access];
  });
};

/**
 * 基础布局
 * @param props
 * @constructor
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children } = props;

  const { fetchTagsMap } = useModel('tag');
  const access = useAccess();

  useEffect(() => {
    fetchTagsMap();
  }, []);

  // 被永久封号（不显示封号提示，制造错觉）
  if (access.isBan) {
    return <></>;
  }

  return (
    <HelmetProvider>
      <InspectorWrapper keys={['control', 'shift', 'command', 'c']} disableLaunchEditor={false}>
        <Helmet>
          <title>测试鸭 - {SLOGAN}</title>
        </Helmet>
        <ProLayout
          className="basic-layout"
          logo={
            <Link to="/" title="测试鸭">
              <img src={SYSTEM_LOGO} alt="测试鸭" title="测试鸭" />
            </Link>
          }
          {...props}
          {...defaultSettings}
          headerTheme="light"
          layout="mix"
          splitMenus
          contentStyle={
            isMobile()
              ? {
                  marginLeft: 0,
                  marginRight: 0,
                }
              : {}
          }
          onMenuHeaderClick={() => history.push('/')}
          menuItemRender={(menuItemProps, defaultDom) => {
            if (menuItemProps.isUrl || !menuItemProps.path) {
              return defaultDom;
            }
            return <Link to={menuItemProps.path}>{defaultDom}</Link>;
          }}
          footerRender={() => <GlobalFooter />}
          menuDataRender={() => menuDataRender(menu, access)}
          rightContentRender={() => <RightContent />}
        >
          {children}
        </ProLayout>
        {history.location.pathname === '/addPaper' ? null : <AffixQuestionDrawer />}
      </InspectorWrapper>
    </HelmetProvider>
  );
};

export default BasicLayout;
