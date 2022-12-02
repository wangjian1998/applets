// pages/music-player/index.js
import {getSongDetail} from '../../service/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const {id, name, artists, album} = options
    const picUrl = JSON.parse(decodeURIComponent(options.picUrl))
    const detailData = await getSongDetail(id)
    this.setData({playData: {id, name, picUrl,artists,album, detailData: detailData.data}})
    console.log(this.data.playData)
  },



  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  
})