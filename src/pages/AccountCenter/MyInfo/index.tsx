import { Avatar, Button, Card, Descriptions, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import type { CurrentUser } from '@/models/user';
import { EditOutlined } from '@ant-design/icons/lib';
import { formatDateTimeStr } from '@/utils/utils';
import MyInfoUpdateModal from './MyInfoUpdateModal';
import { useModel } from '@@/plugin-model/useModel';
import { USER_GENDER_ENUM, USER_JOB_STATUS_ENUM } from '@/constant/user';
import { DEFAULT_AVATAR, DEFAULT_USER_NAME } from '@/constant';
import { getLevel, isAdminUser } from '@/utils/businessUtils';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styles from './style.less';
import { gameState } from '@/games/gameState';

const { Title } = Typography;

/**
 * 个人信息页
 *
 * @author https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah yupi
 */
export const MyInfo: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser = {} as CurrentUser } = initialState || {};

  const interestsTagView =
    currentUser && currentUser.interests && currentUser.interests.length > 0 ? (
      currentUser.interests.map((key) => {
        return (
          <Tag key={key} style={{ cursor: 'pointer' }}>
            {key}
          </Tag>
        );
      })
    ) : (
      <div style={{ color: '#999' }}>暂无，设置后推荐更精准哦</div>
    );

  const userLevel = getLevel(currentUser?.score);

  return (
    <HelmetProvider>
      <Helmet>
        {currentUser.nickName && <title>{currentUser.nickName}的主页 - 测试鸭</title>}
      </Helmet>
      <div>
        <Card>
          <Card.Meta
            className={styles.cardMeta}
            title={
              <Space align="center">
                <Title level={4} style={{ marginBottom: 0 }}>
                  {currentUser.nickName ? currentUser.nickName : DEFAULT_USER_NAME}
                </Title>
                <Tag color={userLevel.color} style={{ marginRight: 0, marginBottom: 3 }}>
                  {userLevel.name}
                </Tag>
                {isAdminUser(currentUser) && (
                  <Tag color="red" style={{ marginBottom: 3 }}>
                    管理员
                  </Tag>
                )}
              </Space>
            }
            description={currentUser.profile || '暂无个人简介'}
            avatar={
              <Tooltip title="点击上传头像文件" defaultVisible={gameState.gameTip}>
                <Avatar
                  style={{ border: '1px solid #eee', cursor: 'pointer' }}
                  src={currentUser.avatarUrl || DEFAULT_AVATAR}
                  size={96}
                  // @ts-ignore
                  onClick={() => {
                    if (currentUser._id === currentUser._id) {
                      setModalVisible(true);
                    }
                  }}
                />
              </Tooltip>
            }
          />
        </Card>
        <div style={{ marginTop: 16 }} />
        <Card
          title="信息"
          extra={
            currentUser._id === currentUser._id && (
              <Button type="link" icon={<EditOutlined />} onClick={() => setModalVisible(true)}>
                编辑
              </Button>
            )
          }
        >
          <Descriptions column={1} labelStyle={{ width: 100, marginBottom: 8 }} colon={false}>
            <Descriptions.Item label="积分">{currentUser.score}</Descriptions.Item>
            <Descriptions.Item label="性别">
              {USER_GENDER_ENUM[currentUser.gender] || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="简介">{currentUser.profile || '暂无'}</Descriptions.Item>
            <Descriptions.Item label="兴趣">{interestsTagView}</Descriptions.Item>
            <Descriptions.Item label="状态">
              {USER_JOB_STATUS_ENUM[currentUser.jobStatus] || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="邮箱">{currentUser.email || '暂无'}</Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {formatDateTimeStr(currentUser._createTime)}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <MyInfoUpdateModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          reload={() => setRefresh(!refresh)}
        />
      </div>
    </HelmetProvider>
  );
};

export default MyInfo;
