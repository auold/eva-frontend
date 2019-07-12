import { AnyAction, Reducer } from "redux";
import { EffectsCommandMap } from "dva";
import { TicketInfoType } from "./data.d";
import { queryTicketInfo } from "./service";

export interface ModalState {
  ticketInfo: Partial<TicketInfoType>;
}

export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & {
      select: <T>(func: (state: ModalState) => T) => T;
    }
) => void;

export interface ModelType {
  namespace: string;
  state: ModalState;
  reducers: {
    show: Reducer<ModalState>;
  };
  effects: {
    init: Effect;
    fetchTicketInfo: Effect;
  }
}

const Model: ModelType = {
  namespace: "detailsFixup",
  state: {
    ticketInfo: {},
  },
  effects: {
    *init({ payload }, { put }) {
      yield put({
        type: "fetchTicketInfo",
        payload: payload,
      })
    },
    *fetchTicketInfo({ payload }, { call, put }) {
      const response = yield call(queryTicketInfo, payload.ticketId);
      yield put({
        type: "show",
        payload: {
          ticketInfo: response
        },
      })
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};

export default Model;
