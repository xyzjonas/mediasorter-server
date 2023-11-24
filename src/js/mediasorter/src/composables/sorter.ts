import type { SortOperation, Source } from '@/types'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const api = axios.create({ baseURL: 'http://localhost:8000' })

const sources = ref<Source[]>([])
const loading = ref(false)

const sortOperations = ref([])
const scanning = ref(false)

export const SCAN_COLS = [
  {
    name: 'src_path',
    required: true,
    label: 'Source',
    align: 'left',
    field: (row: any) => row.src_path,
    format: (val: any) => `${val}`,
    sortable: true
  },
  {
    name: 'action',
    required: true,
    label: 'Action',
    align: 'left',
    field: (row: any) => row.action,
    format: (val: any) => `${val}`,
    sortable: true
  },
  {
    name: 'media_type',
    required: true,
    label: 'Media type',
    align: 'left',
    field: (row: any) => row.media_type,
    format: (val: any) => `${val}`,
    sortable: true
  },
  {
    name: 'tv_shows_output',
    required: true,
    label: 'Shows output',
    align: 'left',
    field: (row: any) => row.tv_shows_output,
    format: (val: any) => `${val}`,
    sortable: true
  },
  {
    name: 'movies_output',
    required: true,
    label: 'Movies output',
    align: 'left',
    field: (row: any) => row.movies_output,
    format: (val: any) => `${val}`,
    sortable: true
  }
]

export const OP_COLS = [
  {
    name: 'input_path',
    label: 'Input',
    field: (row: any) => row.input_path,
    required: true,
    align: 'left',
    sortable: true,
    format: (val: any) => {
      const parts = `${val}`.split('/')
      return parts[parts.length - 1]
    }
  },
  {
    name: 'output_path',
    required: true,
    label: 'Output',
    align: 'left',
    field: (row: any) => row.output_path,
    format: (val: any) => `${val}`,
    sortable: true
  }
]

export const FAILED_OP_COLS = [
  {
    name: 'input_path',
    required: true,
    label: 'Input',
    align: 'left',
    field: (row: any) => row.input_path,
    format: (val: any) => {
      const parts = `${val}`.split('/')
      return parts[parts.length - 1]
    },
    sortable: true
  },
  {
    name: 'exception',
    required: true,
    label: 'Error',
    align: 'left',
    field: (row: any) => row.exception,
    format: (val: any) => `${val}`,
    sortable: false
  }
]

export const useSorter = () => {
  const $q = useQuasar()

  const fetchSources = () => {
    loading.value = true
    $q.loadingBar.start()

    api
      .get('/')
      .then((res) => (sources.value = res.data))
      .catch((err) => {
        $q.notify({
          color: 'negative',
          position: 'bottom',
          message: err,
          icon: 'report_problem'
        })
      })
      .finally(() => {
        $q.loadingBar.stop()
        loading.value = false
      })
  }

  const scan = (sources: Source[]) => {
    $q.loadingBar.start()

    api
      .post('/scan', sources, { headers: { 'Content-type': 'application/json' } })
      .then((res) => (sortOperations.value = res.data))
      .catch((err) => {
        console.error(err)
        $q.notify({
          color: 'negative',
          position: 'bottom',
          message: err.message,
          icon: 'error'
        })
      })
      .finally(() => {
        $q.loadingBar.stop()
        scanning.value = false
      })
  }

  const sort = (ops: SortOperation[]) => {
    $q.loadingBar.start()

    api
      .post('/scan', sources, { headers: { 'Content-type': 'application/json' } })
      .then((res) => (sortOperations.value = res.data))
      .catch((err) => {
        console.error(err)
        $q.notify({
          color: 'negative',
          position: 'bottom',
          message: err.message,
          icon: 'error'
        })
      })
      .finally(() => {
        $q.loadingBar.stop()
        scanning.value = false
      })
  }

  return {
    fetchSources,
    scan,
    sources,
    loading,
    sortOperations,
    scanning
  }
}
