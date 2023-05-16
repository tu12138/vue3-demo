import axios from 'axios'

// 错误信息枚举对象
// enum MSGS {
//     "操作成功" = 200,
//     "密码错误",
//     "账号错误",
//     "请求异常"
// }

// 创建http实例
const http = axios.create({
    baseURL: '',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 请求拦截器
http.interceptors.request.use(config => {
    // to do ...
    config.headers = config.headers || {}

    const token = sessionStorage.getItem('token')

    if (token) {
        // config.headers.token = token || ''
    }
    return config
})

// 响应拦截器
http.interceptors.response.use(config => {

    const code = config.data.code

    if (code !== 200) {
        MSGS[code]
        return Promise.reject(config)
    }

    return config
}, err => {
    return err
})


export default http