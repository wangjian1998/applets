import {HYEventStore} from 'hy-event-store'

import {getRankingData, getAllRankList, getRankSongList} from '../service/api_music'

const hyEventStore = new HYEventStore({
  state: {
    recommendSongList: [], // 推荐歌曲
    rankList: {},  // 热门榜单
    newRankList: {},   // 新歌榜单
    upRankList: {},  // 飙升榜单
    orignRankList: {}, // 原创榜单
  },
  actions: {
    getRecommendSong(ctx) {
      getRankingData().then(res => {
        ctx.recommendSongList = res
      })
    },
    async getDataRankingList(ctx) {
      const allRank = await getAllRankList()
      allRank.list.map(item => {
        return{ id: item.id, name: item.name, coverImgUrl: item.coverImgUrl}
      }).slice(0,4).forEach(i => {
        getRankSongList(i.id).then(res => {
          switch(i.name) {
            case '飙升榜':
              ctx.upRankList = res.playlist
              break;
            case '热歌榜':
              ctx.rankList = res.playlist
              break;
            case '原创榜':
              ctx.orignRankList = res.playlist
              break;
            case '新歌榜':
              ctx.newRankList = res.playlist
              break;
          }
        })
      })
    }
  }
})

export  {hyEventStore}