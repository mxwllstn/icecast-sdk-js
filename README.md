# Icecast SDK for JavaScript
[![Version](https://img.shields.io/npm/v/icecast-sdk-js.svg)](https://www.npmjs.org/package/icecast-sdk-js)

NodeJS / Typescript SDK for Icecast APIs

## Icecast APIs
https://icecast.org/docs/icecast-trunk/server_stats/ \
https://icecast.org/docs/icecast-trunk/admin_interface/

## Install
Use `pnpm` to install the module
```bash
pnpm install icecast-sdk-js
```
Or use `npm` to install the module
```bash
npm install icecast-sdk-js
```
Or use `yarn` to install the module
```bash
yarn add icecast-sdk-js
```

## Usage
### Get Stats
#### Sample Request
```javascript
import IcecastServer from 'icecast-sdk-js'

const hostUrl = 'http://locahost:8000'
const ic = new IcecastServer(hostUrl)

void (async () => {
  const stats = await ic.getStats()
  console.log(stats)
})()
```
#### Sample Response
```json
{
  "admin": "icemaster@localhost",
  "host": "localhost",
  "location": "Earth",
  "server_id": "Icecast 2.4.4",
  "server_start": "Wed, 20 Mar 2024 21:43:10 -0700",
  "server_start_iso8601": "2024-03-20T21:43:10-0700",
  "source": {
    "mount": "/your-mountpoint",
    "bitrate": 256,
    "genre": "field recording",
    "listener_peak": 0,
    "listeners": 0,
    "listenurl": "http://localhost:8000/your-mount-point",
    "server_description": "Unspecified description",
    "server_name": "your server name",
    "server_type": "audio/mpeg",
    "server_url": "your-website.net",
    "stream_start": "Thu, 27 Jun 2024 16:09:05 -0700",
    "stream_start_iso8601": "2024-06-27T16:09:05-0700",
    "title": "your title",
    "dummy": null
  }
}
```
  
### Update Source Title (Requires Icecast Server admin username and password)
#### Sample Request
```javascript
import IcecastServer from 'icecast-sdk-js'

const { IC_HOST, IC_USERNAME, IC_PASSWORD } = process.env || {}
const ic = new IcecastServer(IC_HOST, { username: IC_USERNAME, password: IC_PASSWORD })

void (async () => {
  const mountpoint = 'yourmountpoint'
  const title = 'your new title'
  try {
    const source = await ic.updateSource(mountpoint, title)
    console.log(source)
  } catch (error) {
    console.log(error.response.data)
  }
})()
```
#### Sample Response
```json
{
  "mount": "/your-mountpoint",
  "bitrate": 256,
  "genre": "field recording",
  "listener_peak": 0,
  "listeners": 0,
  "listenurl": "http://localhost:8000/your-mount-point",
  "server_description": "Unspecified description",
  "server_name": "your server name",
  "server_type": "audio/mpeg",
  "server_url": "your-website.net",
  "stream_start": "Thu, 27 Jun 2024 16:09:05 -0700",
  "stream_start_iso8601": "2024-06-27T16:09:05-0700",
  "title": "your new title",
  "dummy": null
}
```
