import type { Snackbar } from "~/types/snackbar";

export const useSnackBar = defineStore("snackbar", () => {
  const snackbar = ref<Snackbar[]>([]);

  //// This function initializes the SnackBar component
  const initializeSnackBar = (
    message: string,
    color: string = "primary",
    timeout: number = 3000
  ) => {
    snackbar.value.push({
      activated: true,
      message: message,
      color: color,
      timeout: timeout,
    });
  };

  const initializeSnackBarServerShutDown = () => {
    snackbar.value.push({
      activated: true,
      message: "The server is down, please launch Ollama.",
      color: "error",
      timeout: 3000,
    });
  };

  if (snackbar.value.length > 1) {
    snackbar.value.shift;
  }
  return {
    initializeSnackBar,
    initializeSnackBarServerShutDown,
    snackbar,
  };
});
