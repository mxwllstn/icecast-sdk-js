declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Icecast host url, including protocol (http(s)://) */
      IC_HOST: string
      /** Icecast username and password, required for updateSource() */
      IC_USERNAME: string
      IC_PASSWORD: string
    }
  }
}

export {}
