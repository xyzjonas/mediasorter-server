<template>
  <div class="foo">
    <q-toolbar class="tlbr bg-primary text-white">
      <img src="/favicon.ico" />
    <!-- <q-btn flat round dense icon="menu" /> -->
    <q-toolbar-title> Mediasorter </q-toolbar-title>
    <!-- <q-btn flat round dense icon="menu" /> -->
    
    <q-btn
      round dense flat
      padding=".5rem"
      :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
      @click="$q.dark.set(!$q.dark.isActive)"
      class="q-mr-md"
      />
      <q-btn dense flat round icon="menu" @click="drawer = !drawer" />
    </q-toolbar>
  </div>
</template>

<script setup lang="ts">
const drawer = defineModel<boolean>('drawer');
</script>

<style lang="css" scoped>
.tlbr {
  padding-block: 16px;
  /* background-color: black; */
  /* width: calc(100% - 2*16px); */
  box-sizing: border-box;
  border-radius: 4px;
  border-bottom: 1px solid var(--primary);
}

img {
  width: 32px;
  aspect-ratio: 1;
  background-color: white;
  border-radius: 50%;
  border: 4px solid white;
}

</style>
