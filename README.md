# 测试鸭 - 交互式网络安全自学网

> 纯前端实现的交互式网络安全自学网，助你成为网络安全达人！
>
> By [程序员鱼皮](https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah)

在线体验：http://ceshiya.yupi.icu

演示视频：https://www.bilibili.com/video/BV1y14y1175y/

## 项目介绍

测试鸭（测逝鸭），一个完全免费的交互式网络安全自学教程网站，它的前身是已经被攻击到倒闭的 [面试刷题网（面试鸭）](https://github.com/liyupi/mianshiya-public) 。

和传统的教学网站不同，鱼皮结合自己遭受网站攻击的经历和教训，给网站设置了 30 多个漏洞！大家需要通过自由探索和种种提示，发现这些漏洞并对网站造成攻击 🦖，从而在实战中学习到网络安全知识，轻松愉快~

![](./doc/image-20230823160407630.png)

### 为什么做这样一个网站？

初学网站开发的同学很容易因为各种小的问题导致网站被攻击，造成心理和经济上的损失。

通过这个网站，希望大家都能意识到网络安全的重要性，在开发网站时提升安全防护意识。

> 学习这些知识是为了更好地防范，而不要利用技术去违法作恶！

## 20 秒学会使用

1）第一次进入主页时，会自动弹出新手引导，教你如何攻击本网站，跟着引导点击下一步即可

![](./doc/image-20230823160342554.png)

2）页面上的任何一个按钮、任何一个输入框都有可能暗藏玄机。比如疯狂地点击 “收藏” 按钮，不给系统反应的机会，然后 Bug 就出现了。

每当你找到一个 Bug，站长鱼皮的血鸭值都会极速上升，并且你还可以看到鱼皮给出的小知识点，以及一张鱼皮的高清无码发飙图，据说总共有 5 张，集齐之后也许不能召唤神龙，但鱼皮会请你喝茶。

![](./doc/image-20230823161415988.png)

3）可以通过右下角的工具包帮助自己攻击网站：

![image-20230823161558892](./doc/image-20230823161558892.png)

比如上图的请求工具，可以帮助你绕过前端界面，直接从网站后台获取数据 🐓。

4）点击右下角的 Bug 图标弹出游戏面板，可以查看得分情况、已发现的 Bug、获取提示、查看自己的排名等等。

![](./doc/image-20230823161933802.png)

## 1 分钟本地启动

由于项目采用纯前端实现，本地启动项目非常简单！

> 在线访问人数较多，可能会卡顿，所以更推荐大家自己在本地使用~

1）下载本项目代码

2）进入项目根目录，执行 `npm install` 安装项目依赖

3）执行 `npm run dev` 本地启动即可

## 功能和特性

- 完整的面试刷题网站前端

  - 搜索题目
  - 创建题目
  - 用户登录注册
  - 个人页面
  - 题目选取
  - 题目分类
  - 遇到题目
  - 收藏点赞

- 30+ 交互式 Bug 关卡
- 游戏工具箱
- 游戏面板

## 技术选型

本项目采用纯前端实现，不需要任何后端的前置知识~

> Q：为什么采用纯前端实现？
>
> A：该网站更侧重前端交互，无需后台存储；同时也能减少攻击风险 + 省钱

- 开发框架：React、Umi
- 脚手架：Ant Design Pro
- 组件库：Ant Design、Ant Design Components
- 语法扩展：TypeScript、Less
- 打包工具：Webpack
- 代码规范：ESLint、StyleLint、Prettier
- 工具库：Intro.js（引导提示）

## 核心设计

### 1、网站改造流程

本网站是由一个完整前后端项目 [面试鸭](https://github.com/liyupi/mianshiya-public) 改造而成的纯前端网站，这里分享下通用的网站改造流程，大家可以尝试把自己做的项目也变成交互式教学网站。

步骤如下：

1）完整前端页面开发（已有项目的话这一步默认已完成）

2）页面数据静态化：创建 mock 目录，存放人为编写的假数据；然后将和后端交互的 service 层代码全部改造为操作和获取 mock 目录中的假数据。

![](./doc/image-20230823163057976.png)

3）创建游戏机制：具体实现方式见下

### 2、游戏机制实现

首先遵循组件化的思想，把所有和游戏相关的代码封装到 `games` 目录中，并且提供一个 `GameBox` 组件供前端页面引入，而不是直接侵入现有的业务代码：

![](./doc/image-20230823163219925.png)

怎么实现在用户执行了某个操作后，触发完成对应的关卡呢？

这里采用的实现思想类似于前端监控业务中的 “埋点”。

首先我们在 `gameUnit.ts` 中定义游戏的关卡（此处称为 unit 单元），示例代码如下：

```ts
/**
 * 游戏单元类型
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
];
```

然后我们编写一个全局游戏状态存储文件 `gameState.tsx` ，用于记录用户已经完成的关卡、分数、游戏配置等信息：

```ts
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
```

并且提供一个上报过关通知的函数 `doGameUnitSucceed` ，参数为上面定义的关卡单元的 key，在该函数中改变当前用户的过关状态，并给出过关弹窗提示。

示例代码如下：

```ts
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
      content: ...,
      okText: '继续加油！',
    });
  }, 1000);
  updateGameState(gameState);
};
```

之后，我们只需要在对应的页面和功能代码中，增加一段过关逻辑，符合条件的话就调用 `doGameUnitSucceed(关卡key)` 过关通知函数，就能实现过关状态的更新和通知了。

比如下面的代码，是在点赞功能中添加过关判断逻辑：

```ts
const doThumbUp = async (id: string) => {
  setThumbLoading(true);
  const res = await thumbUpComment(id);
  if (res === 1 || res === -1) {
    comment.thumbNum = (comment.thumbNum ?? 0) + res;
    // 点赞数 > 9 则过关
    if (comment.thumbNum > 9) {
      // 注意这行代码是关键，触发过关
      doGameUnitSucceed('thumbUpInfinite');
    }
  }
};
```

### 3、新手指引

引入 `Intro.js` 库，在 `GameBox` 游戏组建中定义引导阶段，然后通过 LocalStorage 判断是否首次进入游戏需要展示引导即可。

示例引导阶段代码如下：

```ts
const [steps] = useState([
  {
    title: '欢迎来到测逝鸭 🦆',
    intro: '这是一个锻炼你网络安全能力的破站，准备好旅程了么？🧑🏻‍🦲',
    position: 'top',
  },
  {
    title: '目标 🎯',
    intro:
      '你要做的就是运用你的智慧和强大的洞察力，尽可能多地发现并利用该网站的 Bug、对网站造成破坏！🦖',
    nextLabel: '应该的应该的',
  },
  ...
]
```

### 4、工具箱实现

工具箱（`ToolBox.tsx` ）本质上就是集成了特定过关方法的页面，算是一种定制化开发。每种工具都作为单独的页面，存放在 `tools` 目录下。

## 目录结构

- public：公共静态资源
- config：项目配置文件
  - routes.ts：路由
- doc：文档相关资源
- src
  - assets：静态资源
  - components：组件
  - constant：常量
  - games：游戏逻辑
    - GameBox.tsx：游戏盒子组件（引入后开启游戏）
    - gameState.tsx：游戏状态管理
    - gameUnit.tsx：游戏单元定义
    - ToolBox.tsx：游戏工具箱
    - tools：具体的游戏工具
  - layouts：页面布局
  - mock：模拟数据
  - models：数据模型定义
  - pages：页面
  - services：业务逻辑
  - plugins：第三方依赖
  - app.tsx：项目入口文件
  - access.ts：项目权限管理
  - wrappers：路由功能增强
    - auth.tsx：自定义权限管理
  - global.less：全局样式文件
- .eslintrc.js：代码规范
- .gitignore：提交忽略文件
- .prettierrc.js：代码美化配置
- .stylelintrc.js：样式代码美化配置
- package.json：项目管理
- tsconfig.json：TS 配置

## 贡献指南

欢迎各路好汉参与贡献，利人利己~

推荐的贡献方式：增加新的游戏单元（官卡）、修复系统 Bug、补充网络安全知识点，感谢您的贡献。

---

感谢阅读，也欢迎加入 [作者的编程学习圈](https://yupi.icu)，学习更多原创项目~
