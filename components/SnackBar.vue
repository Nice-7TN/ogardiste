<script setup lang="ts">
import { useSnackBar } from "~/store/snackbar";

// Store
const snackBar = useSnackBar().snackbar;
</script>
<template>
  <v-snackbar
    v-for="item in snackBar"
    v-model="item.activated"
    :timeout="item.timeout"
    :color="item.color"
    location="top"
  >
    {{ item.message }}
    <template v-slot:actions>
      <ButtonCancel
        color="white"
        text="Close"
        @click="item.activated = false"
      />
    </template>
  </v-snackbar>
</template>
