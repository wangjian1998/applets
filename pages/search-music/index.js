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
    keywords: '', // 搜索关键字
    suggestSongsNodes: []
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

       //转成富文本nodes节点
       const suggestKeyWords = this.data.suggestSongs.map(item => item.keyword)
       const suggestSongsNodes = []
       for(const keyword of suggestKeyWords) {
         const nodes = []
         if (keyword.toUpperCase().startsWith(searchValue.toUpperCase())) {
           const key1 = keyword.slice(0, searchValue.length)
           const key2 = keyword.slice(searchValue.length)
           const node1 = {
             name: 'span',
             attrs: {style: 'color: #26ce8a'},
             children: [{type: 'text', text: key1}]
           }
           const node2 = {
            name: 'span',
            attrs: {style: 'color: #000000'},
            children: [{type: 'text', text: key2}]
          }
          nodes.push(node1)
          nodes.push(node2)
         } else {
          const node = {
            name: 'span',
            attrs: {style: 'color: #000000'},
            children: [{type: 'text', text: keyword}]
          }
          nodes.push(node)
         }
         console.log(nodes)
         suggestSongsNodes.push(nodes)
         
       }
       this.setData({suggestSongsNodes})
    })
  }
})