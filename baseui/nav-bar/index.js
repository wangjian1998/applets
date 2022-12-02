// baseui/nav-bar/index.js
Component({
  options: {
    multipleSlots: true // 使用多个插槽
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: 'String',
      value: '默认标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0
  },
  lifetimes: {
    ready: function() {
      const {statusBarHeight} = wx.getSystemInfoSync()
      this.setData({statusBarHeight})
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
