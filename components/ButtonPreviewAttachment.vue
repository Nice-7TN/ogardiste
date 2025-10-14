<script setup lang="ts">
// Events emitted
const emit = defineEmits(["click", "clear"]);

// Props
const attachment = defineModel();

// Methods
// Clear the attachment
const clearAttachment = () => {
  emit("clear");
};

// Computed
// Generate a preview URL for the uploaded attachment
const attachmentPreviewUrl = computed(() => {
  if (!attachment.value) return undefined;
  const file = Array.isArray(attachment.value)
    ? attachment.value[0]
    : attachment.value;
  return file ? URL.createObjectURL(file) : "";
});
</script>
<template>
  <!-- Button for attachment -->
  <v-icon-btn
    v-if="!attachment"
    icon="mdi-image-search-outline"
    class="mr-1"
    icon-size="large"
    @click="$emit('click')"
  >
  </v-icon-btn>
  <!-- Thumbnail of the uploaded image with a badge icon to delete it  -->
  <v-badge
    v-else-if="attachment"
    bordered
    location="top left"
    color="error"
    icon="mdi-close"
    class="mt-3 mb-2 mx-1 click"
    @click="clearAttachment"
  >
    <div class="image-preview-wrapper">
      <img
        :src="attachmentPreviewUrl"
        alt="Image uploadée"
        class="image-preview"
      />
    </div>
  </v-badge>
</template>
