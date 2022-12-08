// pages/home-profile/index.js
import {getUserInfo} from '../../service/api_login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  async login() {
    const userInfo = await getUserInfo()
    this.setData({userInfo})
  },

  handlePhoneNumber(e) {
    console.log(e)
  },

  onUnload(options) {

  }
})