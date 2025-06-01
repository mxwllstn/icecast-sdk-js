import IcecastServer from '@icecast-sdk-js'

const hostUrl = process.env.IC_HOST ?? 'https://stream.sonicscape.land'
const ic = new IcecastServer(hostUrl)

void (async () => {
  const stats = await ic.getStats()
  console.log(stats)
})()
