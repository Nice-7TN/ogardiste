<script setup lang="ts">
definePageMeta({
  layout: "default",
});
// Imports
import { useDisplay } from "vuetify";

// Variables
const title = "Contact us";
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
      You want to share a bug, a suggestion for improvement, need my services,
      support me, or simply encourage me, you've come to the right place!
    </p>
    <Contact />
  </div>
</template>
