import {HYEventStore} from 'hy-event-store'
import {parseLyric} from '../utils/parseLyric'
import {getSongDetail, getLyric} from '../service/api_music'

// const audioContext = wx.createInnerAudioContext()

const audioContext = wx.getBackgroundAudioManager() // 使用后台播放

const playStore = new HYEventStore({
  state: {
    playData: {}, // 歌曲信息
    lyric: [], // 歌词信息
    id: '', // 歌曲id
    currentTime: 0, // 播放的当前时间
    currentLyricInfo: '', // 当前歌词
    currentIndex: -1, //当前歌词索引
    playModeIndex: 0, //播放模式 0：循环；1：单曲；2：随机
    isPause: false, // 是否暂停
    playList: [], // 歌曲列表
    currentMusicIndex: 0, // 当前歌曲在歌曲列表中的索引
    isFirstPlay: true, // 是否第一次播放
    isStoping: false // 是否是停止状态
  },
  actions: {
    async playMusicSongIDAction(ctx, payload) {
      const {id, name, artists, album} = payload
      if (ctx.id === id && ctx.playModeIndex !== 1) return // 点击相同歌曲不重新播放
      ctx.id = id
      ctx.isPause = false
      ctx.playData = {}
      ctx.lyric = []
      ctx.currentTime = 0
      const picUrl = JSON.parse(decodeURIComponent(payload.picUrl))
      // 获取歌曲信息
      const detailData = await getSongDetail(id)
      // 获取歌词
      const songLyric = await getLyric(id) 
      const lyric = parseLyric(songLyric.lrc.lyric)
      ctx.playData={id, name, picUrl,artists,album, detailData: detailData.data}
      ctx.lyric = lyric
      // 播放歌曲
      audioContext.stop()
      audioContext.src = ctx.playData.detailData[0].url
      audioContext.title = name
      audioContext.autoplay = true // 自动播放
      // 监听audiocontext的一些事件
      if (ctx.isFirstPlay) {
        this.dispatch('setupAudioContextListenerAction')
        ctx.isFirstPlay = false
      }


    },

    setupAudioContextListenerAction(ctx) {
      audioContext.onCanplay(() => { // 准备好后进行播放
        audioContext.play()
      })
      // 监听时间改变
      audioContext.onTimeUpdate(() => {
        // 获取当前时间
        const currentTime = audioContext.currentTime*1000
        ctx.currentTime = currentTime
        // 根据当前时间去查找播放的歌词
        for (let i=0;i<ctx.lyric.length;i++) {
          const lyricInfo = ctx.lyric[i]
          if (currentTime < lyricInfo.time) {
            const currentIndex = i -1
            const currentLyricInfo = ctx.lyric[currentIndex]
            ctx.currentLyricInfo =  currentLyricInfo.lyricText
            ctx.currentIndex =  currentIndex
            break
          }
        }
      })

      // 监听歌曲播放完成
      audioContext.onEnded(()=> {
        this.dispatch('changeNewMusicAction', true)
      })

      // 监听音乐暂停/播放/停止
      // 播放状态
      audioContext.onPlay(() => {
        ctx.isPause = false
      })
      // 暂停状态
      audioContext.onPause(() => {
        ctx.isPause = true
      })
      // 停止状态
      audioContext.onStop(() => {
        ctx.isPause = true
        ctx.isStoping = true
      })
    },

    // 更改播放模式
    changePlayModeIndexAction(ctx, index) {
      ctx.playModeIndex = index
      console.log(ctx.playModeIndex)
    },

    // 歌曲暂停与继续播放
    changePauseMusicAction(ctx, isPause) {
      ctx.isPause = isPause
      if(!ctx.isPause && ctx.isStoping) {
        audioContext.src = ctx.playData.detailData[0].url
        audioContext.title = ctx.playData.name
        ctx.isStoping = false
      }
      !ctx.isPause ? audioContext.play() : audioContext.pause()
    },

    playListAction(ctx, {list, index}) {
      ctx.playList = list
      ctx.currentMusicIndex = index
    },
    changeNewMusicAction(ctx, isNext) {
      let index = ctx.currentMusicIndex
      switch(ctx.playModeIndex) {
        case 0:  // 循环播放
          index = isNext ? index + 1 : index - 1
          if (index === ctx.playList.length) index = 0
          if (index === -1 ) index = ctx.playList.length - 1
          break
        case 1: // 单曲
          break
        case 2: //随机
          index = Math.floor(Math.random() * ctx.playList.length)
      }
      ctx.currentMusicIndex = index
      this.dispatch('playMusicSongIDAction', ctx.playList[index])
      
    }


  }
})

export  {playStore, audioContext}