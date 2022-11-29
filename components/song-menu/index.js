// components/song-menu/index.js
// import getSwiperHeight from '../../utils/select-rect'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    SongMenu: {
      type: Array,
      value: [],
    },
    title: {
      type: String,
      value: '默认歌单'
    }
  },

 

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(event) {
      const id =event.currentTarget.dataset.item.id
      wx.navigateTo({
        url: `/pages/detail-songs/index?id=${id}&type=menu`,
      })
    }
   
  }
})
