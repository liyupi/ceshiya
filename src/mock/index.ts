import { CommentUserType } from '@/models/comment';
import { CurrentUser, SimpleUser } from '@/models/user';
import { MeetQuestionUserType } from '@/models/meetQuestion';
import { MessageType } from '@/models/message';
import { ReplyUserType } from '@/models/reply';
import { QuestionType } from '@/models/question';
import { DEFAULT_AVATAR } from '@/constant';

/**
 * 模拟普通用户
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
export const MOCK_SIMPLE_USER: SimpleUser = {
  _id: '1',
  avatarUrl: 'https://s3.bmp.ovh/imgs/2022/04/05/8d13ab254ad883ef.jpeg',
  nickName: '鱼皮',
  score: 666,
  authority: 'admin',
  // @ts-ignore
  totalScore: 999,
};

/**
 * 模拟用户排行
 */
export const MOCK_RANK_USER_LIST = getMockList(MOCK_SIMPLE_USER);

/**
 * 模拟当前登录用户
 */
export const MOCK_CURRENT_USER: CurrentUser = {
  _id: '1',
  avatarUrl: DEFAULT_AVATAR,
  nickName: '好心人',
  gender: 0,
  jobStatus: 1,
  city: '',
  email: '12345678@yupi',
  province: '',
  country: '',
  language: '',
  authority: 'user',
  extraAuthority: {
    tags: [],
  },
  favourQuestionIds: ['1', '2'],
  thumbCommentIds: ['1', '2'],
  interests: ['Java', '摸鱼', '全是 Bug', 'C++', 'Python', 'Golang'],
  score: 0,
  profile: '🐟 🐟 🐟',
  _createTime: new Date(),
  _updateTime: new Date(),
};

/**
 * 模拟管理员
 */
export const MOCK_ADMIN_USER: CurrentUser = {
  ...MOCK_CURRENT_USER,
  authority: 'admin',
  nickName: '管理员',
  score: 10000,
  avatarUrl: 'https://s3.bmp.ovh/imgs/2022/04/05/caca974e3953c26a.jpeg',
};

/**
 * 模拟回答
 */
export const MOCK_COMMENT: CommentUserType = {
  _id: '1',
  userId: '1',
  questionId: '1',
  content: '这道题目可真不错哈哈哈',
  thumbNum: 2,
  priority: 0,
  _createTime: new Date(),
  _updateTime: new Date(),
  reviewStatus: 1,
  userInfo: [MOCK_SIMPLE_USER],
};

/**
 * 模拟回答列表
 */
export const MOCK_COMMENT_LIST = getMockList(MOCK_COMMENT);

/**
 * 模拟遇到题目
 */
export const MOCK_MEET_QUESTION: MeetQuestionUserType = {
  _id: '1',
  userId: '1',
  questionId: '1',
  tags: ['公司1', '公司2'],
  _createTime: new Date(),
  _updateTime: new Date(),
  userInfo: [MOCK_SIMPLE_USER],
};

/**
 * 模拟遇到题目列表
 */
export const MOCK_MEET_QUESTION_LIST = getMockList(MOCK_MEET_QUESTION);

/**
 * 模拟消息
 */
export const MOCK_MESSAGE: MessageType = {
  _id: '1',
  title: '有人给你点赞啦',
  content: '快去感谢他吧',
  fromUserId: '1',
  toUserId: '1',
  status: 0,
  type: 0,
  _createTime: new Date(),
  _updateTime: new Date(),
};

/**
 * 模拟消息列表
 */
export const MOCK_MESSAGE_LIST = getMockList(MOCK_MESSAGE);

/**
 * 模拟热搜列表
 */
export const MOCK_HOT_LIST = [
  '程序员鱼皮',
  '鱼皮是狗',
  '哈哈哈哈哈哈',
  '测试一下',
  '学好了都来给我测试是吧？',
];

/**
 * 模拟回复
 */
export const MOCK_REPLY: ReplyUserType = {
  _id: '1',
  content: '回复一下',
  questionId: '1',
  replyId: '1',
  userId: '1',
  commentId: '1',
  replyUserId: '1',
  _createTime: new Date(),
  _updateTime: new Date(),
  userInfo: [MOCK_SIMPLE_USER],
  replyUserInfo: [MOCK_SIMPLE_USER],
};

/**
 * 模拟回复列表
 */
export const MOCK_REPLY_LIST = getMockList(MOCK_REPLY);

/**
 * 模拟题目
 */
export const MOCK_QUESTION: QuestionType = {
  _id: '1',
  name: 'Java中的HashMap的底层原理实现、工作原理？',
  detail: '',
  favourNum: 2,
  shareNum: 3,
  viewNum: 3,
  commentNum: 5,
  meetNum: 5,
  tags: ['Java'],
  links: [],
  userId: '1',
  difficulty: 2,
  type: 0,
  reference:
    '底层数据结构不一样，1.7是数组+链表，1.8则是数组+链表+红黑树结构（当链表长度大于8，转为红黑树）。\n' +
    '\n' +
    'JDK1.8中resize()方法在表为空时，创建表；在表不为空时，扩容；而JDK1.7中resize()方法负责扩容，inflateTable()负责创建表。\n' +
    '\n' +
    '1.8中没有区分键为null的情况，而1.7版本中对于键为null的情况调用putForNullKey()方法。但是两个版本中如果键为null，那么调用hash()方法得到的都将是0，所以键为null的元素都始终位于哈希表table【0】中。\n' +
    '\n' +
    '当1.8中的桶中元素处于链表的情况，遍历的同时最后如果没有匹配的，直接将节点添加到链表尾部；而1.7在遍历的同时没有添加数据，而是另外调用了addEntry()方法，将节点添加到链表头部。\n' +
    '\n' +
    '1.7中新增节点采用头插法，1.8中新增节点采用尾插法。这也是为什么1.8不容易出现环型链表的原因。\n' +
    '\n' +
    '1.7中是通过更改hashSeed值修改节点的hash值从而达到rehash时的链表分散，而1.8中键的hash值不会改变，rehash时根据（hash&oldCap）==0将链表分散。\n' +
    '\n' +
    '1.8rehash时保证原链表的顺序，而1.7中rehash时有可能改变链表的顺序（头插法导致）。\n' +
    '\n' +
    '在扩容的时候：1.7在插入数据之前扩容，而1.8插入数据成功之后扩容。',
  priority: 0,
  reviewTime: new Date(),
  reviewerId: '1',
  reviewStatus: 1,
  reviewMessage: 'ok',
  publishTime: new Date(),
  _createTime: new Date(),
  _updateTime: new Date(),
};

/**
 * 模拟题目列表
 */
export const MOCK_QUESTION_LIST = getMockList(MOCK_QUESTION);

/**
 * 生成 mock 数据列表
 * @param obj
 */
function getMockList<T>(obj: T): T[] {
  return new Array(6).fill(0).map((value, index) => {
    const newObj = { ...obj };
    // @ts-ignore
    newObj._id = index + 1;
    return newObj;
  });
}
