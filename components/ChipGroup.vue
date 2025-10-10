<script setup lang="ts">
// Props
const model = defineModel({});
const items = defineModel<any[]>("items", { default: [] });
const disabled = defineModel<boolean>("disabled", { default: false });
</script>
<template>
  <v-chip-group
    v-model="model"
    color="primary-darken-1"
    mandatory
    show-arrows
    :disabled="disabled"
  >
    <v-chip
      v-for="item in items"
      :key="item.name"
      :value="item"
      class="text-capitalize"
    >
      <v-avatar start>
        <v-img :src="'/images/' + item.avatar"></v-img>
      </v-avatar>
      {{ item.name }}
    </v-chip>
  </v-chip-group>
</template>
