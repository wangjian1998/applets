import request from './index'


//获取轮播图
export function getBanner() {
  return request.get('/banner', {type: 2})
}

// 推荐新歌
export function getRankingData() {
  return request.get('/personalized/newsong')
}

// 热门歌单
export function getHotSongMenuList() {
  return request.get('/top/playlist', {limit: 10, offset: 0})
}

// 推荐歌单
export function getRecommendSongMenuList() {
  return request.get('/top/playlist', {limit: 10, offset: 0, cat: '华语'})
}

// 所有榜单
export function getAllRankList() {
  return request.get('/toplist')
}

/**
 * 获取每个榜单中的歌曲
 * @param {number} id 榜单id
 */
export function getRankSongList(id) {
  return request.get('/playlist/detail', {id})
}