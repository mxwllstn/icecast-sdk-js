import express, { Router, Request, Response } from 'express'
import IcecastServer from 'icecast-sdk-js'

const { IC_HOST } = process.env || {}

const ic = new IcecastServer(<string>IC_HOST)

const { getStats, getSources, getSource, getClients } = ic

const router = <Router>express.Router()

export type ApiResponse = {
  status: number
  data: Record<string, unknown>
}

const handleResponse = (res: Response, response: ApiResponse) => {
  const { status, data } = response
  console.log(response)
  res.status(status || 200).send(data)
}
const handleError = (res: Response, error: any) => {
  if (error.response) {
    const { status, data } = error.response
    res.status(status).send({ data })
  } else {
    const { message } = error
    // eslint-disable-next-line no-console
    console.log(message)
    res.status(400).send({ error: message })
  }
}

router.get('/stats', async (req: Request, res: Response): Promise<void> => {
  try {
    handleResponse(res, { status: 200, data: (await getStats()) as any })
  } catch (error: any) {
    handleError(res, error)
  }
})

router.get('/sources', async (req: Request, res: Response): Promise<void> => {
  try {
    handleResponse(res, { status: 200, data: (await getSources()) as any })
  } catch (error: any) {
    handleError(res, error)
  }
})

router.get('/sources/:mountpoint', async (req: Request, res: Response): Promise<void> => {
  try {
    const { mountpoint } = req.params || {}
    handleResponse(res, { status: 200, data: (await getSource(mountpoint)) as any })
  } catch (error: any) {
    handleError(res, error)
  }
})

router.get('/clients/:mountpoint', async (req: Request, res: Response): Promise<void> => {
  try {
    const { mountpoint } = req.params || {}
    handleResponse(res, { status: 200, data: (await getClients(mountpoint)) as any })
  } catch (error: any) {
    handleError(res, error)
  }
})

export default router
