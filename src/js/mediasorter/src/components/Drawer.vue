<template>
  <div v-if="configuration" class="content">
    <h5 class="q-mt-sm q-mb-sm">Configured APIs</h5>
    <q-list separator>
      <q-item v-for="api in configuration.api">
        <q-item-section>
          <q-item-label>{{ api.name.toUpperCase() }}</q-item-label>
          <q-item-label caption>{{ api.url }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <h5 class="q-mt-lg q-mb-sm">Global Options</h5>
    <q-list separator>
      <q-item v-for="val, key in configuration.options">
        <q-item-section>
          <q-item-label>{{ key }}</q-item-label>
          <q-item-label caption>{{ val }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="version text-right">
      {{ configuration.version }} (powered by <a href="https://pypi.org/project/multimediasorter" target="_blank">mediasorter</a> {{ configuration.lib_version }})
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSorter } from '@/composables/sorter';
import { onMounted } from 'vue';

const { fetchConfig, configuration } = useSorter()

onMounted(() => {
  fetchConfig();
})

</script>

<style lang="css" scoped>
.content {
  padding: .3rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.version {
  margin-top: auto;
  align-self: flex-end;
  margin-inline: .5rem;
  font-size: small;
}
</style>