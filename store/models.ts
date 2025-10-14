import type { Models } from "~/types/models";
import { useApiStore } from "./api";
import { useChatStore } from "./chat";
import { useDialogStore } from "./dialog";

export const useModelsStore = defineStore("models", () => {
  const { api } = useApiStore();
  const downloadedPercentageModel = ref<number>(NaN);
  const model = ref<Models>({
    name: "",
    rawName: "",
    avatar: "",
    vision: false,
  });
  const models = ref<Models[]>([]);

  //// This function initializes the models store and sets the first model as the current model
  const initializeModels = async () => {
    // Send request for a list of avalaible models
    let requestApi: any = await api.get("/api/tags");
    let count = 0;

    // Parse the response
    models.value = Array.isArray(requestApi.models)
      ? requestApi.models.map((item: any) => {
          const rawName = item.name || item.model || "";
          const parts = rawName.split(":");
          // If the model name contains a latest version, we use the first part as the name else the both
          const name =
            parts.length > 1 && parts[1].trim() === "latest"
              ? parts[0]
              : rawName;
          // Assigns avatar images from 0 to 5
          const avatar = "avatar_" + count + ".svg";
          if (count === 5) {
            count = 0;
          } else {
            count += 1;
          }
          return {
            name,
            rawName: rawName,
            avatar: avatar,
          };
        })
      : [];
    model.value = models.value[0];
    useChatStore().initializeChat(model.value);
  };

  //// This function load in the server the current model
  const loadModelInServer = () => {
    const requestLoadModel = { model: model.value.name };
    // Send request to load in the server the current model, not stream, null for callback, not loading
    api.post("/api/generate", requestLoadModel);
  };

  //// This function add or remove a model from the server Ollama
  const manageModels = async (action: string, name: string) => {
    // Prepare request
    const requestLoadModel = { name: name };
    // Condition add or remove model
    if (action === "Add model" || action === "Add a specific model") {
      useApiStore().loading.message = "Please wait while downloading";
      // The callaback function readResponse is called when the stream starts
      await api.post("/api/pull", requestLoadModel, downloadProgress);
    } else if (action === "Remove model") {
      useApiStore().loading.message = "Please wait while deleting";
      await api.del("/api/delete", requestLoadModel);
      await initializeModels();
      useDialogStore().dialogManage = false;
      useApiStore().loading.state = false;
    }
  };

  // This function reads the response from the stream
  const downloadProgress = async (value: any) => {
    if (value.completed && value.total) {
      // Calculate the completed download progress in percentage
      downloadedPercentageModel.value = Math.round(
        (value.completed / value.total) * 100
      );
    }
    if (value.status === "success") {
      initializeModels();
      useDialogStore().dialogManage = false;
      useApiStore().loading.state = false;
      downloadedPercentageModel.value = NaN;
    }
  };

  //// This function checks if the vision mode is available in the current model
  const visionlAvailableInModel = async () => {
    const requestVisionAvailable = { model: model.value.name };
    // Send request to show model information and check if vision mode is available in the current model, false stream, null for callback, false loading
    const requestVisionModel = (await api.post(
      "/api/show",
      requestVisionAvailable
    )) as any;
    if (requestVisionModel.capabilities[1] === "vision") {
      model.value.vision = true;
    }
  };

  return {
    downloadedPercentageModel,
    model,
    models,
    initializeModels,
    loadModelInServer,
    manageModels,
    visionlAvailableInModel,
  };
});
