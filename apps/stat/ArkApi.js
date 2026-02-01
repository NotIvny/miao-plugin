import fetch from 'node-fetch'
const baseUrl = 'http://localhost:3000'

export const ArkApi = {
  async post(path, data) {
    const url = baseUrl + path
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: controller.signal
      })
      clearTimeout(timeout)
      if (!response.ok) {
        return {
          retcode: 105
        }
      }
      const ret = await response.json()
      return ret
    } catch (err) {
      return { retcode: 105 }
    }
  },

  async get(path, data) {
    let url = baseUrl + path
    if (data) {
      const params = new URLSearchParams()
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          params.append(key, data[key])
        }
      }
      if (params.toString()) {
        url += '?' + params.toString()
      }
    }
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      })
      clearTimeout(timeout)
      if (!response.ok) {
        return {
          retcode: 105
        }
      }
      const ret = await response.json()
      return ret
    } catch (err) {
      return { retcode: 105 }
    }
  }
}



export default { ArkApi }
