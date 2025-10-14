<script setup lang="ts">
// Props
const variant = defineModel<
  "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain"
>("variant", {
  default: "flat",
});
const color = defineModel<string>("color", {
  default: "button",
});
</script>
<template>
  <v-btn
    :color="color"
    class="text-none font-weight-bold"
    rounded="xl"
    :variant="variant"
  />
</template>
