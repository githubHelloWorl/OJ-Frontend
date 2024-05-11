//initial state
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // commit("updateUser", payload);

      // 从远程请求登录信息
      const res = await UserControllerService.getLoginUser();
      if (res.code === 0) {
        commit("updateUser", payload);
      } else {
        commit("updateUser", {
          ...state.logUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
      // todo 改为从远程请求获取登录信息
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
