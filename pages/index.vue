<script setup lang="ts">
definePageMeta({
  layout: "default",
});

// Imports
import { useApiStore } from "~/store/api";
import { useDisplay } from "vuetify";

// Variables
const messageWelcome = "Hello, what can I do for you?";
const messageServerDown = "Server is down, launch Ollama.";
</script>

<template>
  <div
    :class="
      useApiStore().status
        ? 'welcome-message bubble ' +
          (useDisplay().xs.value ? 'text-caption' : '')
        : 'welcome-message bubble server-down ' +
          (useDisplay().xs.value ? 'text-caption' : '')
    "
  >
    {{ useApiStore().status ? messageWelcome : messageServerDown }}
  </div>
</template>
