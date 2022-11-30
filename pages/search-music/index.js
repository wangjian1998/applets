// pages/search-music/index.js
import {getSearchHot, getSearchSuggest} from '../../service/api_search'
import debounce from '../../utils/debounce'
const debounceSearchSuggest = debounce(getSearchSuggest)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotData: [], // 热门搜索数据
    currentIndex: 0, //当前索引
    suggestSongs: [], // 建议歌曲
    keywords: '' // 搜索关键字
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
  },

  handleSearch(data) {
    const searchValue = data.detail
    this.setData({keywords: searchValue})
    if(! searchValue) {
      this.setData({suggestSongs: []})
      return
    }
    debounceSearchSuggest(searchValue).then(res => {
      console.log(res)
      this.setData({suggestSongs: res.result.allMatch})
    })
  }
})