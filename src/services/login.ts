import { getCurrentUser } from '@/services/user';
import { getPageQuery } from '@/utils/utils';
import { history } from '@@/core/history';
import {
  ADMIN_USER_CAPTCHA,
  DEFAULT_USER_CAPTCHA,
  doGameUnitSucceed,
  LOGIN_STATE_STORAGE_KEY,
  YUPI_USER_CAPTCHA,
} from '@/games/gameState';
import axios from 'axios';
import { message } from 'antd';

export interface LoginParamsType {
  captcha: string;
  type: string;
  userId?: string;
}

/**
 * 用户登录
 * @param loginParams
 */
export async function login(loginParams: LoginParamsType) {
  const { captcha } = loginParams;
  // tcb 登录
  if (!captcha) {
    console.error('login error, no captcha');
    return null;
  }
  // 造一个请求
  try {
    await axios.post('/user/login');
  } catch (e) {}
  // 社会工程暴露密码
  if (captcha === YUPI_USER_CAPTCHA) {
    doGameUnitSucceed('getInfoBypass');
    message.error('嘿嘿，你上当啦！');
    return null;
  }
  if (![ADMIN_USER_CAPTCHA, DEFAULT_USER_CAPTCHA].includes(captcha)) {
    return null;
  }
  const data = true;
  if (!data) {
    return null;
  }
  // 设置登录态
  localStorage.setItem(LOGIN_STATE_STORAGE_KEY, captcha);
  // 获取用户信息
  const currentUser = await getCurrentUser(captcha);
  if (!currentUser || !currentUser._id) {
    return null;
  }
  if (window.location.pathname.startsWith('/User/login')) {
    const urlParams = new URL(window.location.href);
    const params = getPageQuery();
    let { redirect } = params as { redirect: string };
    if (redirect) {
      const redirectUrlParams = new URL(redirect);
      if (redirectUrlParams.origin === urlParams.origin) {
        redirect = redirect.substr(urlParams.origin.length);
        console.log(redirect);
        if (redirect.match(/^\/.*#/)) {
          redirect = redirect.substr(redirect.indexOf('#') + 1);
        }
      } else {
        window.location.href = '/';
        return currentUser;
      }
    }
    history.replace(redirect || '/account/info');
  }
  return currentUser;
}

/**
 * 用户退出登录
 */
export async function logout() {
  localStorage.removeItem(LOGIN_STATE_STORAGE_KEY);
  return true;
}
