import { StoreOptions } from "vuex";
import DemoData, { Iauth } from "@/database";

export interface IauthModule {
  auth: Iauth | null;
}

export const authModule: StoreOptions<IauthModule> = {
  state: () => ({
    auth: null,
  }),
  mutations: {
    SETAUTH: (state, payload: Iauth) => {
      state.auth = payload;
    },
  },
  actions: {
    setauth: ({ commit, state }, payload: Iauth) => {},
  },
};
