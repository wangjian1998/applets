// components/song-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 1
    },
    itemData: {
      type: Object,
      value: {}
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
    handleClick(e) {
      const item = e.currentTarget.dataset.item
      console.log(item)
      const {id, name} = item
      // const picUrl = encodeURIComponent(JSON.stringify(item.picUrl))
      const picUrl = encodeURIComponent(JSON.stringify(item.al.picUrl))
      const artists = item.ar.map(item => item.name).join(', ')
      const album = item.al.name
      console.log(item)
      wx.navigateTo({
        url: `/pages/music-player/index?id=${id}&name=${name}&picUrl=${picUrl}&artists=${artists}&album=${album}`,
      })
    }
  }
})
