<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { OP_COLS, SCAN_COLS, FAILED_OP_COLS, useSorter } from './composables/sorter'
import type { SortOperation, Source } from './types'

const { sources, loading, scan, scanning, sortOperations, fetchSources } = useSorter()

onMounted(() => fetchSources())

const selected = ref<Source[]>([])
const selectedOps = ref<SortOperation[]>([])

const okOps = computed(() => sortOperations.value.filter((op: SortOperation) => !!op.output_path))
const nokOps = computed(() => sortOperations.value.filter((op: SortOperation) => !op.output_path))
</script>

<template>
  <div class="container">
    <q-table
      flat
      title="Scan sources"
      :hide-pagination="true"
      :rows="sources"
      :columns="SCAN_COLS"
      :dark="true"
      hide-selected-banner
      row-key="src_path"
      selection="single"
      v-model:selected="selected"
      :loading="loading"
      loading-label="Fetching scan sources"
    />

    <div class="q-pa-md q-ml">
      <q-btn
        color="secondary"
        icon="loop"
        padding="0.7rem 2rem"
        outline
        :label="sortOperations.length > 0 ? 'Re-scan' : 'Scan'"
        :loading="scanning"
        :disable="selected.length <= 0"
        @click="() => scan(selected)"
      />
    </div>

    <q-table
      flat
      dark
      title="Sortable media"
      hide-pagination
      :rows="okOps"
      row-key="input_path"
      :columns="OP_COLS"
      selection="multiple"
      v-model:selected="selectedOps"
      :loading="loading"
      loading-label="Fetching scan sources"
    />

    <q-table
      v-if="nokOps.length > 0"
      flat
      title="Unsortable media"
      :hide-pagination="true"
      :rows="nokOps"
      :bordered="false"
      :wrap-cells="true"
      :columns="FAILED_OP_COLS"
      :dark="true"
      selection="none"
      :hide-header="true"
      :hide-no-data="true"
      :loading="loading"
      loading-label="Fetching scan sources"
      table-class="nok-table"
    />

    <div class="q-pa-md q-ml">
      <div class="q-mt-md">Selected: {{ selectedOps }}</div>
      <q-btn
        color="secondary"
        icon="check"
        label="Sort"
        outline
        padding="0.7rem 2rem"
        :loading="scanning"
        :disable="selectedOps.length <= 0"
        @click="() => scan(selected)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
