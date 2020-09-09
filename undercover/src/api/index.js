import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/jwt/login',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/auth/jwt/logout',
    method: 'post'
  })
}
export function create(data) {
  return request({
    url: '/create',
    method: 'post',
    data
  })
}
export function addWord(data) {
  return request({
    url: '/api/addWord',
    method: 'post',
    data
  })
}
export function getWord() {
  return request({
    url: '/api/getWord',
    method: 'get'
  })
}
export function getUserInfo(data) {
  return request({
    url: '/api/userInfo/'+ data,
    method: 'get'
  })
}
export function updateGood(data) {
  return request({
    url: '/api/thinkGood/'+ data,
    method: 'get'
  })
}
export function updateBad(data) {
  return request({
    url: '/api/thinkBad/'+ data,
    method: 'get'
  })
}
export function modifyName(data) {
  return request({
    url: '/api/modifyName',
    method: 'post',
    data
  })
}