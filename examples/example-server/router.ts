import express, { Router, Request, Response } from 'express'
import IcecastServer from '@icecast-sdk-js'

const { IC_HOST = 'https://stream.sonicscape.land', IC_USERNAME, IC_PASSWORD } = process.env || {}

const ic = new IcecastServer((IC_HOST), { username: IC_USERNAME, password: IC_PASSWORD })

const router = express.Router() as Router

export interface ApiResponse {
  status: number
  data: Record<string, unknown>
}

function handleResponse(res: Response, response: ApiResponse) {
  const { status, data } = response
  console.log(response)
  res.status(status || 200).send(data)
}

function handleError(res: Response, error: any) {
  if (error.response) {
    const { status, data } = error.response
    res.status(status).send({ data })
  } else {
    const { message } = error
    console.log(message)
    res.status(400).send({ error: message })
  }
}

router.get('/stats', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log({ ic })
    handleResponse(res, { status: 200, data: (await ic.getStats()) as any })
  } catch (error: any) {
    console.log({ error })
    handleError(res, error)
  }
})

router.get('/sources', async (req: Request, res: Response): Promise<void> => {
  try {
    handleResponse(res, { status: 200, data: (await ic.getSources()) as any })
  } catch (error: any) {
    handleError(res, error)
  }
})

router.get('/sources/:mountpoint', async (req: Request, res: Response): Promise<void> => {
  try {
    const { mountpoint } = req.params || {}
    handleResponse(res, { status: 200, data: (await ic.getSource(mountpoint)) as any })
  } catch (error: any) {
    handleError(res, error)
  }
})

router.put('/sources/:mountpoint', async (req: Request, res: Response): Promise<void> => {
  try {
    const { mountpoint } = req.params || {}
    const { metadata } = req.body ?? {}
    handleResponse(res, { status: 200, data: (await ic.updateSource(mountpoint, metadata)) })
  } catch (error: any) {
    handleError(res, error)
  }
})

export default router
