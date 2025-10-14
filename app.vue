<script setup lang="ts">
// Imports
import { useApiStore } from "~/store/api";

// Lifecycle
// Check server status on mount
onMounted(async () => {
  await useApiStore().requestStatusApi();
});

// Watchers
watch(
  () => useRoute().name,
  async () => {
    await useApiStore().requestStatusApi();
  }
);
</script>
<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtPage />
  </NuxtLayout>
</template>
