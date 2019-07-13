const getTicketOne = {
  ticketId: 1,
  type: 1,
  device: "Lenovo ThinkPad Carbon X1 2018",
  owner: "弟先⽣",
  phone: "+86 10086",
  description: "电源灯不亮了",
  note: "机主属实弟弟",
  creator: 2,
  created_at: {
    weekday: 1,
    no: 1,
    time: "2019-07-10T12:37:24.6642037Z"
  },
  status: 1
};

const postedNewForm = (req: any, res: any) => {
  res.send({ message: "Ok" });
};

export default {
  "GET  /api/fixup/1": getTicketOne,
  "POST /api/forms": postedNewForm,
};
