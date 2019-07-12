const advancedOperation1 = [
  {
    key: "op1",
    type: "订购关系生效",
    name: "曲丽丽",
    status: "agree",
    updatedAt: "2017-10-03  19:23:12",
    memo: "-"
  },
  {
    key: "op2",
    type: "财务复审",
    name: "付小小",
    status: "reject",
    updatedAt: "2017-10-03  19:23:12",
    memo: "不通过原因"
  },
  {
    key: "op3",
    type: "部门初审",
    name: "周毛毛",
    status: "agree",
    updatedAt: "2017-10-03  19:23:12",
    memo: "-"
  },
  {
    key: "op4",
    type: "提交订单",
    name: "林东东",
    status: "agree",
    updatedAt: "2017-10-03  19:23:12",
    memo: "很棒"
  },
  {
    key: "op5",
    type: "创建订单",
    name: "汗牙牙",
    status: "agree",
    updatedAt: "2017-10-03  19:23:12",
    memo: "-"
  }
];

const advancedOperation2 = [
  {
    key: "op1",
    type: "订购关系生效",
    name: "曲丽丽",
    status: "agree",
    updatedAt: "2017-10-03  19:23:12",
    memo: "-"
  }
];

const advancedOperation3 = [
  {
    key: "op1",
    type: "创建订单",
    name: "汗牙牙",
    status: "agree",
    updatedAt: "2017-10-03  19:23:12",
    memo: "-"
  }
];

const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3
};

const getTicketOne = {
  ticketId: 1,
  type: 1,
  device: "Lenovo ThinkPad Carbon X1 2018",
  owner: "弟先⽣",
  phone: "+86 10086",
  description: "电源灯不亮了",
  note: "机主属实弟弟",
  creator: 1,
  created_at: {
    weekday: 1,
    no: 1,
    time: "2019-07-10T12:37:24.6642037Z"
  },
  status: 1
};

export default {
  "GET  /api/profile/advanced": getProfileAdvancedData,
  "GET  /api/fixup/1": getTicketOne,
};
