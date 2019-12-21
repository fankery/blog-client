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

let commonAjax
export default commonAjax = (url, type, params) => {
  return axios({
    url: filterUrl(url),
    method: type,
    [Object.is(type, 'post') ? 'data' : 'params']: params ? params : null,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Credentials': true,
      // 'Content-Type': 'application/octet-stream'
    },
  }).then(response => {
    //如果结果集中存在loginUrl字段,表示未登录,跳转登录页面
    if (response.data.loginUrl) {
      window.location.href = `/blog/redirect?service=${encodeURIComponent(window.location.href)}`
      return {
        isSuccess: false,
        retmsg: '未登录'
      }
    }
    return response.data
  }).then(data => {
    return Promise.resolve(data)
  }).catch(error => {
    console.log(error)
  })
}
/************************************公共请求的ajax方法****************************/
