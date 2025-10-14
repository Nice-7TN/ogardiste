<script setup lang="ts">
definePageMeta({
  layout: "default",
});
// Imports
import { useDisplay } from "vuetify";

// Variables
const title = "About O-Gardiste";

// Methods
const openLink = () => {
  window.open("https://github.com/Nice-7TN/ogardiste", "_blank");
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
      O-Gardiste is a graphical user interface for using the services offered by
      the Ollama. The application facilitates the exchange and integration of
      artificial intelligence models locally. Equipped with an intuitive
      interface and advanced features, it is the ideal tool to familiarize
      yourself with the possibilities offered by using artificial intelligence
      models locally.
    </p>
    <Button text="Learn more" class="text-white mt-6" @click="openLink" />
  </div>
</template>
