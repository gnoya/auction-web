import axios, { AxiosError } from 'axios'
import { flushSession, getSavedToken } from '@/api/session'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

http.interceptors.request.use(function injectJWT(config) {
  const token = getSavedToken()
  if (token) config.headers.set('Authorization', `Bearer ${token}`)
  return config
})

http.interceptors.response.use(undefined, function flushSessionOn401(error) {
  console.log(error)
  if (error instanceof AxiosError && error.status === 401) {
    flushSession()
    window.location.reload()
  }

  return Promise.reject(error)
})

export { http }
