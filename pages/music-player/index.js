// pages/music-player/index.js
import {getSongDetail} from '../../service/api_music'
import {audioContext} from '../../store/play-music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowLyric: true, // 是否显示歌词(当屏幕宽高比大于2时，显示歌词)
    playData: {},
    currentPage: 0,
    contentHeight: 0 // 页面swiper高度
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

    // 动态计算swiper高度
    const {statusBarHeight, screenHeight, screenWidth} = wx.getSystemInfoSync()
    const deviceRadio = screenHeight / screenWidth
    console.log(deviceRadio)
    this.setData({contentHeight: screenHeight - statusBarHeight -44, isShowLyric: deviceRadio >=2})

    // 播放歌曲
    audioContext.stop()
    audioContext.src = this.data.playData.detailData[0].url
    // audioContext.play()
    audioContext.autoplay = true // 自动播放
    audioContext.onCanplay(() => { // 准备好后进行播放
      audioContext.play()
    })
  },

  onBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  handleChange(e) {
    console.log(e)
    this.setData({currentPage: e.detail.current})
  },



  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  
})