<script setup lang="ts">
// Imports
import type { Chat } from "~/types/chat";
import type { Loading } from "~/types/loading";
import { useSnackBar } from "~/store/snackbar";
import { useDisplay } from "vuetify/lib/composables/display.mjs";

// Props
const loading = defineModel<Loading>("loading", {
  default: {
    state: false,
    message: "",
  },
});
const disabled = defineModel<boolean>("disabled", {
  default: false,
});
const messages = defineModel<Chat[]>("messages", { default: [] });

// Variables
const chatContainer = ref<HTMLElement | null>(null);

// Methods
// Copy text to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      useSnackBar().initializeSnackBar("Text copied to clipboard!", "success");
    })
    .catch((err) => {
      console.error("Failed to copy text:", err);
    });
};

// Scroll to the bottom of the chat container
const scrollToBottom = async () => {
  // Wait for the next DOM update cycle
  await nextTick();
  // Scroll to the bottom of the chat container
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// Share text using the Web Share API
const share = (model: string, text: string) => {
  navigator
    .share({
      title: model,
      text: text,
    })
    .then(() => {
      useSnackBar().initializeSnackBar("Text shared successful!", "success");
    })
    .catch((err) => {
      console.error("Failed to share text:", err);
    });
};

// Watchers
// Scroll to the bottom when new messages are added or loading state changes
watch(
  () => messages.value.length,
  () => {
    scrollToBottom();
  }
);
watch(
  () => messages.value[messages.value.length - 1].message,
  () => {
    scrollToBottom();
  }
);
</script>
<template>
  <div
    class="chat-container mb-2"
    :style="'max-height:' + useDisplay().height.value * 0.5 + 'px;'"
    ref="chatContainer"
  >
    <div
      v-for="(message, index) in messages"
      :key="index"
      :class="['message', message.sender]"
    >
      <v-card
        v-if="message.message"
        prepend-icon="mdi-send"
        :title="message.sender === 'Human' ? 'Question' : 'Answer'"
        :color="
          message.sender === 'Human'
            ? 'secondary'
            : message.sender === 'Bot'
            ? 'warning'
            : 'primary'
        "
        :class="
          useDisplay().smAndDown.value ? 'text-caption' : 'text-subtitle-2'
        "
      >
        <template v-slot:prepend>
          <v-icon size="large"></v-icon>
        </template>
        <v-card-text
          class="text-pre-wrap text-xl-h5 text-lg-body-1 text-md-body-1 text-sm-body-2 text-xs-caption py-2"
          v-html="message.message"
        >
        </v-card-text>
        <v-card-actions class="mx-n3">
          <v-list-item
            class="w-100"
            :prepend-avatar="'/images/' + message.avatar"
            slim
          >
            <v-list-item-title class="text-capitalize">{{
              message.model
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ message.sender }}</v-list-item-subtitle>
            <template v-slot:append>
              <div class="justify-self-end">
                <v-icon-btn
                  icon="mdi-content-copy"
                  variant="text"
                  class="mr-1"
                  :size="useDisplay().xs.value ? 'xs' : 'default'"
                  :disabled="disabled"
                  @click="copyToClipboard(message.message)"
                ></v-icon-btn>
                <span class="me-1">·</span>
                <v-icon-btn
                  icon="mdi-share-variant"
                  variant="text"
                  :size="useDisplay().xs.value ? 'xs' : 'default'"
                  :disabled="disabled"
                  @click="share(message.model, message.message)"
                ></v-icon-btn>
                <span class="subheading"></span>
              </div>
            </template>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </div>

    <div
      v-if="loading.state && loading.message"
      class="message Model loading-indicator"
    >
      {{ loading.message }}<span class="dots"></span>
    </div>
  </div>
</template>
