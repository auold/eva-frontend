import * as moment from "moment";
import _date = moment.unitOfTime._date;

export interface AdvancedOperation1 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedOperation2 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedOperation3 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface AdvancedProfileData {
  advancedOperation1: AdvancedOperation1[];
  advancedOperation2: AdvancedOperation2[];
  advancedOperation3: AdvancedOperation3[];
}

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
