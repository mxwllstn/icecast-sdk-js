const IcecastServer = require('icecast-sdk-js')

const hostUrl = 'http://locahost:8000'
const ic = new IcecastServer(hostUrl)

void (async () => {
  const stats = await ic.getStats()
  console.log(stats)
})()
