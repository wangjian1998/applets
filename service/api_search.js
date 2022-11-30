import request from './index'

export function getSearchHot() {
  return request.get('/search/hot')
}