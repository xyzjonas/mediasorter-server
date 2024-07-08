import axios from 'axios'
import { useQuasar } from 'quasar'

const baseURL = import.meta.env.VITE_API_URL
const api = axios.create({ baseURL })

export const useApi = () => {

  console.info(`BASE URL: ${baseURL}`)

  const $q = useQuasar()

  const get = async (url: string) => {
    try {
      const res = await api.get(url)
      return res.data
    } catch (error: any) {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: error.message,
        icon: 'report_problem'
      })
      throw error
    } finally {
      $q.loadingBar.stop()
    }
  }

  const post = async (url: string, data: any) => {
    try {
      const res = await api.post(url, data, { headers: { 'Content-type': 'application/json' } })
      return res.data
    } catch (error: any) {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: error.message,
        icon: 'report_problem'
      })
    } finally {
      $q.loadingBar.stop()
    }
  }

  return { get, post }
}
