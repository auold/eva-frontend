const titles = [
  "张三",
  "李四",
  "王五",
  "王六",
  "王七",
  "王九",
  "王十",
  "王十一"
];
const avatars = [
  "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png", // Alipay
  "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png", // Angular
  "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", // Ant Design
  "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png", // Ant Design Pro
  "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png", // Bootstrap
  "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png", // React
  "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png", // Vue
  "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" // Webpack
];

const avatars2 = [
  "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
  "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
  "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
  "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
  "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
  "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
  "https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png",
  "https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png",
  "https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png",
  "https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png"
];

const getNotice = [
  {
    id: "xxx1",
    title: titles[0],
    logo: avatars[0],
    description: "屏幕爆炸了",
    updatedAt: new Date(),
    member: "电脑-Asus",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx2",
    title: titles[1],
    logo: avatars[1],
    description: "魔法棒工作灯不亮",
    updatedAt: new Date("2017-07-24"),
    member: "电器",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx3",
    title: titles[2],
    logo: avatars[2],
    description: "重装系统",
    updatedAt: new Date(),
    member: "电脑-HP",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx4",
    title: titles[3],
    logo: avatars[3],
    description: "重装系统",
    updatedAt: new Date("2017-07-23"),
    member: "电脑-ROG",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx5",
    title: titles[4],
    logo: avatars[4],
    description: "装CAD",
    updatedAt: new Date("2017-07-23"),
    member: "电脑-Dell",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx6",
    title: titles[5],
    logo: avatars[5],
    description: "装虚拟机",
    updatedAt: new Date("2017-07-23"),
    member: "电脑-Macbook Air",
    href: "",
    memberLink: ""
  }
];

const getActivities = [
  {
    id: "trend-1",
    updatedAt: new Date(),
    user: {
      name: "地先生",
      avatar: avatars2[0]
    },
    group: {
      name: "维修#1"
    },
    project: {
      name: "修好了，已通知机主"
    },
    template: "在 @{group} 评论 @{project}"
  },
  {
    id: "trend-2",
    updatedAt: new Date(),
    user: {
      name: "帝先生",
      avatar: avatars2[1]
    },
    group: {
      name: "维修#2"
    },
    project: {
      name: "维修成功|已取回"
    },
    template: "将 @{group} 标记为 @{project}"
  },
  {
    id: "trend-3",
    updatedAt: new Date(),
    user: {
      name: "林东东",
      avatar: avatars2[2]
    },
    group: {
      name: "中二少女团",
      link: "http://github.com/"
    },
    project: {
      name: "六月迭代",
      link: "http://github.com/"
    },
    template: "在 @{group} 新建项目 @{project}"
  },
  {
    id: "trend-4",
    updatedAt: new Date(),
    user: {
      name: "周星星",
      avatar: avatars2[4]
    },
    project: {
      name: "5 月日常迭代",
      link: "http://github.com/"
    },
    template: "将 @{project} 更新至已发布状态"
  },
  {
    id: "trend-5",
    updatedAt: new Date(),
    user: {
      name: "朱偏右",
      avatar: avatars2[3]
    },
    project: {
      name: "工程效能",
      link: "http://github.com/"
    },
    comment: {
      name: "留言",
      link: "http://github.com/"
    },
    template: "在 @{project} 发布了 @{comment}"
  },
  {
    id: "trend-6",
    updatedAt: new Date(),
    user: {
      name: "乐哥",
      avatar: avatars2[5]
    },
    group: {
      name: "程序员日常",
      link: "http://github.com/"
    },
    project: {
      name: "品牌迭代",
      link: "http://github.com/"
    },
    template: "在 @{group} 新建项目 @{project}"
  }
];

// our api implementation
const currentUser = {
  userid: 1,
  name: "笛先生",
  avatar: "https://itszzz.top/img/avatar.png",
  email: "di@xm.ug",
  title: "技术骨干",
  group: "电器部",
  fixcount: {
    weekly: 5000,
    total: 20000
  },
}

export default {
  "GET  /api/project/notice": getNotice,
  "GET  /api/activities": getActivities,
  "GET  /api/user/currentUser": currentUser
};
