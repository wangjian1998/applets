import request from './index'

export function getTopMv(offset, limit=10) {
  return request.get('/top/mv', {offset, limit})
}
/**
 * 请求mv地址
 * @param {number} id mv id
 */
export function getMvAddress(id, r=1080) {
  return request.get('/mv/url', {id, r})
}

/**
 * 请求mv详情
 * @param {number} mvid mv id
 */
export function getMvDetail(mvid) {
  return request.get('/mv/detail', {mvid})
}

/**
 * 获取相关联的mv
 * @param {number} id 视频id
 */
export function getMvRelate(id) {
  return request.get('/related/allvideo', {id})
}