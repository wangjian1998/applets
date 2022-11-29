// pages/detail-video/index.js
import {getMvAddress, getMvDetail , getMvRelate} from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvURL: {},
    mvDetail: {},
    mvRelate: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id

    // 获取数据
    this.getMVData(id)

  },

  getMVData(id) {
    // 获取mv播放地址
    getMvAddress(id).then(res => {
      this.setData({mvURL: res.data})
      console.log(this.data.mvURL)
      console.log(this.data.mvURL.url)
    })

    // 获取mv相关信息
    getMvDetail(id).then(res => {
      this.setData({mvDetail: res.data})
      console.log(this.data.mvDetail)
    })

    // 获取相关联mv
    getMvRelate(id).then(res => {
      this.setData({mvRelate: res.data})
      console.log(this.data.mvRelate)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})