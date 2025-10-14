<script setup lang="ts">
import { useDisplay } from "vuetify";
// Props
const value = defineModel<number>({ default: 0.8 });

// Computed
const color = computed(() => {
  if (value.value <= 0.1) return "light-green";
  if (value.value <= 0.2) return "green";
  if (value.value <= 0.3) return "teal";
  if (value.value <= 0.4) return "cyan";
  if (value.value <= 0.5) return "blue";
  if (value.value <= 0.6) return "light-blue";
  if (value.value <= 0.7) return "indigo";
  if (value.value <= 0.8) return "primary";
  if (value.value <= 0.9) return "purple";
  return "red";
});

// Methods
const decrement = () => {
  value.value -= 0.1;
};
const increment = () => {
  value.value += 0.1;
};
</script>
<template>
  <v-slider
    v-model="value"
    :color="color"
    :step="0.1"
    max="1"
    min="0.1"
    track-color="grey"
    thumb-label
    hide-details
  >
    <template v-slot:label>
      <span :class="'mr-1 text-' + color">
        {{ useDisplay().xs.value ? "" : "Temperature" }}
      </span>
    </template>
    <template v-slot:prepend>
      <v-btn
        icon="mdi-minus"
        size="small"
        variant="text"
        @click="decrement"
      ></v-btn>
    </template>

    <template v-slot:append>
      <v-btn
        icon="mdi-plus"
        size="small"
        variant="text"
        @click="increment"
      ></v-btn>
    </template>
  </v-slider>
</template>
