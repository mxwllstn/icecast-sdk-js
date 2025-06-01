declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Icecast host url, including protocol (http(s)://) */
      IC_HOST: string
    }
  }
}

export {}
