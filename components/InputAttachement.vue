<script setup lang="ts">
// Event emitted
const emit = defineEmits(["change"]);

// Props
const fileInput = defineModel();

// Methods
// Handle file input change event
const attachment = (event: any) => {
  // If the user selects a file, set it to the image variable
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      emit("change", file);
    }
  }
};
</script>
<template>
  <input
    ref="fileInput"
    class="d-none"
    type="file"
    accept="image/png, image/jpeg"
    @change="attachment($event)"
  />
</template>
