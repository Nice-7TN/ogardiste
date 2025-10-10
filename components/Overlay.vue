<script setup lang="ts">
// Props
const icon = defineModel("icon", {
  default: "",
});
const loading = defineModel("loading", {
  default: false,
});
const title = defineModel("title", {
  default: "",
});
const value = defineModel("value", {
  default: 0,
});
</script>
<template>
  <div class="overlay">
    <v-list
      v-if="!loading"
      class="py-2"
      color="primary"
      elevation="12"
      rounded="lg"
    >
      <v-list-item
        v-if="!loading"
        :prepend-icon="icon"
        :title="title ? title : ''"
      >
        <template v-slot:prepend v-if="icon">
          <div class="pe-4">
            <v-icon color="primary" size="x-large" />
          </div>
        </template>
      </v-list-item>
    </v-list>

    <v-row v-else>
      <v-col cols="12">
        <div class="text-center">
          <v-progress-circular
            :model-value="value"
            :indeterminate="value > -1 ? false : true"
            :rotate="360"
            :size="120"
            :width="15"
            color="primary"
          >
            <template v-slot:default>
              <span v-if="value > -1" class="text-white text-body-1"
                >{{ value }}%</span
              >
            </template>
          </v-progress-circular>
        </div></v-col
      >
      <v-col cols="12">
        <div class="text-center text-subtitle-2">
          {{ title }}
        </div></v-col
      ></v-row
    >
  </div>
</template>
