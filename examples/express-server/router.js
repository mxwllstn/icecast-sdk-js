import express from 'express'
import IcecastServer from 'icecast-sdk-js'

const { IC_HOST, IC_USERNAME, IC_PASSWORD } = process.env || {}

const ic = new IcecastServer(IC_HOST, { username: IC_USERNAME, password: IC_PASSWORD })

const { getStats, getSources, getSource, updateSource } = ic
const router = express.Router()

const handleResponse = (res, response) => {
  const { status, data } = response
  console.log(response)
  res.status(status || 200).send(data)
}
const handleError = (res, error) => {
  if (error.response) {
    const { status, data } = error.response
    res.status(status).send({ data })
  } else {
    const { message } = error
    console.log(message)
    res.status(400).send({ error: message })
  }
}

router.get('/stats', async (req, res) => {
  try {
    handleResponse(res, { status: 200, data: await getStats() })
  } catch (error) {
    handleError(res, error)
  }
})

router.get('/sources', async (req, res) => {
  try {
    handleResponse(res, { status: 200, data: await getSources() })
  } catch (error) {
    handleError(res, error)
  }
})

router.get('/sources/:mountpoint', async (req, res) => {
  try {
    const { mountpoint } = req.params || {}
    handleResponse(res, { status: 200, data: await getSource(mountpoint) })
  } catch (error) {
    handleError(res, error)
  }
})

router.put('/sources/:mountpoint', async (req, res) => {
  try {
    const { mountpoint } = req.params || {}
    const { metadata } = req.body || {}
    handleResponse(res, { status: 200, data: await updateSource(mountpoint, metadata) })
  } catch (error) {
    handleError(res, error)
  }
})

export default router
