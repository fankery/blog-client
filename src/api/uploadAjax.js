import axios from 'axios'
import filterUrl from './mockUrl.js'

/*****************************************公共的ajax请求方法********************/
/**
 * 公共ajax请求方法
 * @param {string} url 请求地址
 * @param {Object} params 请求参数
 * @param {function} callBackOpen 请求成功还未返回数据回调
 * @param {string} callBack 请求成功回调(返回数据)
 * @param {string} callBackError 请求失败
 */

axios.defaults.withCredentials = true

let commonAjaxUpload = (url, formData, responseType) => {
  let config = {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'multipart/form-data',
  };
  responseType && (config.responseType = responseType);
  return axios.post(url, formData, config).then(response => {
    if(responseType==='blob') {
      let fr = new FileReader()
      fr.onload = () => {
        console.log(fr.result)
        if (fr.result.indexOf('ms-excel') === -1) {
          let content = fr.result + ''
          content = window.atob(content.substring(29))
          //如果结果集中存在loginUrl字段,表示未登录,跳转登录页面
          if (content.indexOf('{') !== -1) {
            let contentObj = JSON.parse(content)
            if (typeof contentObj.data.loginUrl === 'string') {
              window.location.href = `/blog/redirect?service=${encodeURIComponent(window.location.href)}`
              return {
                isSuccess: false,
                retmsg: '未登录'
              }
            }
          }
        }
      }
      fr.readAsDataURL(response.data)
    }else {
      if(typeof response.data.loginUrl==='string'){
        window.location.href = `/blog/redirect?service=${encodeURIComponent(window.location.href)}`
        return {
          isSuccess: false,
          retmsg: '未登录'
        };
      }
    }
    return response.data;
  }).then(data => {
    return Promise.resolve(data)
  }).catch(error => {
    console.log(error)
  })
}
export default commonAjaxUpload
/************************************公共请求的ajax方法****************************/
