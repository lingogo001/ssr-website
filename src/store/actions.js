import * as $http from '@/api'
export const testData =  (store, testData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.commit('setTestData', testData)
      resolve(testData)
    }, testData.time)
  })
}
const requestPost = ({ state }, params) => {
  return $http.requestPost(params.api, params.data || {}, state)
}
const requestGet = ({ state }, params) => {
  return $http.requestGet(params.api, params.data || {}, state)
}
export const postFetch = requestPost // 公共post请求
export const getFetch = requestGet // 公共get请求
export const uploadFile = ({ state }, fileData) => { // 文件上传
  return $http.uploadFile(fileData, state)
}
export const getByUrl = ({ state }, params) => { // 公共get请求--参数拼到url后的
  return $http.fetchGet(params.api, params.data, state)
}
export const postByUrl = ({ state }, params) => { // 公共post请求--参数拼到url后的
  return $http.fetchPost(params.api, params.data, params.bodyData, state)
}

export const queryCategoryList = ({commit, state}) => { // 获取分类
  return new Promise((resolve, reject) => {
    Promise.all([
      $http.requestGet('getCategory', {}, state).catch(data => { console.log('Server Error', data) }), // 分类数据
      $http.requestGet('selectDicTreeVoList', {}, state).catch(data => { console.log('Server Error', data) }) // 数据字典
    ]).then(result => {
      commit('setCategoryList', result[0] ? result[0] : [])
      commit('setDicTreeList', result[1] ? result[1] : [])
      resolve()
    })
  })
}

export const emailSubscribe = ({state}, params) => { // 邮件订阅
  return new Promise((resolve, reject) => {
    $http.requestPost('sendEmail', params, state).then(data => {
      resolve(data)
    }).catch(error => { reject(error) })
  })
}
