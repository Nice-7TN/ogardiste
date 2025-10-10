import type { Loading } from "~/types/loading";
import { useChatStore } from "./chat";
import { useModelsStore } from "./models";
import { useSnackBar } from "./snackbar";

// Define the store for API operations
export const useApiStore = defineStore("api", () => {
  const errorCounter = ref<number>(0);
  const loading = ref<Loading>({
    state: false,
    message: "",
  });
  const status = ref<boolean>(true);
  const timeout = ref<any>();
  // Base URL for API requests
  const url = "http://localhost:11434";

  // Create a fetch instance with custom options
  const api = $fetch.create<ReadableStream>({
    baseURL: url,
    onRequest: (object) => {
      // Handle global request events
    },
    onResponse: (object) => {
      // Handle global response events
      if (
        object.response.status === 200 &&
        object.response._data === "Ollama is running"
      ) {
        statusApi(true);
      } else if (object.response.status !== 200) {
        statusApi(false, object.response.status, object.response.statusText);
      }
    },
    onRequestError: (object) => {
      // Handle global error requests
      loading.value.state = false;
      // If the error message is "Failed to fetch", assume server is down and check status
      if (object.error.message === "Failed to fetch") {
        statusApi(false);
      }
    },
  });

  //// GET request function
  const get = async (url: string) => {
    try {
      return await api(url, { method: "GET" });
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  };

  //// POST request function with optional callback for streaming responses
  const post = async (url: string, body: any, callback: any = null) => {
    try {
      loading.value.state = true;
      if (callback) {
        loading.value.state = true;
        const response = await api(url, {
          method: "POST",
          body,
          responseType: "stream",
        });
        readStreamResponse(response, callback);
      } else {
        return await api(url, { method: "POST", body });
      }
    } catch (error) {
      loading.value.state = false;
      console.error("POST request error:", error);
    } finally {
      if (!callback) {
        loading.value.state = false;
      }
    }
  };

  //// PUT request function
  const put = async (url: string, body: any) => {
    try {
      return await api(url, { method: "PUT", body });
    } catch (error) {
      console.error("PUT request error:", error);
      throw error;
    }
  };

  //// DELETE request function
  const del = async (url: string, body: any) => {
    try {
      loading.value.state = true;
      return await api(url, { method: "DELETE", body });
    } catch (error) {
      loading.value.state = false;
      console.error("DELETE request error:", error);
    }
  };

  //// This function checks the server status
  const statusApi = async (
    state: boolean,
    statusError?: number,
    statusText?: string
  ) => {
    if (state) {
      status.value = state;
      errorCounter.value = 0;
      useModelsStore().initializeModels();
    } else if (statusError || errorCounter.value === 0) {
      // If first request or with error status, create an error message in the chat and snackbar
      useChatStore().addMessageToChat(
        statusError
          ? "Sorry, an error " +
              statusError +
              " has been encountered: " +
              statusText
          : "Sorry, an error has been encountered: the server is down or unreachable",
        null,
        "Support",
        "/support.svg",
        "Bot"
      );
      useSnackBar().initializeSnackBar(
        statusError
          ? "Sorry, an error " +
              statusError +
              " has been encountered: " +
              statusText
          : "Sorry, an error has been encountered: the server is down or unreachable",
        "error"
      );
      errorCounter.value++;
    } else {
      status.value = state;
      errorCounter.value++;
      clearTimeout(timeout.value);
      timeout.value = setTimeout(() => {
        requestStatusApi();
      }, 4000);
    }
  };

  //// Function to request the server's current status
  const requestStatusApi = async () => {
    // Send a GET request to check if the server is running
    get("");
  };

  //// Function to read and process stream responses
  const readStreamResponse = async (
    response: ReadableStream,
    callback: any
  ) => {
    try {
      // Create a new ReadableStream from the response with TextDecoderStream to get the data as text
      const reader = response.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done || value === undefined) break;
        try {
          // Constructing object described by the string in JSON format
          const valueParse = JSON.parse(value);
          if (valueParse.error) {
            loading.value.state = false;
            useSnackBar().initializeSnackBar(valueParse.error, "error");
          }
          callback(valueParse);
          if (valueParse.status === "success" || valueParse.done === true) {
            loading.value.state = false;
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
      requestStatusApi();
    }
  };

  // Return API methods, loading state, status and server url
  return {
    api: { get, post, put, del },
    loading,
    requestStatusApi,
    status,
    url,
  };
});
