import { AnyAction, Reducer } from "redux";
import { EffectsCommandMap } from "dva";
import { TicketInfoType, BriefUserInfoType } from "./data.d";
import { queryTicketInfo, queryBriefUserInfo } from "./service";

export interface ModalState {
  ticketInfo: Partial<TicketInfoType>;
  creatorInfo: Partial<BriefUserInfoType>;
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
    fetchCreatorInfo: Effect;
  }
}

const Model: ModelType = {
  namespace: "FixupDetails",
  state: {
    ticketInfo: {},
    creatorInfo: {},
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
    *fetchCreatorInfo({ payload }, { call, put }) {
      const response = yield call(queryBriefUserInfo, payload.creatorId);
      yield put({
        type: "show",
        payload: {
          creatorInfo: response
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
