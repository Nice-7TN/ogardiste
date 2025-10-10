<script setup lang="ts">
// Imports
import { useDisplay } from "vuetify";
</script>
<template>
  <div class="header">
    <AppBarDesktop v-if="!useDisplay().xs.value" />
    <AppBarMobile v-else />
  </div>
</template>
