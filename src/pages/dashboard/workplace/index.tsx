import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from "antd";
import React, { Component } from "react";

import { Dispatch } from "redux";
import Link from "umi/link";
import { formatMessage } from "umi/locale";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import moment from "moment";
import Radar from "./components/Radar";
import { ModalState } from "./model";
import EditableLinkGroup from "./components/EditableLinkGroup";
import styles from "./style.less";
import {
  ActivitiesType,
  CurrentUser,
  NoticeType,
  RadarDataType
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
  currentUser: CurrentUser;
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  dispatch: Dispatch<any>;
  currentUserLoading: boolean;
  projectLoading: boolean;
  activitiesLoading: boolean;
}

const PageHeaderContent: React.FC<{ currentUser: CurrentUser }> = ({
  currentUser
}) => {
  const loading = currentUser && Object.keys(currentUser).length;
  const time = new Date();
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
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {greeting}，{currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} | {currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: React.FC<{}> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic
        title={formatMessage({ id: "component.workspace.weekly-fix-count" })}
        value={56}
      />
    </div>
    <div className={styles.statItem}>
      <Statistic
        title={formatMessage({ id: "component.workspace.total-fix-count" })}
        value={2223}
      />
    </div>
  </div>
);

@connect(
  ({
    dashboardWorkplace: { currentUser, projectNotice, activities, radarData },
    loading
  }: {
    dashboardWorkplace: ModalState;
    loading: { effects: any };
  }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    currentUserLoading: loading.effects["dashboardWorkplace/fetchUserCurrent"],
    projectLoading: loading.effects["dashboardWorkplace/fetchProjectNotice"],
    activitiesLoading: loading.effects["dashboardWorkplace/fetchActivitiesList"]
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
      currentUser,
      activities,
      projectNotice,
      projectLoading,
      activitiesLoading,
      radarData
    } = this.props;

    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent />}
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
