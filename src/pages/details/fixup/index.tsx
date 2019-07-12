import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Icon,
  List,
  Menu,
  Popover,
  Row,
  Steps,
  Skeleton,
} from "antd";
import { GridContent, PageHeaderWrapper } from "@ant-design/pro-layout";
import React, { Component, Fragment } from "react";
import { Dispatch } from "redux";
import classNames from "classnames";
import { connect } from "dva";
import styles from "./style.less";
import { TicketInfoType } from "./data.d";
import { ModalState } from "./model";
import {RouteComponentProps} from "react-router";
import {switchCase} from "@babel/types";

const { Step } = Steps;
const ButtonGroup = Button.Group;

const getWindowWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      狄先生
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      李泳浩
      <Icon type="dingding-o" style={{ color: "#00A0E9", marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: "right" }}>
      <Badge
        status="default"
        text={<span style={{ color: "rgba(0, 0, 0, 0.45)" }}>未响应</span>}
      />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (
  dot: React.ReactNode,
  {
    status
  }: {
    status: string;
  }
) => {
  if (status === "process") {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        {dot}
      </Popover>
    );
  }
  return dot;
};

const data = [
  {
    title: "Mr. DI",
    description: "电脑密码是dzpwd"
  }
];

const columns = [
  {
    title: "操作类型",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "操作人",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "执行结果",
    dataIndex: "status",
    key: "status",
    render: (text: string) => {
      if (text === "agree") {
        return <Badge status="success" text="成功" />;
      }
      return <Badge status="error" text="驳回" />;
    }
  },
  {
    title: "操作时间",
    dataIndex: "updatedAt",
    key: "updatedAt"
  },
  {
    title: "备注",
    dataIndex: "memo",
    key: "memo"
  }
];

interface detailsFixupProps {
  dispatch: Dispatch<any>;
  ticketInfo: TicketInfoType;
}

interface detailsFixupStates {
  stepDirection: "horizontal" | "vertical";
}

const SummaryContent: React.FC<{ ticketInfo: TicketInfoType, children: any }> = ({
  ticketInfo, children
}) => {
  const loading = ticketInfo && Object.keys(ticketInfo).length;
  if(!loading) {
    return <Skeleton paragraph={{ rows: 4 }} active />
  }

  const statusContent = <Row
      style={{
        minWidth: 400
      }}
  >
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>{(() => {
            console.log(ticketInfo.status);
            switch (ticketInfo.status) {
              case 0:
                return "维修已创建";
                break;
              case 1:
                return "维修中";
                break;
              case 2:
                return "维修完成待取回";
                break;
              case 3:
                return "已取回";
                break;
              default:
                return "-";
            }
          }
      )()}</div>
    </Col>
  </Row>;

  console.log(ticketInfo.created_at.time);
  // TODO: get user info by creator
  // TODO: fix created_at display
  const description = (
      <Descriptions className={styles.headerList} size="small" column={2}>
        <Descriptions.Item label="创建人">{ticketInfo.creator}</Descriptions.Item>
        <Descriptions.Item label="创建班次">{ticketInfo.created_at.weekday}</Descriptions.Item>
        <Descriptions.Item label="机主姓名">{ticketInfo.owner}</Descriptions.Item>
        <Descriptions.Item label="手机号">{ticketInfo.phone}</Descriptions.Item>
        <Descriptions.Item label="登记种类">{ticketInfo.type === 0 ? "电器" : "电脑"}</Descriptions.Item>
        <Descriptions.Item label="品牌型号">{ticketInfo.device}</Descriptions.Item>
        <Descriptions.Item label="登记时间">{ticketInfo.created_at.time}</Descriptions.Item>
        <Descriptions.Item label="问题情况">{ticketInfo.description}</Descriptions.Item>
      </Descriptions>
  );

  return (
      <PageHeaderWrapper
          title={"维修编号：" + ticketInfo.ticketId.toString()}
          content={description}
          extraContent={statusContent}
      >
        { children }
      </PageHeaderWrapper>
  )
};

@connect(
  ({
    detailsFixup: { ticketInfo},
    loading,
  }: {
    detailsFixup: ModalState;
    loading: { effects: any };
  }) => ({
    ticketInfo,
  })
)
class Fixup extends Component<detailsFixupProps & RouteComponentProps, detailsFixupStates> {
  constructor(props: detailsFixupProps & RouteComponentProps){
    super(props);
    this.state = { stepDirection: "horizontal" };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "detailsFixup/init",
      payload: {
        // TODO: change to router
        ticketId: this.props.match.params["id"],
      }
    });

    this.setStepDirection();
    window.addEventListener("resize", this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setStepDirection);
  }

  setStepDirection = () => {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== "vertical" && w <= 576) {
      this.setState({
        stepDirection: "vertical"
      });
    } else if (stepDirection !== "horizontal" && w > 576) {
      this.setState({
        stepDirection: "horizontal"
      });
    }
  };

  render() {
    const { stepDirection } = this.state;
    const {
      ticketInfo
    } = this.props;
    return (
      <SummaryContent ticketInfo={ticketInfo}>
        <div
          style={{
            margin: 24,
            marginTop: 48
          }}
          className={styles.main}
        >
          <GridContent>
            <Card title="流程进度" style={{ marginBottom: 24 }}>
              <Steps
                direction={stepDirection}
                progressDot={customDot}
                current={1}
              >
                <Step title="创建维修" description={desc1} />
                <Step title="维修中" description={desc2} />
                <Step title="维修完成 待取回" />
                <Step title="已取回" />
              </Steps>
            </Card>
            <Card title="评论" style={{ marginBottom: 24 }}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </GridContent>
        </div>
      </SummaryContent>
    );
  }
}

export default Fixup;
