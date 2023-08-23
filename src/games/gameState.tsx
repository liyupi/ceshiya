import { GAME_UNIT_MAP } from '@/games/gameUnit';
import { Image, Modal } from 'antd';
import * as xss from 'xss';

/**
 * 游戏全局状态类型
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
export type GameStateType = {
  init: boolean; // 是否为初始化
  score: number; // 当前分数
  gameTip: boolean; // 是否开启提示
  succeedUnitList: string[]; // 已通过的关卡
};

const LOGIN_STATE_STORAGE_KEY = 'captcha';

const GAME_STATE_STORAGE_KEY = 'gameState';

const DEFAULT_USER_CAPTCHA = '123456';

const ADMIN_USER_CAPTCHA = '555555';

const YUPI_USER_CAPTCHA = 'yupi98';

const ERROR_FILE_NAME = 'sanLian.png';

/**
 * 得分后的图片
 */
const GET_SCORE_PICTURE_LIST = [
  'https://s1.ax1x.com/2022/04/07/LSW7pd.jpg',
  'https://s1.ax1x.com/2022/04/07/LSWb6I.jpg',
  'https://s1.ax1x.com/2022/04/07/LSWH1A.jpg',
  'https://s1.ax1x.com/2022/04/07/LSW5kD.jpg',
  'https://s1.ax1x.com/2022/04/07/LSWIte.jpg',
];

let gameState: GameStateType;

/**
 * 初始状态
 */
const INIT_GAME_STATE = {
  init: true,
  score: 0,
  succeedUnitList: [],
  gameTip: true,
};

/**
 * 初始化
 */
const doInit = () => {
  console.log('gameInfo doInit');
  const prevGameState = localStorage.getItem(GAME_STATE_STORAGE_KEY);
  if (prevGameState) {
    gameState = JSON.parse(prevGameState);
  } else {
    gameState = INIT_GAME_STATE;
    localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(gameState));
  }
};

/**
 * 更新分数
 * @param newGameState
 */
const updateGameState = (newGameState: GameStateType) => {
  gameState = newGameState;
  localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(gameState));
};

/**
 * 完成游戏
 * @param key
 */
const doGameUnitSucceed = (key: string) => {
  // 已经完成
  if (gameState.succeedUnitList.includes(key)) {
    return;
  }
  gameState.succeedUnitList.push(key);
  const unit = GAME_UNIT_MAP[key];
  gameState.score += unit.score;
  setTimeout(() => {
    Modal.success({
      title: `太棒了，鱼皮的血鸭又高了！😡 ${gameState.score - unit.score} +${unit.score}`,
      content: (
        <div style={{ marginTop: 16 }}>
          <p>发现问题：{unit.desc}</p>
          <p>
            小知识：{unit.knowledge}
            {unit.href && (
              <a href={unit.href} target="_blank" rel="noreferrer">
                学习更多
              </a>
            )}
          </p>
          <Image
            src={GET_SCORE_PICTURE_LIST[unit.score - 1]}
            width={240}
            style={{ maxWidth: '100%' }}
            preview={false}
          />
        </div>
      ),
      okText: '继续加油！',
    });
  }, 1000);
  updateGameState(gameState);
};

/**
 * 是否为 XSS 攻击
 * @param value
 * @param callback
 */
const validXss = (value: string, callback?: () => void) => {
  if (!value) {
    return false;
  }
  if (value.includes('script') || value.includes('img')) {
    const safeValue = xss.filterXSS(value);
    if (safeValue !== value) {
      doGameUnitSucceed('xss');
      alert(value);
      callback?.();
      return true;
    }
  }
  return false;
};

/**
 * 是否为 SQL 注入攻击
 * @param value
 * @param callback
 */
const validSQLInjection = (value: string, callback?: () => void) => {
  const re = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
  if (re.test(value)) {
    doGameUnitSucceed('sqlInjection');
    callback?.();
    return true;
  }
  return false;
};

/**
 * 输入过长
 * @param value
 * @param maxLength 最大长度
 */
const validTooLong = (value: string, maxLength: number = 2000) => {
  if (value.length > maxLength) {
    doGameUnitSucceed('tooLong');
    return true;
  }
  return false;
};

/**
 * 输入非法字符
 * @param value
 */
const validErrorChar = (value: string) => {
  const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
  const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
  if (regEn.test(value) || regCn.test(value)) {
    doGameUnitSucceed('errorChar');
    return true;
  }
  return false;
};

const SERVER_IP = 'http://127.0.0.1:49999';

/**
 * 坏人枚举
 */
const BAD_TEXT_MAP = {
  AD: '程序员鱼皮太惨了，快拿三连砸他！',
  RUBBISH: '阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴',
  YELLOW:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAAAXNSR0IArs4c6QAAASFJREFUeF7t1LEJADAMBLFk/6EdyAy+Th7gCvH4zpw5blXgQl31/DGo+6ZQA1OoUAuBoOmnQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlQg0EgqSlBqgPJg3+V4pAffUAAAAASUVORK5CYII=',
  FUCK: '粗鄙之语！',
  FAKE: '大家好，我是鱼皮，我今年 18 岁，每点一个赞我就多学 1 年 Java！',
};

/**
 * 输入违规内容
 * @param value
 */
const validBadSubmit = (value: string) => {
  if (value.includes(BAD_TEXT_MAP.FUCK)) {
    doGameUnitSucceed('badSubmitFuck');
  } else if (value.includes(BAD_TEXT_MAP.AD)) {
    doGameUnitSucceed('badSubmitAd');
  } else if (value.includes(BAD_TEXT_MAP.YELLOW)) {
    doGameUnitSucceed('badSubmitYellow');
  } else if (value.includes(BAD_TEXT_MAP.RUBBISH)) {
    doGameUnitSucceed('badSubmitRubbish');
  } else if (value.includes(BAD_TEXT_MAP.FAKE)) {
    doGameUnitSucceed('badSubmitFake');
  }
};

export {
  doInit,
  gameState,
  doGameUnitSucceed,
  updateGameState,
  GAME_STATE_STORAGE_KEY,
  validXss,
  validSQLInjection,
  validTooLong,
  validErrorChar,
  BAD_TEXT_MAP,
  validBadSubmit,
  ADMIN_USER_CAPTCHA,
  DEFAULT_USER_CAPTCHA,
  SERVER_IP,
  YUPI_USER_CAPTCHA,
  ERROR_FILE_NAME,
  GET_SCORE_PICTURE_LIST,
  LOGIN_STATE_STORAGE_KEY,
};
