// pages/home-video/index.js
import {getTopMv} from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMvs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTopMvData(0)
  },

  async getTopMvData(offset) {
    // 判断是否可以请求
    if(!this.data.hasMore && offset !== 0) return

    // 展示加载动画
    wx.showNavigationBarLoading()

    // 请求数据
    const res = await getTopMv(offset)
    let newData = res.data
    if(offset === 0) { // 偏移量为0时直接赋值
      this.setData({topMvs: newData})
    } else { // 偏移量不为0时需要对数据进行拼接
      this.setData({topMvs: this.data.topMvs.concat(newData)})
    }

    this.setData({hasMore: res.hasMore})

    // 数据加载完成，停止动画
    wx.hideNavigationBarLoading()
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },

   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getTopMvData(this.data.topMvs.length)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getTopMvData(0)
  },

  handleVideoItemClick(event) {
    const id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail-video/index?id=' + id,
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})