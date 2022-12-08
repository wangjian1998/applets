
const BASE_URL = 'http://123.207.32.32:9001'

const LOGIN_BASE_URL = 'http://123.207.32.32:3000'
// const BASE_URL = 'http://43.138.177.191:3000'
class WjRequest {
  constructor(url) {
    this.url = url
  }
  request(url, method, params, header = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.url + url,
        method,
        data: params,
        header: header,
        success: function(res) {
          return resolve(res.data)
        },
        fail: function(err) {
          return reject(err)
        }
      })
    })
  }

  get(url, params, header) {
    return this.request(url, 'GET', params, header)
  }

  post(url, params, header) {
    return this.request(url, 'POST', params, header)
  }
}

const request = new WjRequest(BASE_URL)
const loginRequest = new WjRequest(LOGIN_BASE_URL)

export default request
export {loginRequest}