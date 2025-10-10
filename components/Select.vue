<script setup lang="ts">
// Props
const model = defineModel({});
</script>
<template>
  <v-select v-model="model" chips>
    <template v-slot:chip="{ props, item }">
      <v-chip
        :text="item.title"
        prepend-icon="mdi-account-circle"
        class="mt-2 my-1"
        size="default"
      >
        <template v-slot:prepend>
          <v-avatar start>
            <v-img :src="'images/' + item.raw.avatar"></v-img>
          </v-avatar>
        </template>
      </v-chip>
    </template>
  </v-select>
</template>
