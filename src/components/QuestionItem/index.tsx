import { Button, Col, Divider, List, message, Popconfirm, Row, Space, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, Link, useDispatch, useSelector } from 'umi';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HistoryOutlined,
  MessageOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import type { QuestionType } from '@/models/question';
import { deleteQuestion, favourQuestion } from '@/services/question';
import type { CurrentUser } from '@/models/user';
import TagList from '@/components/TagList';
import { getQuestionDetailLink, getQuestionTitle } from '@/utils/businessUtils';
import { useModel } from '@@/plugin-model/useModel';
import { getCurrentUser } from '@/services/user';
import { QUESTION_DIFFICULTY_ENUM, QUESTION_TYPE_ENUM } from '@/constant/question';
import { reviewStatusInfoMap } from '@/constant/reviewStatusEnum';
import BraftEditor from 'braft-editor';
import ListMeetQuestionModal from '@/components/ListMeetQuestionModal';
import RichTextViewer from '@/components/RichTextViewer';
import { formatDateStr, formatDateTimeStr } from '@/utils/utils';
import classNames from 'classnames';
import { doGameUnitSucceed, gameState } from '@/games/gameState';
import './index.less';

const { Title, Paragraph } = Typography;

interface QuestionItemProps {
  question: QuestionType;
  showReview?: boolean; // 显示审核状态
  showEdit?: boolean; // 显示修改
  showActions?: boolean; // 展示操作栏
  showReference?: boolean; // 展示解析
  onReload?: () => void;
  pickAble?: boolean;
  showOrder?: boolean; // 是否展示序号
  index?: number;
  target?: string;
}

