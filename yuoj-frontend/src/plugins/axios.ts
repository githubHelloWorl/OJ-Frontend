import axios from "axios";

// 这行代码用于配置 Axios 请求在跨域情况下携带跨域请求的凭据
// （例如：cookies、HTTP认证以及客户端SSL证书等）。
//  在设置 withCredentials 为 true 之后，浏览器在发送跨域请求时会携带当前页面的 Cookies 信息。
// axios.defaults.withCredentials = true;
// axios.interceptors.withCredentials = true;
axios.defaults.withCredentials=true;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log("响应", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status code that false outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
