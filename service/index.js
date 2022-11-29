
const BASE_URL = 'http://123.207.32.32:9001'
class WjRequest {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method,
        data: params,
        success: function(res) {
          return resolve(res.data)
        },
        fail: function(err) {
          return reject(err)
        }
      })
    })
  }

  get(url, params) {
    return this.request(url, 'GET', params)
  }

  post(url, params) {
    return this.request(url, 'POST', params)
  }
}

const request = new WjRequest()

export default request