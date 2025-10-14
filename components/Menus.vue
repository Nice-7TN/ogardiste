<script setup lang="ts">
// Events emitted
const emit = defineEmits(["clickButton"]);

// Props
const buttons = defineModel("buttons", {
  default: [{ title: "", color: "", class: "", icon: "" }],
});
const disabled = defineModel("disabled", {
  default: false,
});
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <Button
        icon="mdi-dots-vertical"
        variant="text"
        v-bind="props"
        color="black"
        :disabled="disabled"
      ></Button>
    </template>

    <v-list>
      <v-list-item
        v-for="(button, i) in buttons"
        :key="i"
        :value="i"
        @click="$emit('clickButton', button.title)"
      >
        <template v-slot:prepend>
          <v-icon :icon="button.icon" :color="button.color" />
        </template>
        <v-list-item-title :class="button.class">{{
          button.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
