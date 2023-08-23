import type { MeetQuestionType, MeetQuestionUserType } from '@/models/meetQuestion';
import type { PageResult, PageSearchParams } from './common';
import { MOCK_MEET_QUESTION, MOCK_MEET_QUESTION_LIST } from '@/mock';

export interface MeetQuestionSearchParams extends PageSearchParams {
  questionId?: string;
  userId?: string;
}

/**
 * 新增
 * @param params
 */
export function addMeetQuestion(params: Partial<MeetQuestionType>) {
  const { tags, questionId } = params;
  if (!questionId || !tags || tags.length < 1) {
    return false;
  }
  MOCK_MEET_QUESTION_LIST.push(MOCK_MEET_QUESTION);
  return MOCK_MEET_QUESTION._id;
}

/**
 * 分页搜索
 * @param params
 */
export async function searchMeetQuestions(
  params: MeetQuestionSearchParams,
): Promise<PageResult<MeetQuestionUserType>> {
  return {
    data: MOCK_MEET_QUESTION_LIST,
    total: MOCK_MEET_QUESTION_LIST.length,
  };
}

/**
 * 修改
 * @param meetQuestionId
 * @param meetQuestion
 */
export async function updateMeetQuestion(
  meetQuestionId: string,
  meetQuestion: Partial<MeetQuestionType>,
) {
  if (!meetQuestionId || !meetQuestion) {
    return false;
  }

  return true;
}
