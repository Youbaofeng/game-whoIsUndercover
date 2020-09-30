import axios from 'axios'
// import store from '@/store/store'

import {Toast} from "vant"
// create an axios instance
const service = axios.create({
//   baseURL: 'http://47.107.126.241:7001/', // url = base url + request url
  baseURL: 'http://127.0.0.1:7001/', // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem("token");
        if (token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            // Bearer是JWT的认证头部信息
            config.headers.common["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)
service.interceptors.response.use(
    response => {
        const res = response.data
        if(res.code != 20000){
            console.log(res);
            Toast(res.message)
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
          return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Toast({ message: error.message })
        return Promise.reject(error)
    }
);

export default service