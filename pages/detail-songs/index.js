// pages/detail-songs/index.js
import {hyEventStore, playStore} from '../../store/index'
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
        this.setData({rankingInfo: res.playlist})
      })
    }
  
  },

  // ===========事件处理==============

  getData: function(res) {
    this.setData({rankingInfo: res})
  },


  handleClick(e) {
    const item = e.currentTarget.dataset.item
    const index = e.currentTarget.dataset.index
    const playList = this.data.rankingInfo.tracks.map(item => {
      return {
        id: item.id, 
        name: item.name, 
        picUrl: encodeURIComponent(JSON.stringify(item.al.picUrl)), 
        artists: item.ar.map(artist => artist.name).join(', '), 
        album: item.al.name
      }
    })
    wx.navigateTo({
      url: `/pages/music-player/index`,
    })

    // 请求歌曲数据和其他操作
  playStore.dispatch("playMusicSongIDAction", playList[index])
    // 设置播放列表
  playStore.dispatch("playListAction", {list: playList, index})
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if (this.data.ranking) {
      hyEventStore.offState(this.data.ranking, this.getData)
    }
  },



})