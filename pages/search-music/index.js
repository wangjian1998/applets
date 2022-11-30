// pages/search-music/index.js
import {getSearchHot} from '../../service/api_search'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotData: [],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSearchHotData()
  },

  getSearchHotData: function() {
    getSearchHot().then(res => {
      this.setData({hotData: res.result.hots})
      console.log(res)
    })
  },

  changeIndex(e) {
    const idx = e.currentTarget.dataset.idx
    this.setData({currentIndex: idx})
  }
})