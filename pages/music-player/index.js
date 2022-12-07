// pages/music-player/index.js
import {getSongDetail, getLyric} from '../../service/api_music'
import {audioContext} from '../../store/play-music'
import {parseLyric} from '../../utils/parseLyric'
import {playStore} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowLyric: true, // 是否显示歌词(当屏幕宽高比大于2时，显示歌词)
    playData: {},
    lyric: [], //歌词信息
    currentPage: 0,
    contentHeight: 0, // 页面swiper高度
    currentTime: 0, // 播放的当前时间
    sliderValue: 0,
    isPause: false, // 是否暂停
    isChanging: false, // 是否正在滑动
    currentLyricInfo: '', // 当前歌词
    currentIndex: -1, //当前歌词索引
    lyricTop: 0 // 歌词滚动距离  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 获取传递过来的信息
    // const {id, name, artists, album} = options
    // const picUrl = JSON.parse(decodeURIComponent(options.picUrl))
    // const detailData = await getSongDetail(id)
    // // 获取歌词
    // const songLyric = await getLyric(id) 
    // const lyric = parseLyric(songLyric.lrc.lyric)
    // this.setData({playData: {id, name, picUrl,artists,album, detailData: detailData.data}, lyric})
    this.setupPlayStoreListener()

    // 动态计算swiper高度
    const {statusBarHeight, screenHeight, screenWidth} = wx.getSystemInfoSync()
    const deviceRadio = screenHeight / screenWidth
    this.setData({contentHeight: screenHeight - statusBarHeight -44, isShowLyric: deviceRadio >=2})

    // 播放歌曲
    audioContext.stop()
    // audioContext.src = this.data.playData.detailData[0].url
    // audioContext.play()
    audioContext.autoplay = true // 自动播放
    audioContext.onCanplay(() => { // 准备好后进行播放
      audioContext.play()
    })

    audioContext.onTimeUpdate(() => {
      // 获取当前时间
      const currentTime = audioContext.currentTime*1000
      // 根据当前时间修改currentTime与sliderTime
      if (!this.data.isChanging) {
        const sliderValue = currentTime / this.data.playData.detailData[0].time * 100
        this.setData({currentTime, sliderValue})
      }
      // 根据当前时间去查找播放的歌词
      for (let i=0;i<this.data.lyric.length;i++) {
        const lyricInfo = this.data.lyric[i]
        if (currentTime < lyricInfo.time) {
          const currentIndex = i -1
          const currentLyricInfo = this.data.lyric[currentIndex]
          this.setData({currentLyricInfo: currentLyricInfo.lyricText, currentIndex, lyricTop: currentIndex* 35})
          // console.log(currentLyricInfo)
          break
        }
      }
    })
  },

  onBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  // swiper事件处理
  handleChange(e) {
    this.setData({currentPage: e.detail.current})
  },

  // slider滑动事件处理
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

  // slider滑动时事件处理
  handleSliderChanging(e) {
    const currentTime =  this.data.playData.detailData[0].time * e.detail.value / 100
    this.setData({isChanging: true, currentTime})
  },

  // 暂停音乐
  pauseMusic() {
    this.setData({isPause: true})
    audioContext.pause()
  },
  // 继续播放音乐
  resumeMusic() {
    this.setData({isPause: false})
    audioContext.seek(this.data.currentTime / 1000)
  },



    setupPlayStoreListener() {
      playStore.onStates(['playData','lyric'], ({playData, lyric}) => {
        if (playData) this.setData({playData})
        if (lyric) this.setData({lyric})
      })
    },

  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  
})