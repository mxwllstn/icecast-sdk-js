# Icecast SDK for JavaScript

NodeJS / Typescript SDK for Icecast APIs

## Icecast APIs
https://icecast.org/docs/icecast-trunk/server_stats/
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
// for client endpoints
const ic = new IcecastServer(process.env.IC_HOST)
// for admin endpoints
const ic = new IcecastServer(process.env.IC_HOST, { username: process.env.IC_USERNAME, password: process.env.IC_PASSWORD })

;(async () => {
  const stats = await ic.getStats()
  console.log(stats)
})()
```
