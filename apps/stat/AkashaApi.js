import fetch from 'node-fetch'
export const AkashaAPI = {
    async send (url) {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 10000)
        try {
          const response = await fetch('https://akasha.cv/api/' + url, {
            method: 'GET',
            headers: {
              "User-Agent": "ark-plugin"
            },
            signal: controller.signal
          })
          clearTimeout(timeout)
          if (!response.ok) {
            return false
          }
          const ret = await response.json()
          return ret
        } catch (err) {
          return false
        }
      }
}
export default { AkashaAPI }