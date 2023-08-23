import type { PageResult, PageSearchParams } from '@/services/common';
import type { MessageType } from '@/models/message';
import { MOCK_MESSAGE_LIST } from '@/mock';

export interface MessageSearchParams extends PageSearchParams {
  status?: number;
  type?: number;
}

/**
 * 获取当前用户收到的消息（支持分页）
 * @param params
 */
export async function searchMessages(
  params: MessageSearchParams,
): Promise<PageResult<MessageType>> {
  const defaultValue = {
    total: 0,
    data: [],
  };

  if (!params) {
    return defaultValue;
  }

  return {
    total: MOCK_MESSAGE_LIST.length,
    data: MOCK_MESSAGE_LIST,
  };
}

/**
 * 删除消息
 * @param messageId
 */
export function deleteMessage(messageId: string) {
  if (!messageId) {
    return false;
  }

  return true;
}

/**
 * 删除全部消息
 */
export function deleteAllMessages() {
  return true;
}

/**
 * 阅读消息
 * @param messageId
 */
export function readMessage(messageId: string) {
  if (!messageId) {
    return false;
  }

  return true;
}

/**
 * 阅读全部消息
 * @param messageId
 */
export function readAllMessages() {
  return true;
}

/**
 * 获取当前用户收到的消息数
 * @param params
 */
export async function countMyMessages(params: MessageSearchParams) {
  if (!params) {
    return 0;
  }

  return MOCK_MESSAGE_LIST.length;
}
