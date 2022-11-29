// pages/home-music/index.js
import {hyEventStore} from '../../store/index'
import {getBanner, getHotSongMenuList, getRecommendSongMenuList, getAllRankList} from '../../service/api_music'
import getBannerHeight from '../../utils/select-rect'
import throttle from '../../utils/throttle'

const throttleRueryRect = throttle(getBannerHeight)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    swiperHeight: 60,
    recommondList: [],
    hotSongMenu: [], // 热门歌单
    recommendSongMenuList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.getPageData()

   // 请求数据
   hyEventStore.dispatch("getRecommendSong")

  //  hyEventStore.dispatch("getDataRankingList")

   // 获取store中数据
   hyEventStore.onState('recommendSongList', res=> {
    //  console.log(res)
     if (!res.result) return
     const commondSongs = res.result.slice(0, 6)
     this.setData({recommondList: commondSongs})
   })
  },

  getPageData() {
    getBanner().then(res => {
      this.setData({banners: res.banners})
    })

    getHotSongMenuList().then(res => {
      this.setData({hotSongMenu: res.playlists})
    })

    getRecommendSongMenuList().then(res => {
      this.setData({recommendSongMenuList: res.playlists})
    })

    getAllRankList().then(res => {
      console.log(res)
    })
  },

  /**
   * 手动获取轮播图swiper组件的高度，默认swiper组件高度为150px 如果不动态设置高度，那么在不同设备上此时会存在问题，要求swiper组件的
   * 高度与里面图片的高度是一致的。此时在图片加载完毕后调用小程序中createSelectorQuery API来进行组件高度的计算。获取到高度后赋值到swiper中
   */
  getImageHeight() {
    throttleRueryRect('.swiper-image').then(res => {
      this.setData({swiperHeight: res[0].height})
    })
    // const query = wx.createSelectorQuery()
    // query.select('.swiper-image').boundingClientRect()
    // query.exec(res => {
    //   console.log(res)
    //   this.setData({swiperHeight: res[0].height})
    // })
  },


  clickInput() {
    wx.navigateTo({
      url: '/pages/search-music/index',
    })
  },

  handleClick() {
    this.navigateToPage('recommendSongList')
  },

  navigateToPage(pageName) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranging=${pageName}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})