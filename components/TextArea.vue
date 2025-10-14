<script setup lang="ts">
// Event emitted
const emit = defineEmits(["submit"]);

// Props
const disabled = defineModel<boolean>("disabled", { default: false });
const loading = defineModel<boolean>("loading", { default: false });
const prompt = defineModel();
</script>
<template>
  <v-textarea
    v-model="prompt"
    counter
    rows="2"
    autofocus
    no-resize
    variant="outlined"
    :disabled="disabled || loading"
    :loading="loading"
    @keydown.enter.prevent="$emit('submit')"
  >
    <template v-slot:prepend-inner> <slot name="prepend-inner" /> </template>
  </v-textarea>
</template>
