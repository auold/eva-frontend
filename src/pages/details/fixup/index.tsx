import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Dropdown,
  Icon,
  List,
  Menu,
  Popover,
  Row,
  Steps,
  Table,
  Tooltip
} from "antd";
import { GridContent, PageHeaderWrapper } from "@ant-design/pro-layout";
import React, { Component, Fragment } from "react";

import { Dispatch } from "redux";
import classNames from "classnames";
import { connect } from "dva";
import { AdvancedProfileData } from "./data.d";
import styles from "./style.less";
import { ActivitiesType } from "@/pages/dashboard/workplace/data";

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

const action = <Fragment></Fragment>;

const extra = (
  <Row
    style={{
      minWidth: 400
    }}
  >
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>维修中</div>
    </Col>
  </Row>
);

const description = (
  <Descriptions className={styles.headerList} size="small" column={2}>
    <Descriptions.Item label="创建人">狄先生</Descriptions.Item>
    <Descriptions.Item label="所属班次">全部班</Descriptions.Item>
    <Descriptions.Item label="机主姓名">狄先生</Descriptions.Item>
    <Descriptions.Item label="手机号">18888188181</Descriptions.Item>
    <Descriptions.Item label="登记种类">电脑</Descriptions.Item>
    <Descriptions.Item label="品牌型号">联想X1C</Descriptions.Item>
    <Descriptions.Item label="登记时间">2017-07-07</Descriptions.Item>
    <Descriptions.Item label="问题情况">
      电脑登陆教务网显示满绩
    </Descriptions.Item>
  </Descriptions>
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

@connect(
  ({
    detailsFixup,
    loading
  }: {
    detailsFixup: AdvancedProfileData;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    detailsFixup,
    loading: loading.effects["detailsFixup/fetchAdvanced"]
  })
)
class Fixup extends Component<
  {
    loading: boolean;
    detailsFixup: AdvancedProfileData;
    dispatch: Dispatch<any>;
  },
  {
    operationKey: string;
    stepDirection: "horizontal" | "vertical";
  }
> {
  public state: {
    operationKey: string;
    stepDirection: "horizontal" | "vertical";
  } = {
    operationKey: "tab1",
    stepDirection: "horizontal"
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "detailsFixup/fetchAdvanced"
    });

    this.setStepDirection();
    window.addEventListener("resize", this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setStepDirection);
  }

  onOperationTabChange = (key: string) => {
    this.setState({ operationKey: key });
  };

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
    const { stepDirection, operationKey } = this.state;
    const { detailsFixup, loading } = this.props;
    const {
      advancedOperation1,
      advancedOperation2,
      advancedOperation3
    } = detailsFixup;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      )
    };
    return (
      <PageHeaderWrapper
        title="维修编号：234231029431"
        extra={action}
        content={description}
        extraContent={extra}
        tabActiveKey="detail"
        tabList={[
          {
            key: "detail",
            tab: "详情"
          }
        ]}
      >
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
      </PageHeaderWrapper>
    );
  }
}

export default Fixup;
