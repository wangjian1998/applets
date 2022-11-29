// pages/detail-songs/index.js
import {hyEventStore} from '../../store/index'
import {getMenuDetail} from '../../service/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking: '',
    rankingInfo: {},
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {type} = options
    this.setData({type})
    if (type === 'rank') {
      const {ranking} = options
      this.setData({ranking})
      hyEventStore.onState(this.data.ranking, this.getData)
    } else if (type === 'menu') {
      const {id} = options
      getMenuDetail(id).then(res => {
        console.log(res)
        this.setData({rankingInfo: res.playlist})
      })
    }
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if (this.data.ranking) {
      hyEventStore.offState(this.data.ranking, this.getData)
    }
  },

  getData: function(res) {
    this.setData({rankingInfo: res})
    console.log(this.data.rankingInfo)
  }

})