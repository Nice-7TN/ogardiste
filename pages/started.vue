<script setup lang="ts">
definePageMeta({
  layout: "default",
});
// Imports
import { useDisplay } from "vuetify";

// Variables
const title = "Get Started with the Ollama GUI by O-Gardiste";

// Methods
const openLink = () => {
  window.open("https://ollama.com/", "_blank");
};
</script>

<template>
  <div :class="useDisplay().xs.value ? 'content-mobile' : 'content'">
    <span
      class="text-xll-h4 text-xl-h4 text-lg-h3 text-md-h4 text-sm-h5 text-xs-h5 font-weight-bold"
    >
      {{ title }}
    </span>
    <p
      class="mt-6 text-xll-h4 text-xl-h4 text-lg-h6 text-md-h6 text-sm-body-1 text-caption mt-3"
    >
      All you need to do is install the Ollama server on your computer. Once
      installed, you just need to launch it in your device. The O-Gardiste
      application will then communicate directly with your local Ollama server.
    </p>
    <Button text="Download Ollama" class="text-white mt-6" @click="openLink" />
    <p v-if="!useDisplay().xs.value" class="text-caption mt-6">
      ⚠️ If you're using the online version of O-Gardiste, set the Ollama server CORS origins.
      Run the following command in your terminal:
      <p class="mt-2 text-caption">
        <b>For Android, Linux or MacOS:</b>
          <pre class="mt-1 mb-2 code"> export OLLAMA_ORIGINS="*"</pre>
        <b>For Windows:</b> 
          <pre class="mt-1 code"> setx OLLAMA_ORIGINS "*"</pre>
      </p>
    </p>  
  </div>
</template>
