import axios from 'axios'
import {Message,Notification} from 'element-ui'
axios.interceptors.request.use(config => {
  return config;
}, err => {
  Notification.error({message: '请求超时!',offset:50});
  // return Promise.resolve(err);
})
axios.interceptors.response.use(
  data => {
    if (data.status && data.status === 200 && data.data.status === 500) {
      if (data.data.msg) {
        Notification.error({message: data.data.msg,offset:50});
        return;
      }
    }else if (data.data.status === 10){
      Notification.error({message:data.data.msg,offset:50});
        setTimeout(()=>{
            window.location.href="/";
        },1000);
        return;
    }
      if (data.data.msg) {
          // Notification.success({message: data.data.msg});
      }
    return data;
  },
  error => {
    if (error.response.status === 504 || error.response.status === 404) {
        Notification.error({message: '找不到服务器...',offset:50});

      } else if (error.response.status === 403) {
      if (error.response.data.status === 402) {
        Notification.error({message: '请登录！',offset:50});
        setTimeout(()=>{
          window.location.href="/";
        },1000);

      }else if(error.response.data.status===500) {
        Notification.error({message: '权限不足,请联系管理员!',offset:50});
      }else {
        Notification.error({message: error.response.data.meg,offset:50});

      }
    } else if (error.response.status === 401) {
        Notification.error({message: error.response.data.msg,offset:50});
      } else {
        if (error.response.data.msg) {
          Notification.error({message: error.response.data.msg,offset:50});
        } else {
          Notification.error({message: '未知错误!',offset:50});
        }
      }

      // return Promise.resolve(err);
    }
);
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let base = '';

export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
  });
};

export const postLoginRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      // 'Content-Type': 'application/json;charset=utf-8'
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    // transformRequest: [function (data) {
    //   let ret = ''
    //   for (let it in data) {
    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //   }
    //   return ret
    // }],
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
