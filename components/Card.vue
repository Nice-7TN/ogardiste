<script setup lang="ts">
// Event emitted
defineEmits(["close"]);

// Props title
const title = defineModel("title", { default: "" });
const cardTextStyle = defineModel("cardTextStyle", { default: "" });
const input = defineModel("input", { default: false });
</script>
<template>
  <v-card rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center">
      <div class="text-medium-emphasis ps-2">{{ title }}</div>
      <slot name="cardTitleCenter" />
      <div>
        <slot name="cardTitleBottom" />
        <Button
          icon="mdi-close"
          variant="text"
          @click="$emit('close')"
          color="black"
        />
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text :style="cardTextStyle ? cardTextStyle : ''">
      <slot name="cardText" />
    </v-card-text>
    <v-card-actions
      v-if="input"
      class="d-flex justify-end mx-xxl-2 mx-xl-2 mx-lg-2 mx-md-2 mx-sm-2"
    >
      <slot name="cardTextArea" />
    </v-card-actions>

    <v-divider :class="cardTextStyle ? cardTextStyle : ''"></v-divider>
    <v-card-actions
      class="d-flex justify-end mx-xxl-2 mx-xl-2 mx-lg-2 mx-md-2 mx-sm-2 ml-n2 my-1"
    >
      <slot name="cardAction" />
    </v-card-actions>
  </v-card>
</template>
