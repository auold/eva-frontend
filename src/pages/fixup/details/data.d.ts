export interface TicketInfoType {
  ticketId: number;
  type: number;
  device: string;
  owner: string;
  phone: string;
  description: string;
  note: string;
  creator: number;
  created_at: {
    weekday: number;
    no: number;
    time: string;
  },
  status: number
}

export interface BriefUserInfoType {
  name: string,
  avatar: string,
  email: string,
  title: string,
  group: string
}
