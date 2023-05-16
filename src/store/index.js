import { createStore } from "vuex";
import tool from '@/utils/tools';

const store = createStore({
    state() {
        return {
            tabsList: JSON.parse(sessionStorage.getItem('tabsList') || '[]'),
            selectKeys: JSON.parse(sessionStorage.getItem('selectKeys' || '[]'))
        }
    },

    mutations: {
        setTabsList(state, value) {
            state.tabsList = value
            tool.sessionStorage.set('tabsList', state.tabsList)
        },

        setSelectKeys(state, value) {
            state.selectKeys = value
            tool.sessionStorage.set('selectKeys', state.selectKeys)
        }
    },

    actions: {

        // 登录
        loginAction({ commit }, userInfo) {
            console.log(commit);
            // 返回一个promise对象
            return new Promise(async (resolve, reject) => {
                const res = await $API.login.login.post(userInfo)
                console.log(res);
            })
        }

    }
})

export default store;