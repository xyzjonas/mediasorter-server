<template>
  <q-table
      flat
      title="Media directories"
      :rows="sources"
      :columns="SCAN_COLS"
      :row-key="(row) => `${row.src_path},${row.movies_output},${row.tv_shows_output}`"
      selection="multiple"
      v-model:selected="modelValue"
      :loading="loading"
      loading-label="Fetching scan sources"
      table-class="full-w"
      hide-selected-banner
      :rows-per-page-options="[0]"
      no-data-label="No media directories configured."
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <!-- {{ props }} -->
          <q-td auto-width>
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td key="src_path" :props="props">
            <q-badge>
              {{ props.row.src_path.replace("/", "/ ") }}
            </q-badge>
          </q-td>
          <q-td key="action" :props="props">
            <q-icon :name="typeMap[props.row.media_type]?.icon ?? 'question_mark'" class="cursor-pointer q-mr-md" size="1.2rem">
              <q-tooltip anchor="top middle" self="bottom middle">
                {{ typeMap[props.row.media_type].help }}
              </q-tooltip>
            </q-icon>
            <q-icon :name="actionMap[props.row.action]?.icon ?? 'question_mark'" class="cursor-pointer" size="1.2rem">
              <q-tooltip anchor="top middle" self="bottom middle">
                {{ actionMap[props.row.action].help }}
              </q-tooltip>
            </q-icon>
            
          </q-td>
          <q-td key="tv_shows_output" :props="props">
            {{ props.row.tv_shows_output.replace("/", "/ ") }}
          </q-td>
          <q-td key="movies_output" :props="props">
            {{ props.row.movies_output.replace("/", "/ ") }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
</template>

<script setup lang="ts">
import { SCAN_COLS } from '@/composables/sorter';
import type { Source } from '@/types';

interface Props {
  sources: Source[],
  loading: boolean,
}

defineProps<Props>();
const modelValue = defineModel<Source[]>()

const actionMap: {[key: string]: { icon: string, help:string }} = {
  copy: {
    icon: 'content_copy',
    help: 'A copy of the media file will be created.'
  },
  move: {
    icon: 'move_down',
    help: 'Media file will be moved.'
  },
  symlink: {
    icon: 'add_link',
    help: 'A symlink will be created.'
  },
}

const typeMap: {[key: string]: { icon: string, help:string }} = {
  tv: {
    icon: 'live_tv',
    help: 'Media file will be parsed as a TV show only.'
  },
  movie: {
    icon: 'movie',
    help: 'Media file will be parsed as a movie only.'
  },
  auto: {
    icon: 'auto_mode',
    help: 'Auto media type recognition.'
  },
}

</script>

<style lang="scss" scoped>

</style>