axios.defaults.withCredentials = true
axios.interceptors.request.use(
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
axios.interceptors.response.use(
    response => {
        document.getElementById('log').append(JSON.stringify(response.data))
        return response;
    }
);