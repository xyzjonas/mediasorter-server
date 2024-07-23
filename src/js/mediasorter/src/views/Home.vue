<template>
  <main>
    <sources-table :sources="sources" v-model="selected" :loading="loading"/>

    <q-btn
      v-if="sources.length > 0"
      color="secondary"
      icon="loop"
      :label="sortOperations.length > 0 ? 'Re-scan' : 'Scan'"
      :loading="scanning"
      :disable="selected.length <= 0"
      @click="() => scan(selected)"
      style="margin-block: 1rem"
    />

    <q-table
      v-if="okOps.length > 0"
      title="Sortable media"
      flat
      separator="vertical"
      bordered
      :rows="okOps"
      :row-key="(row) => `${row.input_path},${row.output_path}`"
      :columns="OP_COLS"
      selection="multiple"
      v-model:selected="selectedOps"
      :loading="loading"
      loading-label="Fetching scan sources"
      :rows-per-page-options="[0, 20]"
    />

    <q-btn
      v-if="okOps.length > 0"
      color="secondary"
      icon="check"
      label="Sort"
      :loading="sorting"
      :disable="selectedOps.length <= 0"
      @click="() => sort(selectedOps)"
      style="margin-block: 1rem"
    />

    <q-expansion-item
      v-if="nokOps.length > 0"
      switch-toggle-side
      v-model="expandNok"
      :label="`Unsortable media [ ${nokOps.length} ]`"
    >
      <q-table
        flat
        :rows="nokOps"
        :bordered="false"
        :wrap-cells="true"
        :columns="FAILED_OP_COLS"
        selection="none"
        :hide-header="true"
        :hide-no-data="true"
        :loading="loading"
        loading-label="Fetching scan sources"
        table-class="nok-table"
        :rows-per-page-options="[0]"
      />
    </q-expansion-item>

    <h5 v-if="sortResult.length > 0">Results</h5>
    <q-table
      v-if="sortResult.length > 0"
      flat
      :rows="sortResult.filter((r: SortOperation) => !!r.exception)"
      :bordered="false"
      :wrap-cells="true"
      :columns="FAILED_OP_COLS"
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
      selection="none"
      :hide-header="true"
      :hide-no-data="true"
      :loading="loading"
      loading-label="Fetching scan sources"
      table-class="ok-table"
      :rows-per-page-options="[0]"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { OP_COLS, SCAN_COLS, FAILED_OP_COLS, useSorter } from '@/composables/sorter'
import type { SortOperation, Source } from '@/types'
import SourcesTable from '@/components/SourcesTable.vue';

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

const expandNok = ref(false)
</script>

<style lang="scss" scoped></style>
