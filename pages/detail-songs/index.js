// pages/detail-songs/index.js
import {hyEventStore} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking: '',
    rankingInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const ranking = options.ranking
    this.setData({ranking})

    hyEventStore.onState(this.data.ranking, this.getData)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    hyEventStore.offState(this.data.ranking, this.getData)
  },

  getData: function(res) {
    this.setData({rankingInfo: res})
    console.log(this.data.rankingInfo)
  }

})