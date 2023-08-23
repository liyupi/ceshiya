/**
 * 游戏单元类型
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
export type GameUnitType = {
  key: string;
  desc: string;
  type: string;
  score: number;
  knowledge: string;
  no?: number; // 题号
  href?: string; // 更多知识的链接
};

/**
 * 游戏单元列表
 */
const GAME_UNIT_LIST: GameUnitType[] = [
  {
    key: 'favourInfinite',
    desc: '收藏按钮可以无限点击',
    type: '逻辑漏洞',
    score: 1,
    knowledge: '网页前端和后端都要对收藏状态进行控制，防止收藏数异常',
  },
  {
    key: 'thumbUpInfinite',
    desc: '点赞可以无限点击',
    type: '逻辑漏洞',
    score: 1,
    knowledge: '网页前端和后端都要对点赞状态进行控制，防止点赞数异常',
  },
  {
    key: 'noQuestionAddPaper',
    desc: '没有选择题目就能操作',
    type: '逻辑漏洞',
    score: 3,
    knowledge: '网页前端和后端都要校验用户是否允许操作',
  },
  {
    key: 'viewInfinite',
    desc: '可以刷浏览量',
    type: '逻辑漏洞',
    score: 3,
    knowledge: '可以根据用户 id 或 IP 等维度来保证单用户的浏览量不重复统计',
  },
  {
    key: 'tooManyPick',
    desc: '点击按钮过于频繁导致状态显示错误',
    type: '逻辑漏洞',
    score: 1,
    knowledge: '前端开发时，要充分测试用户单次操作和多次操作的合理性',
  },
  {
    key: 'xss',
    desc: '触发 XSS 攻击',
    type: '非法输入',
    score: 2,
    knowledge: '最普遍的 Web 应用安全漏洞，要在前后端严格校验和过滤用户的非法输入',
    href: 'https://baike.baidu.com/item/XSS%E6%94%BB%E5%87%BB/954065',
  },
  {
    key: 'sqlInjection',
    desc: '触发 SQL 注入攻击',
    type: '非法输入',
    score: 2,
    knowledge: '常见安全漏洞，要在前后端严格校验和过滤用户的非法输入',
    href: 'https://baike.baidu.com/item/sql%E6%B3%A8%E5%85%A5',
  },
  {
    key: 'tooLong',
    desc: '输入过长',
    type: '非法输入',
    knowledge: '网页的前端和后端都要校验用户的输入',
    score: 2,
  },
  {
    key: 'badEmail',
    desc: '邮件输入不合法',
    type: '非法输入',
    knowledge: '邮箱、手机号之类的重要信息通常需要严格的正则表达式校验，前后端都要校验',
    score: 2,
  },
  {
    key: 'errorChar',
    desc: '输入非法字符',
    type: '非法输入',
    knowledge: '昵称等信息通常要限制用户输入的字符，防止出现一些安全漏洞或显示异常',
    score: 1,
  },
  {
    key: 'tooManySubmit',
    desc: '提交数过多',
    type: '非法提交',
    score: 2,
    knowledge: '对于内容平台，前端和后端都要对用户的提交频率和次数做限制，防止恶意重复提交',
  },
  {
    key: 'badSubmitHotSearch',
    desc: '频繁提交重复的搜索内容，影响热搜推荐',
    type: '非法提交',
    score: 3,
    knowledge: '对于内容平台，要对用户刷量 / 可能影响推荐的行为进行控制',
  },
  {
    key: 'badSubmitFuck',
    desc: '恶意提交粗鄙之语',
    type: '违规提交',
    score: 2,
    knowledge: '可以通过人工审核、AI 审核等方式严格控制用户提交内容的合法性，并对违规用户进行封禁',
  },
  {
    key: 'badSubmitRubbish',
    desc: '恶意提交灌水内容',
    type: '违规提交',
    score: 2,
    knowledge: '可以通过人工审核、AI 审核等方式严格控制用户提交内容的合法性，并对违规用户进行封禁',
  },
  {
    key: 'badSubmitAd',
    desc: '恶意提交营销广告',
    type: '违规提交',
    score: 2,
    knowledge: '可以通过人工审核、AI 审核等方式严格控制用户提交内容的合法性，并对违规用户进行封禁',
  },
  {
    key: 'badSubmitYellow',
    desc: '恶意提交不健康信息',
    type: '违规提交',
    score: 2,
    knowledge: '可以通过人工审核、AI 审核等方式严格控制用户提交内容的合法性，并对违规用户进行封禁',
  },
  {
    key: 'badSubmitFake',
    desc: '恶意提交虚假信息',
    type: '违规提交',
    score: 2,
    knowledge: '可以通过人工审核、AI 审核等方式严格控制用户提交内容的合法性，并对违规用户进行封禁',
  },
  {
    key: 'blastPassword',
    desc: '暴力破解密码成功',
    type: '非法登录',
    score: 3,
    knowledge: '可以通过验证码、限流、限制单账号密码错误次数等方式防止密码暴力破解',
    href: 'https://www.sohu.com/a/497592516_568398',
  },
  {
    key: 'spider',
    desc: '非法爬虫，窃取网站内容',
    type: '非法爬虫',
    score: 3,
    knowledge: '可以通过校验码、限制用户浏览条数等方式一定程度上预防爬虫',
  },
  {
    key: 'authBypass',
    desc: '绕过权限，直接访问管理员后台',
    type: '权限绕过',
    score: 3,
    knowledge: '前端要对管理后台进行隐藏和鉴权，后端也要对敏感数据进行保护和访问控制',
  },
  {
    key: 'opBypass',
    desc: '绕过前端权限控制，直接访问后台接口',
    type: '权限绕过',
    score: 3,
    knowledge: '后端也要对敏感数据进行保护和访问控制',
  },
  {
    key: 'tooFrequentCaptcha',
    desc: '疯狂发送动态码，浪费资源',
    type: '刷资源',
    score: 3,
    knowledge:
      '调用收费 API 时，一定要严格控制用户调用的频率和次数，做好监控告警措施，否则破产就在一瞬间',
  },
  {
    key: 'visitBigPicture',
    desc: '疯狂访问超大图片',
    type: '刷资源',
    score: 3,
    knowledge:
      '要严格限制用户上传文件的大小和格式，并且给存储文件添加防盗链、缓存等防护 / 减压措施，防止资源浪费',
  },
  {
    key: 'visitCostApi',
    desc: '疯狂访问耗时接口',
    type: '刷资源',
    score: 3,
    knowledge: '要严格控制单用户调用接口的频率，防止占用过多资源影响正常用户的使用',
  },
  {
    key: 'dos',
    desc: 'DOS',
    type: '拒绝服务攻击',
    score: 3,
    knowledge: '低成本 / 致命的攻击手段，尽量不要暴露源站 IP，并且给系统添加防火墙等方法策略',
    href: 'https://baike.baidu.com/item/dos%E6%94%BB%E5%87%BB',
  },
  {
    key: 'ddos',
    desc: 'DDOS',
    type: '拒绝服务攻击',
    score: 5,
    knowledge: '低成本 / 致命的攻击手段，尽量不要暴露源站 IP，并且给系统添加防火墙等方法策略',
    href: 'https://baike.baidu.com/item/%E5%88%86%E5%B8%83%E5%BC%8F%E6%8B%92%E7%BB%9D%E6%9C%8D%E5%8A%A1%E6%94%BB%E5%87%BB',
  },
  {
    key: 'cc',
    desc: 'CC 网页攻击',
    type: '拒绝服务攻击',
    score: 4,
    knowledge: '通过模拟正常用户持续访问消耗大量资源的页面，从而影响正常用户的访问',
    href: 'https://baike.baidu.com/item/cc%E6%94%BB%E5%87%BB',
  },
  {
    key: 'tooBigUpload',
    desc: '上传超大文件',
    type: '刷资源',
    score: 2,
    knowledge:
      '要严格限制用户上传文件的大小和格式，并且给存储文件添加防盗链、缓存等防护 / 减压措施，防止资源浪费',
  },
  {
    key: 'frequentUpload',
    desc: '疯狂上传文件',
    type: '刷资源',
    score: 3,
    knowledge: '建议限制用户上传文件的频率，防止资源浪费',
  },
  {
    key: 'illegalUpload',
    desc: '上传非法脚本文件',
    type: '文件上传漏洞',
    score: 3,
    knowledge: '要在后端严格限制用户上传文件的格式 / 类型 / 文件头等',
    href: 'https://www.cnblogs.com/chu-jian/p/15553328.html',
  },
  {
    key: 'pretendYupi',
    desc: '冒充站长鱼皮',
    type: '社会工程',
    knowledge: '可以给站点特殊用户增加认证和标识来帮助用户区分',
    score: 4,
  },
  {
    key: 'getInfoBypass',
    desc: '从其他地方获取密码',
    type: '社会工程',
    score: 3,
    href: 'https://baike.baidu.com/item/%E7%A4%BE%E4%BC%9A%E5%B7%A5%E7%A8%8B%E6%94%BB%E5%87%BB',
    knowledge: '不要以任何形式在网上散播你的敏感信息，注意自我保护',
  },
  {
    key: '0day',
    desc: '零日攻击',
    type: '零日攻击',
    score: 3,
    knowledge: '是指被发现后立即被恶意利用的安全漏洞，这就需要网站维护人员持续关注最新的安全消息',
    href: 'https://baike.baidu.com/item/%E9%9B%B6%E6%97%A5%E6%BC%8F%E6%B4%9E',
  },
  {
    key: 'readLaw',
    desc: '阅读网络安全相关法律',
    type: '职业道德',
    score: 2,
    knowledge: '入行第一课，请大家遵守法律，不要恶意攻击他人的网站',
    href: 'https://www.hongjibp.com/laws-14402.html',
  },
];

GAME_UNIT_LIST.forEach((item, index) => {
  item.no = index + 1;
});

const GAME_UNIT_MAP = {};

GAME_UNIT_LIST.forEach((value) => {
  GAME_UNIT_MAP[value.key] = value;
});

/**
 * 总分
 */
const TOTAL_GAME_SCORE = GAME_UNIT_LIST.map((unit) => unit.score).reduce((a, b) => a + b);

export { GAME_UNIT_MAP, GAME_UNIT_LIST, TOTAL_GAME_SCORE };
