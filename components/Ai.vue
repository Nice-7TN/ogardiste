<script setup lang="ts">
// Imports
import { useApiStore } from "~/store/api";
import { useSnackBar } from "~/store/snackbar";
import { useDialogStore } from "~/store/dialog";

// Variables
const route = useRoute();

// Methods
// Function to handle dialog open/close based on server status
const dialogFunction = () => {
  if (useApiStore().status) {
    useDialogStore().dialogChat = true;
  } else {
    useDialogStore().dialogChat = false;
    useSnackBar().initializeSnackBarServerShutDown();
  }
};
</script>
<template>
  <ButtonFab
    @click="dialogFunction"
    :class="route.name === 'index' ? '' : 'mr-16 mt-n16'"
    :location="route.name === 'index' ? 'center center' : 'bottom right'"
  >
    <template v-slot:default>
      <RobotAnimation
        v-if="!useDialogStore().dialogChat"
        :is-big="route.name === 'index' ? true : false"
      />
    </template>
  </ButtonFab>
  <Chat :transition="route.name === 'index' ? 'fab-transition' : ''" />
</template>
