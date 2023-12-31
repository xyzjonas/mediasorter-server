<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { OP_COLS, SCAN_COLS, FAILED_OP_COLS, useSorter } from './composables/sorter'
import type { SortOperation, Source } from './types'

const {
  sources,
  loading,
  scan,
  scanning,
  sortOperations,
  sort,
  sortResult,
  sorting,
  fetchSources
} = useSorter()

onMounted(() => fetchSources())

const selected = ref<Source[]>([])
const selectedOps = ref<SortOperation[]>([])

const okOps = computed(() => sortOperations.value.filter((op: SortOperation) => !!op.output_path))
const nokOps = computed(() => sortOperations.value.filter((op: SortOperation) => !op.output_path))
</script>

<template>
  <div class="container">
    <h3 class="title">MEDIASORTER</h3>
    <q-table
      flat
      :rows="sources"
      :columns="SCAN_COLS"
      :dark="true"
      hide-selected-banner
      row-key="src_path"
      selection="single"
      v-model:selected="selected"
      :loading="loading"
      loading-label="Fetching scan sources"
      table-class="full-w"
      :rows-per-page-options="[0]"
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

    <div v-if="sortResult.length === 0">
      <q-table
        flat
        dark
        title="Sortable media"
        :rows="okOps"
        row-key="input_path"
        :columns="OP_COLS"
        selection="multiple"
        v-model:selected="selectedOps"
        :loading="loading"
        loading-label="Fetching scan sources"
        :rows-per-page-options="[20, 0]"
      />

      <h5 class="nok-table">Unsortable media</h5>
      <q-table
        v-if="nokOps.length > 0"
        flat
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
        :rows-per-page-options="[0]"
      />
    </div>

    <q-btn
      v-if="sortResult.length === 0"
      color="secondary"
      icon="check"
      label="Sort"
      outline
      padding="0.7rem 2rem"
      :loading="sorting"
      :disable="selectedOps.length <= 0"
      @click="() => sort(selectedOps)"
    />

    <h5 v-if="sortResult.length > 0">Results</h5>
    <q-table
      v-if="sortResult.length > 0"
      flat
      :rows="sortResult.filter((r: SortOperation) => !!r.exception)"
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
      :rows-per-page-options="[0]"
    />
    <q-table
      v-if="sortResult.length > 0"
      flat
      :hide-pagination="true"
      :rows="sortResult.filter((r: SortOperation) => !r.exception)"
      :bordered="false"
      :wrap-cells="true"
      :columns="FAILED_OP_COLS"
      :dark="true"
      selection="none"
      :hide-header="true"
      :hide-no-data="true"
      :loading="loading"
      loading-label="Fetching scan sources"
      table-class="ok-table"
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  * {
    width: 100%;
  }

  h4,
  h5 {
    margin-bottom: 0.5rem;
  }
}

.title {
  // margin-bottom: 3rem;
  padding-bottom: 3rem;
  font-family: 'Rubik Wet Paint';
  text-align: center;
}
</style>
