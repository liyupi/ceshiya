import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Image,
  List,
  message,
  notification,
  Row,
  Space,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import QuestionItem from '@/components/QuestionItem';
import type { QuestionType } from '@/models/question';
import type { QuestionSearchParams } from '@/services/question';
import { listRecommendQuestions, searchQuestionsByPage } from '@/services/question';
import reviewStatusEnum from '@/constant/reviewStatusEnum';
import { LinkOutlined } from '@ant-design/icons';
import { toLoginPage } from '@/utils/businessUtils';
import type { CurrentUser, RankUser } from '@/models/user';
import { LIKE_TAG, RECOMMEND_TAG } from '@/constant/tag';
import { history } from '@@/core/history';
import moment from 'moment';
import { listUserCycleRank } from '@/services/user';
import TagTabList from '@/components/TagTabList';
import MyInterestUpdateModal from '@/components/MyInterestUpdateModal';
import { useModel } from '@@/plugin-model/useModel';
import { GOOD_QUESTION_PRIORITY } from '@/constant/question';
import { CODE_NAV_LOGO, DEFAULT_AVATAR } from '@/constant';
import UserInfoCardPopover from '@/components/UserInfoCardPopover';
import UserTitleBar from '@/components/UserTitleBar';
import touxiang from '@/assets/touxiang.jpeg';
import { ERROR_FILE_NAME, gameState } from '@/games/gameState';

/**
 * 排序方式
 */
const ORDERS = {
  RECOMMEND: '0',
  NEWEST: '1',
  GOOD: '2',
};

