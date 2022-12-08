import {loginRequest} from './index'
export function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success: (result) => {
        const code = result.code
        resolve(code)
      },
      fail: (res) => {
        // console.log(res)
        reject(res)
      },
    })
  })
}

export function sendCodeToServer(code) {
  return loginRequest.post('/login', {code})
}

export function checkTokenTimeout(token) {
  return loginRequest.post('/auth', {}, {token})
}

export function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: (res) => {
        resolve(true)
      },
      fail: (res) => {
        reject(false)
      }
    })
  })
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用户登录',
      success: (result) => {
        resolve(result)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}