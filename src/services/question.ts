import type { QuestionType } from '@/models/question';
import reviewStatusEnum, { reviewStatusInfoMap } from '@/constant/reviewStatusEnum';
import type { PageResult, PageSearchParams } from '@/services/common';
import type { CurrentUser } from '@/models/user';
import { MOCK_QUESTION, MOCK_QUESTION_LIST } from '@/mock';
import axios from 'axios';

export interface QuestionSearchParams extends PageSearchParams {
  _ids?: string[];
  notId?: string;
  name?: string;
  tags?: string[]; // 须包含全部标签才查出
  orTags?: string[]; // 包含任一标签就可查出
  priority?: number;
  reviewStatus?: number;
  userId?: string;
  link?: string;
  type?: number;
  difficulty?: number;
  hasReference?: boolean;
}

/**
 * 添加题目
 * @param params
 * @return 题目 id
 */
export function addQuestion(params: QuestionType) {
  if (!params.userId || !params.tags || params.tags.length < 1) {
    return false;
  }

  MOCK_QUESTION_LIST.splice(0, 0, { ...MOCK_QUESTION, ...params, favourNum: 100, viewNum: 100 });
  return true;
}

/**
 * 从 ES 搜索题目
 * @param params
 */
export async function searchQuestions(
  params: QuestionSearchParams,
): Promise<PageResult<QuestionType>> {
  const condition = { isDelete: false, ...params };
  if (!condition.orderKey) {
    condition.orderKey = '_score';
  }
  if (!condition.order) {
    condition.order = 'desc';
  }
  console.log(condition);

  // 获取题目列表假请求
  try {
    await axios.get('/question/search?pageNum=1&pageSize=1');
  } catch (e) {}

  return {
    data: MOCK_QUESTION_LIST,
    total: MOCK_QUESTION_LIST.length * 10000,
  };
}

/**
 * 分页搜索题目（直接调云数据库）
 * @param params
 */
export async function searchQuestionsByPage(
  params: QuestionSearchParams,
): Promise<PageResult<QuestionType>> {
  const { pageSize = 12, pageNum = 1 } = params;
  const emptyResult = {
    data: [],
    total: 0,
  };
  if (pageSize < 1 || pageNum < 1) {
    return emptyResult;
  }
  return {
    data: MOCK_QUESTION_LIST,
    total: MOCK_QUESTION_LIST.length,
  };
}

/**
 * 分页获取用户收藏的题目列表
 * @param currentUser
 * @param params
 */
export async function searchUserFavourQuestions(
  currentUser: CurrentUser,
  params: QuestionSearchParams,
): Promise<PageResult<QuestionType>> {
  const defaultValue = {
    data: [],
    total: 0,
  };
  if (!currentUser) {
    return defaultValue;
  }
  if (!currentUser?.favourQuestionIds || currentUser.favourQuestionIds.length === 0) {
    return defaultValue;
  }

  params.userId = undefined;
  params._ids = currentUser.favourQuestionIds;
  params.reviewStatus = reviewStatusEnum.PASS;
  return searchQuestionsByPage(params);
}

/**
 * 增加分享数
 * @param questionId
 */
export function shareQuestion(questionId: string) {
  if (!questionId) {
    return false;
  }

  return true;
}

/**
 * 删除题目
 * @param questionId
 */
export function deleteQuestion(questionId: string) {
  if (!questionId) {
    return false;
  }

  return true;
}

/**
 * 收藏（取消收藏）
 * @param questionId
 * @return 收藏数变化
 */
export function favourQuestion(questionId: string) {
  if (!questionId) {
    return 0;
  }
  if (Math.random() > 0.1) {
    return 1;
  } else {
    return -1;
  }
}

/**
 * 根据用户兴趣获取推荐题目
 * @param size
 */
export function listRecommendQuestions(size: number = 12) {
  return MOCK_QUESTION_LIST;
}

/**
 * 修改题目
 * @param questionId
 * @param question
 */
export async function updateQuestion(questionId: string, question: Partial<QuestionType>) {
  if (!questionId || !question) {
    return false;
  }

  return true;
}

/**
 * 根据 id 获取题目
 * @param questionId
 */
export function getQuestion(questionId: string) {
  if (!questionId) {
    return null;
  }

  return MOCK_QUESTION;
}

/**
 * 审核题目
 * @param questionId
 * @param score
 * @param reviewStatus
 * @param reviewMessage
 */
export async function reviewQuestion(
  questionId: string,
  score: number,
  reviewStatus: number,
  reviewMessage?: string,
) {
  if (!questionId || !reviewStatusInfoMap[reviewStatus]) {
    return false;
  }

  return true;
}

/**
 * 浏览题目
 * @param questionId
 */
export async function viewQuestion(questionId: string) {
  if (!questionId) {
    return false;
  }

  MOCK_QUESTION_LIST[questionId].viewNum++;

  // 造一个请求
  try {
    await axios.post(`/question/view?id=${questionId}`);
  } catch (e) {}
  return true;
}
