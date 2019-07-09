// 代码中会兼容本地 service mock 以及部署站点的静态数据
// @ts-ignore
export default {
  // 支持值为 Object 和 Array
  "GET /api/currentUser": {
    name: "笛先生",
    avatar: "https://itszzz.top/img/avatar.png",
    userid: 1,
    email: "di@xm.ug",
    signature: "海纳百川，有容乃大",
    title: "技术骨干",
    group: "电器部"
  },
  // GET POST 可省略
  "GET /api/users/list": [
    {
      count: 2
    }
  ],
  "GET /api/users/list/1": [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    }
  ]
};