/**
 * 单个题目展示
 *
 * @param props
 * @constructor
 * @author liyupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
const QuestionItem: React.FC<QuestionItemProps> = (props) => {
  const {
    question = {} as QuestionType,
    showReview,
    showEdit,
    showActions = true,
    pickAble = true,
    onReload,
    index = 0,
    showOrder = false,
    showReference = false,
    target = '_self',
  } = props;

  const [favourLoading, setFavourLoading] = useState<boolean>(false);
  const [isFavour, setIsFavour] = useState<boolean>(false);
  const [favourNum, setFavourNum] = useState<number>(0);
  const [meetListModalVisible, setMeetListModalVisible] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser = {} as CurrentUser } = initialState || {};
  const dispatch = useDispatch();
  const { pickedQuestions } = useSelector((state: any) => state.editPaper);
  const [pickCount, setPickCount] = useState<number>(0);

  const addPickedQuestions = (q: QuestionType) =>
    dispatch({
      type: 'editPaper/addPickedQuestions',
      payload: q,
    });
  const deletePickedQuestions = (q: QuestionType) =>
    dispatch({
      type: 'editPaper/deletePickedQuestions',
      payload: q,
    });
  useEffect(() => {
    if (question) {
      setIsFavour(currentUser?.favourQuestionIds?.includes(question._id) ?? false);
      setFavourNum(question.favourNum ?? 0);
    }
  }, [currentUser, question]);

  /**
   * 收藏
   */
  const doFavour = async () => {
    if (!question._id || favourLoading) {
      return;
    }
    setFavourLoading(true);
    const res = await favourQuestion(question._id);
    setFavourLoading(false);
    const newFavourNum = favourNum + res;
    setFavourNum(newFavourNum);
    if (newFavourNum > 9 || newFavourNum < 0) {
      doGameUnitSucceed('favourInfinite');
    }
    if (res !== 0) {
      if (res > 0) {
        setIsFavour(true);
        message.success('收藏成功');
      } else {
        setIsFavour(false);
        message.success('已取消收藏');
      }
      if (gameState.gameTip) {
        message.info('多点几次会发生什么呢？');
      }
      question.favourNum = favourNum + res;
      const newCurrentUser = await getCurrentUser();
      setInitialState({ ...initialState, currentUser: newCurrentUser });
    } else {
      message.error('操作失败');
    }
  };

  /**
   * 删除
   */
  const doDelete = async () => {
    const res = await deleteQuestion(question._id);
    if (res) {
      message.success('操作成功');
      if (onReload) {
        onReload();
      }
    } else {
      message.error('操作失败');
    }
  };

  const doEdit = () => {
    history.push({
      pathname: '/addQuestion',
      query: {
        rid: question._id,
      },
    });
  };

  const checkPicked = () => {
    return pickedQuestions[question.type].some((q: QuestionType) => q._id === question._id);
  };

  const IconText = ({
    // @ts-ignore
    icon,
    // @ts-ignore
    text,
    onClick = () => {},
    danger = false,
    loading = false,
    className = '',
    index = 0,
  }) => (
    <Button
      className={`icon-text ${className}-${index}`}
      size="small"
      danger={danger}
      icon={React.createElement(icon)}
      onClick={onClick}
      loading={loading}
    >
      <span>{text}</span>
    </Button>
  );

  const textQuestionDetail = BraftEditor.createEditorState(question.detail).toText().trim();
  const questionTitle = getQuestionTitle(question);
  const questionDetailLink = getQuestionDetailLink(question);

  return (
    <List.Item className="question-item">
      <Link to={`/qd/${question._id}`} target={target}>
        <Title
          level={5}
          ellipsis={{ rows: 2 }}
          style={{ marginBottom: 16 }}
          className="question-item-title"
        >
          {showOrder ? `${index + 1}. ${questionTitle}` : questionTitle}
        </Title>
        {textQuestionDetail !== questionTitle && (
          <Paragraph ellipsis={{ rows: 2 }} style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 15 }}>
            {textQuestionDetail}
          </Paragraph>
        )}
      </Link>
      <p style={{ marginBottom: 12 }}>
        <TagList question={question} />
      </p>
      {showReference && question.reference && (
        <>
          <p>解析：</p>
          <div style={{ fontSize: 15 }}>
            <RichTextViewer htmlContent={question.reference} />
          </div>
        </>
      )}
      {showReview && (
        <p style={{ marginBottom: 12 }}>
          <Tag color={reviewStatusInfoMap[question.reviewStatus].color}>
            {reviewStatusInfoMap[question.reviewStatus].text}
          </Tag>
          {question.reviewMessage && `（${question.reviewMessage}）`}
        </p>
      )}
      <p style={{ fontSize: 12, color: '#aaa', marginBottom: 8 }}>
        <Space split={<Divider type="vertical" />}>
          <span>{QUESTION_TYPE_ENUM[question?.type ?? 0]}题</span>
          <span>{QUESTION_DIFFICULTY_ENUM[question.difficulty ?? 0]}</span>
          {!question.publishTime && <span>{formatDateTimeStr(question._createTime)}</span>}
          {question.publishTime && <span>{formatDateStr(question.publishTime)}</span>}
        </Space>
      </p>
      {showActions && (
        <Row className="action-row" justify="space-between" align="middle" gutter={[8, 8]}>
          <Col>
            <Space size={16} className="base-btn-group">
              <a href={questionDetailLink} rel="noreferrer">
                <IconText icon={EyeOutlined} text={question.viewNum} />
              </a>
              <IconText
                icon={isFavour ? StarFilled : StarOutlined}
                text={question.favourNum}
                className="do-favour"
                index={index}
                loading={favourLoading}
                onClick={() => doFavour()}
              />
              <a href={questionDetailLink} rel="noreferrer">
                <IconText icon={MessageOutlined} text={question.commentNum} />
              </a>
              <IconText
                icon={HistoryOutlined}
                text={question.meetNum ?? 0}
                onClick={() => {
                  setMeetListModalVisible(true);
                }}
              />
              {
                // 没有人回答才允许修改
                showEdit && !question.commentNum && (
                  <IconText icon={EditOutlined} text="修改" onClick={() => doEdit()} />
                )
              }
              {
                // 没有人回答才允许删除
                showEdit && !question.commentNum && (
                  <Popconfirm title="确认删除么，操作无法撤销" onConfirm={() => doDelete()}>
                    <IconText icon={DeleteOutlined} danger={true} text="删除" onClick={() => {}} />
                  </Popconfirm>
                )
              }
            </Space>
          </Col>
          <Col>
            <Space className="func-btn-group">
              {pickAble ? (
                <span>
                  {checkPicked() ? (
                    <Button
                      type="primary"
                      size="small"
                      danger
                      onClick={() => {
                        deletePickedQuestions(question);
                      }}
                    >
                      {pickCount > 5 ? '烫烫烫' : '移出'}
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="small"
                      className={classNames({
                        pickQuestion666: index === 0,
                      })}
                      onClick={() => {
                        if (gameState && pickCount < 2) {
                          message.info('点击后按钮状态改变了，这里应该不会有 Bug 吧？');
                        }
                        if (pickCount > 5) {
                          doGameUnitSucceed('tooManyPick');
                        }
                        setPickCount(pickCount + 1);
                        addPickedQuestions(question);
                      }}
                    >
                      {pickCount > 5 ? '锟斤拷' : '选题'}
                    </Button>
                  )}
                </span>
              ) : null}
            </Space>
          </Col>
        </Row>
      )}
      <ListMeetQuestionModal
        question={question}
        visible={meetListModalVisible}
        onClose={() => setMeetListModalVisible(false)}
      />
    </List.Item>
  );
};

export default QuestionItem;
