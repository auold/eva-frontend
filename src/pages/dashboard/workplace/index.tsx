import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from "antd";
import React, { Component } from "react";

import { Dispatch } from "redux";
import Link from "umi/link";
import { formatMessage } from "umi/locale";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import moment from "moment";
import { ModalState } from "./model";
import EditableLinkGroup from "./components/EditableLinkGroup";
import styles from "./style.less";
import {
  ActivitiesType,
  NoticeType,
  RadarDataType,
  UserInfo
} from "./data.d";

const links = [
  {
    title: "维修登记",
    href: ""
  },
  {
    title: "查询维修工单",
    href: ""
  }
];

interface dashboardWorkplaceProps {
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  dispatch: Dispatch<any>;
  projectLoading: boolean;
  activitiesLoading: boolean;
  currentUserInfo: UserInfo;
  currentUserInfoLoading: boolean;
}

const PageHeaderContent: React.FC<{ currentUserInfo: UserInfo }> = ({
  currentUserInfo
}) => {
  const loading = currentUserInfo && Object.keys(currentUserInfo).length;
  const time = new Date();
  let content = '祝你开心每一天！';
  if (currentUserInfo.name == '笛先生'){
    content = '祝你满绩每一天！'
  }
  let greeting = " ";
  if (time.getHours() < 10) {
    greeting = "早安";
  } else if (time.getHours() < 14) {
    greeting = "午安";
  } else if (time.getHours() < 17) {
    greeting = "下午好";
  } else {
    greeting = "晚上好";
  }
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUserInfo.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {greeting}，{currentUserInfo.name}
          ，{content}
        </div>
        <div>
          {currentUserInfo.title} | {currentUserInfo.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: React.FC<{ currentUserInfo: UserInfo }> = ({
    currentUserInfo
}) => {
  const loading = currentUserInfo && Object.keys(currentUserInfo).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <Statistic
              title={formatMessage({id: "component.workspace.weekly-fix-count"})}
              value={currentUserInfo.fixcount.weekly}
          />
        </div>
        <div className={styles.statItem}>
          <Statistic
              title={formatMessage({id: "component.workspace.total-fix-count"})}
              value={currentUserInfo.fixcount.total}
          />
        </div>
      </div>
  );
}

@connect(
  ({
    dashboardWorkplace: { projectNotice, activities, radarData, currentUserInfo },
    loading
  }: {
    dashboardWorkplace: ModalState;
    loading: { effects: any };
  }) => ({
    projectNotice,
    activities,
    radarData,
    currentUserInfo,
    projectLoading: loading.effects["dashboardWorkplace/fetchProjectNotice"],
    activitiesLoading: loading.effects["dashboardWorkplace/fetchActivitiesList"],
    currentUserInfoLoading: loading.effects["dashboardWorkplace/fetchCurrentUserInfo"],
  })
)
class Workplace extends Component<dashboardWorkplaceProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "dashboardWorkplace/init"
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "dashboardWorkplace/clear"
    });
  }

  renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const {
      activities,
      projectNotice,
      projectLoading,
      activitiesLoading,
      currentUserInfo,
    } = this.props;

    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUserInfo={currentUserInfo} />}
        extraContent={<ExtraContent currentUserInfo={currentUserInfo} />}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的维修"
              bordered={false}
              extra={<Link to="/query/fixup">全部维修</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {projectNotice.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ""}</Link>
                      {item.updatedAt && (
                        <span
                          className={styles.datetime}
                          title={item.updatedAt}
                        >
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List<ActivitiesType>
                loading={activitiesLoading}
                renderItem={item => this.renderActivities(item)}
                dataSource={activities}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup
                onAdd={() => {}}
                links={links}
                linkElement={Link}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