/**
 * 首页
 *
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
const Index: React.FC = () => {
  const [list, setList] = useState<QuestionType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>(RECOMMEND_TAG);
  const [order, setOrder] = useState<string>(ORDERS.RECOMMEND);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [rankList, setRankList] = useState<RankUser[]>([]);
  const [monthLoading, setMonthLoading] = useState<boolean>(true);
  const { initialState } = useModel('@@initialState');
  const { currentUser = {} as CurrentUser } = initialState || {};

  const loadData = async () => {
    setLoading(true);
    let data: any;
    // 根据兴趣推荐
    if (activeKey === RECOMMEND_TAG && order === ORDERS.RECOMMEND) {
      data = await listRecommendQuestions(12);
    } else if (activeKey === LIKE_TAG) {
      history.push({
        pathname: '/account/favour',
      });
      return;
    } else {
      const condition: QuestionSearchParams = {
        tags: activeKey === RECOMMEND_TAG ? [] : [activeKey],
        reviewStatus: reviewStatusEnum.PASS,
        pageSize: 12,
      };
      if (order === ORDERS.NEWEST) {
        condition.orderKey = 'publishTime';
      } else if (order === ORDERS.GOOD) {
        condition.priority = GOOD_QUESTION_PRIORITY;
      } else if (order === ORDERS.RECOMMEND) {
        condition.orderKey = 'favourNum';
      }
      data = await searchQuestionsByPage(condition).then((res) => res.data);
    }
    if (!data) {
      message.error('数据加载失败');
      data = [];
    }
    setLoading(false);
    setList(data);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line no-restricted-globals
    window.scrollTo(0, 0);
  }, [activeKey, order]);

  // 仅触发一次
  useEffect(() => {
    const timeout = setTimeout(() => {
      notification.warning({
        message: '注意！Jαvα 刚刚被曝出重大漏洞！',
        description: `上传名为 ${ERROR_FILE_NAME} 的文件可以得到服务器的最高权限！请尽快联系站长修复`,
        duration: 6,
      });
    }, 20000);
    // 周积分榜
    setMonthLoading(true);
    listUserCycleRank(1, moment().startOf('month').format('YYYY-MM-DD'), 3)
      .then((data: any) => {
        setRankList(data.slice(0, 3));
      })
      .finally(() => setMonthLoading(false));
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleTabClick = (key: string) => {
    setActiveKey(key);
  };

  const doSetInterests = () => {
    if (!currentUser._id) {
      message.warning('登录后才能操作哦！');
      toLoginPage();
      return;
    }
    setModalVisible(true);
  };

  const moreLink = activeKey !== RECOMMEND_TAG ? `/tag/${activeKey}` : `questions`;

  const loadMore =
    !loading && list && list.length > 0 ? (
      <div
        style={{
          textAlign: 'center',
          margin: '20px 0',
          columnSpan: 'all',
        }}
      >
        <Button type="primary">
          <Link to={moreLink}>
            <Space size={8}>查看更多</Space>
          </Link>
        </Button>
      </div>
    ) : null;

  const tabListNoTitle = [
    {
      key: ORDERS.RECOMMEND,
      tab: '最热',
    },
    {
      key: ORDERS.NEWEST,
      tab: '最新',
    },
    {
      key: ORDERS.GOOD,
      tab: '精选',
    },
  ];

  return (
    <div>
      <Row gutter={[24, 16]}>
        <Col lg={18} xs={24}>
          <Row gutter={12} wrap={false}>
            <Col flex="auto">
              <TagTabList activeKey={activeKey} onTabClick={handleTabClick} />
            </Col>
            <Col>
              <Button
                type="primary"
                className="set-labels"
                style={{ marginTop: 4 }}
                onClick={doSetInterests}
              >
                设置标签
              </Button>
            </Col>
          </Row>
          <Card
            style={{ width: '100%' }}
            bodyStyle={{
              paddingTop: 8,
            }}
            tabList={tabListNoTitle}
            activeTabKey={order}
            tabBarExtraContent={
              <a href={moreLink} rel="noreferrer">
                <LinkOutlined /> 更多
              </a>
            }
            onTabChange={(key) => {
              setOrder(key);
            }}
          >
            <List<QuestionType>
              rowKey="_id"
              itemLayout="vertical"
              loading={loading}
              dataSource={list}
              loadMore={loadMore}
              renderItem={(item, index) => (
                <QuestionItem index={index} key={item._id} question={item} />
              )}
              locale={{
                emptyText: (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无题目">
                    <Link to="/addQuestion">
                      <Button type="primary" size="large">
                        上传题目
                      </Button>
                    </Link>
                  </Empty>
                ),
              }}
            />
          </Card>
        </Col>
        <Col lg={6} xs={24}>
          <Alert
            style={{ marginBottom: 16 }}
            message={
              <>
                本站禁止任何测试，违者封号！
                <a href="https://docs.qq.com/sheet/DUGRYSlJMSm9Wb3lx" rel="noreferrer">
                  小黑屋
                </a>
              </>
            }
            type="warning"
            showIcon
            closable
          />
          <Tooltip
            title={
              <>
                <div>该图片大小为 200 M！</div>
                <div>CDN 地址：touxiang.jpg</div>
                {gameState.gameTip ? '怎么请求到这张图呢？' : ''}
              </>
            }
          >
            <img width="100%" alt="一张很大的图片" src={touxiang} />
          </Tooltip>
          <div style={{ marginBottom: 16 }} />
          <Card title="关于本站">
            <Card.Meta
              avatar={
                <Tooltip title="站长的头像，也许可以用来。。。">
                  <Avatar src={require('../../assets/yupi-avatar.jpeg')} />
                </Tooltip>
              }
              description={
                <div>
                  集各大主流安全漏洞和 Bug 于一体，助你成为测试和网络安全达人！
                  <a href="https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah" rel="noreferrer">
                    站长鱼皮，Bug 制造机。
                  </a>
                </div>
              }
            />
          </Card>
          <div style={{ marginBottom: 16 }} />
          <Card
            title="本月排行"
            extra={<Link to="/ranking">更多</Link>}
            bodyStyle={{
              paddingTop: 12,
              paddingBottom: 12,
            }}
          >
            <List
              loading={monthLoading}
              dataSource={rankList}
              renderItem={(user) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <UserInfoCardPopover user={user}>
                        <Avatar src={user.avatarUrl || DEFAULT_AVATAR} />
                      </UserInfoCardPopover>
                    }
                    title={<UserTitleBar user={user} />}
                    description={`本月积分：${user.totalScore}`}
                  />
                </List.Item>
              )}
            />
          </Card>
          <div style={{ marginBottom: 16 }} />
          <Card bodyStyle={{ paddingBottom: 16 }}>
            <a href="https://www.code-nav.cn" rel="noreferrer">
              <Card.Meta
                avatar={<Image preview={false} width={64} src={CODE_NAV_LOGO} />}
                title="编程导航"
                description="专业全面的编程资源站点，不再求人！"
              />
            </a>
          </Card>
        </Col>
      </Row>
      <MyInterestUpdateModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default Index;
