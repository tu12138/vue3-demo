// 封装登录请求
import http from '../require';

export default {
    login: {
        // url: `${config.API_URL}/api/login` //生产地址和测试地址
        url: '/api/login',
        name: '用户登录',
        post: async function (data = {}) {
            return await http.post(data)
        }
    },

    getUserinfoList: {
        // url: `${config.API_URL}/api/login` //生产地址和测试地址
        url: '/api/getUserinfoList',
        name: '获取用户信息列表',
        post: async function (data = {}) {
            return await http.post(data)
        }
    }
}