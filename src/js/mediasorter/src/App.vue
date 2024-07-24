<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white">
      <toolbar v-model:drawer="rightDrawerOpen" />
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered overlay>
      <drawer />
    </q-drawer>

    <q-page-container class="q-mt-sm q-mb-md">
      <home />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Home from "@/views/Home.vue"
import Drawer from "@/components/Drawer.vue"
import Toolbar from "@/components/Toolbar.vue";

const rightDrawerOpen = ref(false)
</script>

<style lang="css" scoped>
</style>
