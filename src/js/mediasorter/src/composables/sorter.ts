import type { SortOperation, Source } from '@/types'
import { useQuasar, type QTableColumn } from 'quasar'
import { useApi } from './api'
import { ref } from 'vue'

const sources = ref<Source[]>([])
const loading = ref(false)

const sortOperations = ref([])
const scanning = ref(false)

const sortResult = ref([])
const sorting = ref(false)

export const useSorter = () => {
  const $q = useQuasar()
  const { get, post } = useApi()

  const fetchSources = () => {
    loading.value = true
    get('/scans')
      .then((data) => sources.value = data)
      .finally(() => (loading.value = false))
  }

  const scan = (sources: Source[]) => {
    sortOperations.value = []
    sortResult.value = []

    $q.loadingBar.start()
    scanning.value = true

    post('/scan', sources)
      .then((data) => (sortOperations.value = data))
      .finally(() => (scanning.value = false))
  }

  const sort = (ops: SortOperation[]) => {
    sorting.value = true
    post('/sort', ops)
      .then((data) => (sortResult.value = data))
      .finally(() => (sorting.value = false))
  }

  return {
    fetchSources,
    scan,
    sort,
    sources,
    loading,
    sortOperations,
    scanning,
    sorting,
    sortResult
  }
}

export const SCAN_COLS = [
  {
    name: 'src_path',
    label: 'Directory',
    field: 'src_path',
    required: true,
    align: 'left',
    format: (val: any) => `${val}`,
    sortable: true
  },
  {
    name: 'action',
    required: true,
    label: '',
    align: 'left',
    field: (row: any) => row.action,
    format: (val: any) => `${val}`,
    sortable: true
  },
  // {
  //   name: 'media_type',
  //   required: true,
  //   label: 'Media type',
  //   align: 'left',
  //   field: (row: any) => row.media_type,
  //   format: (val: any) => `${val}`,
  //   sortable: true
  // },
  {
    name: 'tv_shows_output',
    required: true,
    label: 'TV output',
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
] satisfies QTableColumn[]

export const OP_COLS = [
  {
    name: 'type',
    label: 'Type',
    field: (row: any) => row.type,
    required: true,
    align: 'left',
    sortable: true,
    format: (val: any) => `${val}`
  },
  {
    name: 'oaction',
    label: 'Operation',
    field: (row: any) => row.action,
    required: true,
    align: 'left',
    sortable: true,
    format: (val: any) => `${val}`
  },
  {
    name: 'input_path',
    label: 'Media file',
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
] satisfies QTableColumn[]

export const FAILED_OP_COLS = [
  {
    name: 'input_path',
    required: true,
    label: 'Input',
    align: 'left',
    field: 'input_path',
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
    field: 'exception',
    format: (val: any) => `${val ?? 'success'}`,
    sortable: false
  }
] satisfies QTableColumn[]
