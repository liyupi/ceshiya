import type { ReplyType, ReplyUserType } from '@/models/reply';
import type { PageResult, PageSearchParams } from './common';
import { MOCK_REPLY, MOCK_REPLY_LIST } from '@/mock';
import axios from 'axios';

/**
 * 回复搜索类型
 */
export interface ReplySearchParams extends PageSearchParams {
  commentId?: string;
  replyId?: string;
  questionId?: string;
  userId?: string;
}

/**
 * 新增
 * @param params
 */
export function addReply(params: Partial<ReplyType>) {
  const { content, commentId } = params;
  if (!content || !commentId) {
    return false;
  }

  MOCK_REPLY_LIST.push({ ...MOCK_REPLY, ...params });
  return MOCK_REPLY._id;
}

/**
 * 删除
 * @param replyId
 */
export function deleteReply(replyId: string) {
  if (!replyId) {
    return false;
  }
  // 模拟操作
  try {
    axios.post('/reply/delete?id=' + replyId);
  } catch (e) {}
  return true;
}

/**
 * 分页搜索
 * @param params
 */
export async function searchReplies(params: ReplySearchParams): Promise<PageResult<ReplyUserType>> {
  return {
    data: MOCK_REPLY_LIST,
    total: MOCK_REPLY_LIST.length,
  };
}
