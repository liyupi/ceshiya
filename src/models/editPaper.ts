import type { Reducer } from 'umi';
import type { QuestionType } from './question';

type PickedQuestionsType = {
  [key: number]: QuestionType[];
};

export interface EditPaperModelState {
  pickedQuestions: PickedQuestionsType;
  // 本地缓存用户选择的题目
}

/**
 * 编辑试卷类型
 */
export interface EditPaperModelType {
  namespace: 'editPaper';
  state: EditPaperModelState;
  effects: {};
  reducers: {
    setPickedQuestions: Reducer<EditPaperModelState>;
    addPickedQuestions: Reducer<EditPaperModelState>;
    deletePickedQuestions: Reducer<EditPaperModelState>;
    changePickedQuestionsOrder: Reducer<EditPaperModelState>;
  };
}

const getLocalPickedQuestions: () => PickedQuestionsType = () => {
  const localPickedQuestions = localStorage.getItem('localPickedQuestions');
  if (!localPickedQuestions) {
    return {
      1: [],
      2: [],
      3: [],
      0: [],
      4: [],
    };
  }
  return JSON.parse(localPickedQuestions);
};

/**
 * 用户已选题目管理
 */
const UserModel: EditPaperModelType = {
  namespace: 'editPaper',
  state: {
    pickedQuestions: getLocalPickedQuestions(),
  },
  reducers: {
    setPickedQuestions(state, action) {
      localStorage.setItem('localPickedQuestions', JSON.stringify(action.payload));
      return {
        ...state,
        pickedQuestions: action.payload || [],
      };
    },
    addPickedQuestions(state, action) {
      const question: QuestionType = action.payload;
      const pickedQuestions = state?.pickedQuestions || [];
      pickedQuestions[question.type].push(question);
      localStorage.setItem('localPickedQuestions', JSON.stringify(pickedQuestions));
      return {
        ...state,
        pickedQuestions: pickedQuestions || [],
      };
    },
    deletePickedQuestions(state, action) {
      const question: QuestionType = action.payload;
      const pickedQuestions = state?.pickedQuestions || [];
      pickedQuestions[question.type] = pickedQuestions[question.type].filter(
        (q) => q._id !== question._id,
      );
      localStorage.setItem('localPickedQuestions', JSON.stringify(pickedQuestions));
      return {
        ...state,
        pickedQuestions: pickedQuestions || [],
      };
    },
    changePickedQuestionsOrder(state, action) {
      const { questions } = action.payload;
      const pickedQuestions = state?.pickedQuestions || [];
      const type = questions[0].type;
      pickedQuestions[type] = questions;
      localStorage.setItem('localPickedQuestions', JSON.stringify(pickedQuestions));
      return {
        ...state,
        pickedQuestions: pickedQuestions || [],
      };
    },
    // changePickedQuestionsOrder(state, action) {
    //   const { question, index } = action.payload;
    //   const pickedQuestions = state?.pickedQuestions || [];
    //   pickedQuestions[question.type] = pickedQuestions[question.type].filter(
    //     (q) => q._id !== question._id,
    //   );
    //   pickedQuestions[question.type].splice(index, 0, question);
    //   localStorage.setItem('localPickedQuestions', JSON.stringify(pickedQuestions));
    //   return {
    //     ...state,
    //     pickedQuestions: pickedQuestions || [],
    //   };
    // },
  },
  effects: {},
};

export default UserModel;
