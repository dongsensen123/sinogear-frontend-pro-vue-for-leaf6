import Vue from 'vue';
import { auth } from "../../../../../utils/auth";
import { updatePassword } from '../services/update-expired-password';
import store from '../../../../../store';
import router from '../../../../../router/index';

const actions = {
  updatePassword: async (context, payload) => {
    try {
      if (auth.getUserEntity().id) {
        const data = Object.assign({}, payload);
        await updatePassword(data, auth.getUserEntity().id);
        Vue.prototype.$message.success('修改密码成功,请重新登录!');
        store.commit('login/setForceUpdatePasswordStatus', false);
        router.push('/user/login')
      }
    } catch (err) {
      console.info(err)
    }
  }
};

export default {
  namespaced: true,
  actions
}