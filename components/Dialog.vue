<script setup lang="ts">
// Props
const dialog = defineModel("dialog", { default: false });
</script>

<template>
  <v-dialog v-model="dialog" max-width="1200" persistent>
    <slot name="content"></slot>
  </v-dialog>
</template>
