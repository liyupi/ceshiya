import type { CurrentUser } from '@/models/user';
import type { PageSearchParams } from '@/services/common';
import { MOCK_ADMIN_USER, MOCK_CURRENT_USER, MOCK_RANK_USER_LIST, MOCK_SIMPLE_USER } from '@/mock';
import { DEFAULT_USER_CAPTCHA, LOGIN_STATE_STORAGE_KEY } from '@/games/gameState';

/**
 * 用户搜索类型
 */
export interface UserSearchParams extends PageSearchParams {
  authority?: string;
}

/**
 * 查询当前用户
 */
export function getCurrentUser(captcha?: string): CurrentUser {
  if (!captcha) {
    // eslint-disable-next-line no-param-reassign
    captcha = localStorage.getItem(LOGIN_STATE_STORAGE_KEY) ?? '';
  }
  if (!captcha) {
    return { _id: '666' } as CurrentUser;
  }
  return captcha === DEFAULT_USER_CAPTCHA ? MOCK_CURRENT_USER : MOCK_ADMIN_USER;
}

/**
 * 查询用户简略信息
 * @param userId
 */
export async function getUserSimpleInfo(userId: string) {
  if (!userId) {
    return null;
  }

  return MOCK_SIMPLE_USER;
}

/**
 * 更新用户
 * @param user
 */
export function updateUser(user: Partial<CurrentUser>): any {
  if (!user) {
    return false;
  }

  return true;
}

/**
 * 查询用户积分总排行
 * @param pageSize
 * @param pageNum
 */
export function listUserTotalRank(pageSize: number = 10, pageNum: number = 1) {
  return MOCK_RANK_USER_LIST;
}

/**
 * 查询指定用户的积分排行
 * @param userId
 */
export function getUserRank(userId: string) {
  if (!userId) {
    return -1;
  }
  return 1;
}

/**
 * 查询用户周期积分排行
 * @param cycle
 * @param countDate
 * @param pageSize
 */
export async function listUserCycleRank(
  cycle: number = 0,
  countDate: string,
  pageSize: number = 10,
) {
  if (cycle < 0 || cycle > 1 || !countDate) {
    return [];
  }

  return MOCK_RANK_USER_LIST;
}

/**
 * 封号 / 解封用户
 * @param userId
 */
export function banUser(userId: string) {
  if (!userId) {
    return false;
  }
  return true;
}
