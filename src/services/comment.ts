import type { CommentType, CommentUserType } from '@/models/comment';
import type { PageResult, PageSearchParams } from './common';
import axios from 'axios';
import { MOCK_COMMENT, MOCK_COMMENT_LIST } from '@/mock';

export interface CommentSearchParams extends PageSearchParams {
  commentId?: string;
  questionId?: string;
  content?: string;
  reviewStatus?: number;
  getQuestion?: boolean; // 是否获取题目信息
  getReplyList?: boolean; // 是否获取回复列表信息
}

/**
 * 新增
 * @param params
 */
export function addComment(params: Partial<CommentType>) {
  const { content, questionId } = params;
  if (!content || !questionId) {
    return false;
  }
  MOCK_COMMENT_LIST.push({ ...MOCK_COMMENT, ...params });
  return MOCK_COMMENT._id;
}

/**
 * 分页搜索
 * @param params
 */
export async function searchComments(
  params: CommentSearchParams,
): Promise<PageResult<CommentUserType>> {
  const { pageSize = 8, pageNum = 1 } = params;
  const emptyResult = {
    data: [],
    total: 0,
  };
  if (pageSize < 1 || pageNum < 1) {
    return emptyResult;
  }
  return {
    data: MOCK_COMMENT_LIST,
    total: MOCK_COMMENT_LIST.length,
  };
}

/**
 * 根据 id 获取
 * @param commentId
 * @param withUser 获取回答用户信息
 */
export function getComment(commentId: string, withUser = false) {
  if (!commentId) {
    return null;
  }

  return MOCK_COMMENT;
}

/**
 * 点赞数 +1
 * @param commentId
 * @return
 */
export function thumbUpComment(commentId: string) {
  if (!commentId) {
    return 0;
  }
  if (Math.random() > 0.1) {
    return 1;
  } else {
    return -1;
  }
}

/**
 * 修改回答
 * @param commentId
 * @param comment
 */
export async function updateComment(commentId: string, comment: Partial<CommentType>) {
  if (!commentId || !comment) {
    return false;
  }

  return true;
}

/**
 * 修改回答优先级（精选 / 取消精选 / 设为参考）
 * @param commentId
 * @param priority
 */
export async function updateCommentPriority(commentId: string, priority = -1) {
  if (!commentId || priority < 0) {
    return false;
  }

  return true;
}

/**
 * 删除回答
 * @param commentId
 */
export function deleteComment(commentId: string) {
  if (!commentId) {
    return false;
  }
  // 模拟操作
  try {
    axios.post('/comment/delete?id=' + commentId);
  } catch (e) {}
  return true;
}
