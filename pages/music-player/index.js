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
    contentHeight: 0, // 页面swiper高度
    currentTime: 0, // 播放的当前时间
    sliderValue: 0,
    isPause: false, // 是否暂停
    isChanging: false // 是否正在滑动
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const {id, name, artists, album} = options
    // const picUrl = JSON.parse(decodeURIComponent(options.picUrl))
    const picUrl = 'http://p1.music.126.net/3OWbvJR4kAx9JCVFMlS4cQ==/109951168111317187.jpg'
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

    audioContext.onTimeUpdate(() => {
      if (!this.data.isChanging) {
        const currentTime = audioContext.currentTime*1000
        const sliderValue = currentTime / this.data.playData.detailData[0].time * 100
        this.setData({currentTime, sliderValue})
      }
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

  handleSliderChange(e) {
    // 获取slider变化值
    const value = e.detail.value
    // 计算需要播放的时间
    const needTime = this.data.playData.detailData[0].time * value/100
    // 设置context播放needTime位置的音乐
    audioContext.pause()
    audioContext.seek(needTime / 1000)

    this.setData({sliderValue: value, isChanging: false})
  },

  handleSliderChanging(e) {
    console.log(e)
    const currentTime =  this.data.playData.detailData[0].time * e.detail.value / 100
    this.setData({isChanging: true, currentTime})
  },

  // 暂停音乐
  pauseMusic() {
    this.setData({isPause: true})
    audioContext.pause()
  },

  resumeMusic() {
    this.setData({isPause: false})
    audioContext.seek(this.data.currentTime / 1000)
  },



  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  
})