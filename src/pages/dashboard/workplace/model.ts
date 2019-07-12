import { AnyAction, Reducer } from "redux";
import { EffectsCommandMap } from "dva";
import {
  ActivitiesType,
  NoticeType,
  RadarDataType,
  UserInfoType
} from "./data.d";
import {
  fakeChartData,
  queryActivities,
  queryProjectNotice,
  queryCurrentUserInfo
} from "./service";

export interface ModalState {
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  currentUserInfo: Partial<UserInfoType>;
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
    save: Reducer<ModalState>;
    clear: Reducer<ModalState>;
  };
  effects: {
    init: Effect;
    fetchProjectNotice: Effect;
    fetchActivitiesList: Effect;
    fetchChart: Effect;
    fetchCurrentUserInfo: Effect;
  };
}

const Model: ModelType = {
  namespace: "dashboardWorkplace",
  state: {
    projectNotice: [],
    activities: [],
    radarData: [],
    currentUserInfo: {}
  },
  effects: {
    *init(_, { put }) {
      yield put({ type: "fetchProjectNotice" });
      yield put({ type: "fetchActivitiesList" });
      yield put({ type: "fetchChart" });
      yield put({ type: "fetchCurrentUserInfo" });
    },
    *fetchProjectNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: "save",
        payload: {
          projectNotice: Array.isArray(response) ? response : []
        }
      });
    },
    *fetchActivitiesList(_, { call, put }) {
      const response = yield call(queryActivities);
      yield put({
        type: "save",
        payload: {
          activities: Array.isArray(response) ? response : []
        }
      });
    },
    *fetchChart(_, { call, put }) {
      const { radarData } = yield call(fakeChartData);
      yield put({
        type: "save",
        payload: {
          radarData
        }
      });
    },
    *fetchCurrentUserInfo(_, { call, put }) {
      const response = yield call(queryCurrentUserInfo);
      yield put({
        type: "save",
        payload: {
          currentUserInfo: response
        }
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    clear() {
      return {
        projectNotice: [],
        activities: [],
        radarData: [],
        currentUserInfo: {}
      };
    }
  }
};

export default Model;
