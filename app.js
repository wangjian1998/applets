// app.js
import {getLoginCode, sendCodeToServer, checkTokenTimeout, checkSession} from './service/api_login'
App({
 onLaunch: async function() {
   // 让用户默认进行登录
    this.handleLogin()

    // 获取用户信息
 },

 async handleLogin() {
   // 1. 让用户默认进行登录
   const token = wx.getStorageSync('token')
   // 2. 判断token是否过期
   const checkToken = await checkTokenTimeout(token)
   console.log(checkToken)
   // 判断session是否过期
   const session = await checkSession()
   if (!token ||  checkToken.errorCode || !session) this.loginAction()
 },

 async loginAction() {
  const code = await getLoginCode() // 获取code
  const {token} = await sendCodeToServer(code) // 获取token
  wx.setStorageSync('token', token) // 存入缓存
 }
})
