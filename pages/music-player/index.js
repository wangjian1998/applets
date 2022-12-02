// pages/music-player/index.js
import {getSongDetail} from '../../service/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {id} = options
    console.log(id)
    getSongDetail(id).then(res=> {
      console.log(res)
    })
  },

  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  
})