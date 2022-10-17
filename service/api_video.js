import request from './index'

export function getTopMv(offset, limit=10) {
  return request.get('/top/mv', {offset, limit})
}