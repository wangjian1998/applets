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
    lyricTop: 0, // 歌词滚动距离  
    playModeIndex: 0, //播放模式
    playList: [], // 歌曲列表
    currentMusicIndex: 0 // 当前播放音乐在列表中的索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 监听store中的事件
    this.setupPlayStoreListener()

    // 动态计算swiper高度
    const {statusBarHeight, screenHeight, screenWidth} = wx.getSystemInfoSync()
    const deviceRadio = screenHeight / screenWidth
    this.setData({contentHeight: screenHeight - statusBarHeight -44, isShowLyric: deviceRadio >=2})

  },
// ==================事件处理======================
  onBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 上一首/下一首
  handleClickNext(e) {
    const isNext = e.currentTarget.dataset.bool
    let index = this.data.currentMusicIndex
    if (isNext && this.data.playModeIndex !== 1) {
      index = index + 1
      if (index === this.data.playList.length) index = 0
    } else if(!isNext && this.data.playModeIndex !== 1) {
      index = index - 1
      if (index === -1 ) index = this.data.playList.length - 1
    } else if(this.data.playModeIndex === 1) {
      index = this.data.currentMusicIndex
    }
    playStore.dispatch('playMusicSongIDAction', this.data.playList[index])
    playStore.setState('currentMusicIndex', index)
  },

  // 音乐模式切换
  handleModeClick() {
    let index = this.data.playModeIndex + 1
    if(index > 2) index = 0
    playStore.dispatch('changePlayModeIndexAction', index)
  },

  // swiper事件处理
  handleChange(e) {
    this.setData({currentPage: e.detail.current})
  },

  // slider滑动事件处理
  handleSliderChange(e) {
    playStore.dispatch('changePauseMusicAction', false)
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
    const isPause = !this.data.isPause
    playStore.dispatch('changePauseMusicAction', isPause)
  },


 // ==================数据监听=======================
    setupPlayStoreListener() {
      playStore.onStates(['playData','lyric'], ({playData, lyric}) => {
        if (playData) this.setData({playData})
        if (lyric) this.setData({lyric})
      })

      playStore.onStates(['currentTime','currentLyricInfo', 'currentIndex'], ({currentTime, currentLyricInfo, currentIndex}) => {
        // 时间变化
        if (currentTime && !this.data.isChanging && this.data.playData.detailData) {
          const sliderValue = currentTime / this.data.playData.detailData[0].time * 100
          this.setData({currentTime, sliderValue})
        }
        // 歌词变化
        if (currentLyricInfo) this.setData({currentLyricInfo})
        if (currentIndex) {
          this.setData({currentIndex, lyricTop: currentIndex* 35})
        }
      })

      // 监听播放模式改变
      playStore.onState('playModeIndex', (res) => {
        this.setData({playModeIndex: res})
      })

      // 监听是否暂停
      playStore.onState('isPause', (isPause) => {
        this.setData({isPause})
      })

      // 监听歌曲列表以及索引变化
      playStore.onStates(['playList', 'currentMusicIndex'], ({playList, currentMusicIndex}) => {
        if (playList) this.setData({playList})
        if (currentMusicIndex !== undefined) this.setData({currentMusicIndex})
        console.log(this.data.currentMusicIndex)
      })

    },


  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  
})