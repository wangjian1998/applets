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

// 歌单详情
export function getMenuDetail(id) {
  return request.get('/playlist/detail/dynamic', {id})
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

/**
 * 获取每个榜单中的歌曲
 * @param {ids} id 歌曲ids
 */
// export function getSongDetail(ids) {
//   return request.get('/song/detail', {ids})
// }
export function getSongDetail(id) {
  return request.get('/song/url/v1', {id})
}


/**
 * 获取歌词
 * @param {number} id 歌曲id
 */
export function getLyric(id) {
  return request.get('/lyric', {id})
}


