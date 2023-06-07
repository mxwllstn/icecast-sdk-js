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
```javascript
import IcecastServer from 'icecast-sdk-js'

const hostUrl = 'http://yourip:port/mounpoint-you-specified'
const ic = new IcecastServer(hostUrl)

;(async () => {
  const stats = await ic.getStats()
  console.log(stats)
})()
```
