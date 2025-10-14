<script setup lang="ts">
import { useButtonsStore } from "~/store/buttons";
import { useDisplay } from "vuetify";

// Store
const buttons = useButtonsStore().buttonsSocialMedia;
</script>
<template>
  <v-row
    :class="!useDisplay().xs.value ? 'footer' : 'footer-mobile'"
    justify="center"
    no-gutters
  >
    <v-col v-for="button in buttons" :key="button.icon" cols="auto">
      <Button
        color="white"
        :icon="button.icon"
        variant="text"
        target="_blank"
        :href="button.href"
      />
    </v-col>
    <v-col class="text-center mt-n1" cols="12">
      {{ new Date().getFullYear() }} — <strong>Developped by Nice-7TN</strong>
    </v-col>
  </v-row>
</template>
