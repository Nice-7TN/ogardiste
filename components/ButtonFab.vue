<script setup lang="ts">
import type { Anchor } from "vuetify/lib/util/anchor.mjs";

// Props
const location = defineModel<Anchor>("location", {
  default: "center center",
});
</script>
<template>
  <v-fab
    absolute
    variant="text"
    color="transparent"
    :location="location"
    size="160"
    icon
  >
    <slot />
  </v-fab>
</template>
