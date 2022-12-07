import {HYEventStore} from 'hy-event-store'
import {parseLyric} from '../utils/parseLyric'
import {getSongDetail, getLyric} from '../service/api_music'

const audioContext = wx.createInnerAudioContext()

const playStore = new HYEventStore({
  state: {
    playData: {},
    lyric: []
  },
  actions: {
    async playMusicSongIDAction(ctx, payload) {
      const {id, name, artists, album} = payload
      const picUrl = JSON.parse(decodeURIComponent(payload.picUrl))
      // 获取歌曲信息
      const detailData = await getSongDetail(id)
      // 获取歌词
      const songLyric = await getLyric(id) 
      const lyric = parseLyric(songLyric.lrc.lyric)
      ctx.playData={id, name, picUrl,artists,album, detailData: detailData.data}
      ctx.lyric = lyric
      audioContext.src = ctx.playData.detailData[0].url
    }
  }
})

export  {playStore, audioContext}