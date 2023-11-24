import axios, { AxiosError } from 'axios'
import { useQuasar } from 'quasar'

const api = axios.create({ baseURL: 'http://localhost:8000' })

export const useApi = () => {
  const $q = useQuasar()

  const get = async (url: string) => {
    try {
      const res = await api.get('/')
      return res.data
    } catch (error) {
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

  const post = async (url: string, data: any) => {
    try {
      const res = await api.post(url, data, { headers: { 'Content-type': 'application/json' } })
      return res.data
    } catch (error) {
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
