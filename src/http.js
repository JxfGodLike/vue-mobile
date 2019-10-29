import axios from 'axios'
import qs from 'qs'

// 响应时间
// axios.defaults.timeout = 5000;
// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 配置接口地址
// axios.defaults.baseURL = 'http://www.liulongbin.top:3005';

const http = axios.create({
  timeout: 5000,
  headers: {'Content-Type': 'application/json;charset=UTF-8'},
  baseURL: 'http://www.liulongbin.top:3005'
})

// POST传参序列化(添加请求拦截器)
http.interceptors.request.use((config) => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error);
});

// 返回状态判断(添加响应拦截器)
http.interceptors.response.use((res) => {
    // 对响应数据做些事
    if (!res.data.success) {
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    console.log('网络异常')
    return Promise.reject(error);
});

// 返回一个Promise(发送post请求)
export function Post(url, params) {
    return new Promise((resolve, reject) => {
      http.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
// 返回一个Promise(发送get请求)
export function Get(url, param) {
    return new Promise((resolve, reject) => {
      http.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default http
