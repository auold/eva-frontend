import {
  Avatar,
  Badge,
  Card,
  Col,
  Descriptions,
  Icon,
  List,
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
import { TicketInfoType, BriefUserInfoType } from "./data.d";
import { ModalState } from "./model";
import { RouteComponentProps } from "react-router";
import moment from "moment";

const { Step } = Steps;

const getWindowWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

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

interface FixupDetailsProps {
  dispatch: Dispatch<any>;
  ticketInfo: TicketInfoType;
  creatorInfo: BriefUserInfoType;
}

interface FixupDetailsStates {
  stepDirection: "horizontal" | "vertical";
}

interface SummaryContentProps {
  ticketInfo: TicketInfoType,
  creatorInfo: BriefUserInfoType,
  loadCreatorInfo: any;
  children: any;
}

const SummaryContent: React.FC<SummaryContentProps> = ({
  ticketInfo, creatorInfo, loadCreatorInfo, children
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

  let creator = "-";
  const creatorInfoLoaded = creatorInfo && Object.keys(creatorInfo).length;
  if (creatorInfoLoaded){
    creator = creatorInfo.name;
  }else{
    loadCreatorInfo(ticketInfo.creator);
  }
  // TODO: get user info by creator
  // TODO: fix created_at display
  const description = (
      <Descriptions className={styles.headerList} size="small" column={2}>
        <Descriptions.Item label="创建人">{creator}</Descriptions.Item>
        <Descriptions.Item label="创建班次">星期 {ticketInfo.created_at.weekday} ,第 {ticketInfo.created_at.no} 班</Descriptions.Item>
        <Descriptions.Item label="机主姓名">{ticketInfo.owner}</Descriptions.Item>
        <Descriptions.Item label="手机号">{ticketInfo.phone}</Descriptions.Item>
        <Descriptions.Item label="登记种类">{ticketInfo.type === 0 ? "电器" : "电脑"}</Descriptions.Item>
        <Descriptions.Item label="品牌型号">{ticketInfo.device}</Descriptions.Item>
        <Descriptions.Item label="登记时间">{moment(+moment.utc(ticketInfo.created_at.time)).format('llll')}</Descriptions.Item>
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
    FixupDetails: { ticketInfo, creatorInfo },
    loading,
  }: {
    FixupDetails: ModalState;
    loading: { effects: any };
  }) => ({
    ticketInfo, creatorInfo
  })
)

class Fixup extends Component<FixupDetailsProps & RouteComponentProps, FixupDetailsStates> {
  constructor(props: FixupDetailsProps & RouteComponentProps){
    super(props);
    this.state = { stepDirection: "horizontal" };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "FixupDetails/init",
      payload: {
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

  loadCreatorInfo = (creatorId: number) => {
    const { dispatch } = this.props;
    dispatch({
      type: "FixupDetails/fetchCreatorInfo",
      payload: {
        creatorId,
      }
    })
  };

  render() {
    const { stepDirection } = this.state;
    const {
      ticketInfo,
      creatorInfo,
    } = this.props;
    return (
      <SummaryContent ticketInfo={ticketInfo} creatorInfo={creatorInfo} loadCreatorInfo={this.loadCreatorInfo}>
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
                dataSource={[{title: creatorInfo.name || "...", description: ticketInfo.note || "..."}]}
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
