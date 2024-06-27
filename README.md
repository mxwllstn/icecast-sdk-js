# Icecast SDK for JavaScript
[![Version](https://img.shields.io/npm/v/icecast-sdk-js.svg)](https://www.npmjs.org/package/icecast-sdk-js)

NodeJS / Typescript SDK for Icecast APIs

## Icecast APIs
https://icecast.org/docs/icecast-trunk/server_stats/ \
https://icecast.org/docs/icecast-trunk/admin_interface/

## Install
Use `npm` to install the module
```bash
npm install icecast-sdk-js
```
Or use `yarn` to install the module
```bash
yarn add icecast-sdk-js
```

## Usage
### Get Stats
```javascript
import IcecastServer from 'icecast-sdk-js'

const hostUrl = 'http://locahost:8000'
const ic = new IcecastServer(hostUrl)

void (async () => {
  const stats = await ic.getStats()
  console.log(stats)
})()
```
  
### Update Source Title (Requires Icecast Server admin username and password)
```javascript
import IcecastServer from 'icecast-sdk-js'

const { IC_HOST, IC_USERNAME, IC_PASSWORD } = process.env || {}
const ic = new IcecastServer(IC_HOST, { username: IC_USERNAME, password: IC_PASSWORD })

void (async () => {
  const mountpoint = 'testmountpoint'
  const title = 'test title'
  try {
    const source = await ic.updateSource(mountpoint, title)
    console.log(source)
  } catch (error) {
    console.log(error.response.data)
  }
})()
```
