import type { Chat } from "~/types/chat";
import type { ChatContext } from "~/types/chat-context";
import type { Loading } from "~/types/loading";
import type { Models } from "~/types/models";
import { useApiStore } from "./api";
import { useModelsStore } from "./models";

export const useChatStore = defineStore("message", () => {
  const { api } = useApiStore();
  const chat = ref<Chat[]>([]);
  const ChatContext = ref<ChatContext[]>([]);
  const context = ref<boolean>(true);
  const stream = ref<boolean>(true);
  const loading = ref<Loading>({
    state: false,
    message: "",
  });

  // This function add message to the chat
  const addMessageToChat = (
    prompt: any = "",
    image: any = null,
    model: string = "You",
    avatar: string = "/avatar.svg",
    sender: string = "Human"
  ) => {
    chat.value.push({
      avatar: avatar,
      message: prompt,
      model: model,
      sender: sender,
    });
    if (context.value && sender === "Model AI" && chat.value.length > 1) {
      ChatContext.value.push({
        role: "assistant",
        content: prompt,
      });
    } else if (context.value && sender === "Human") {
      ChatContext.value.push({
        role: "user",
        content: prompt,
        images: image,
      });
    }
  };

  // This function create an object for the request according to the context value
  const createRequest = (
    prompt: string,
    model: string,
    image: string | null,
    temperature: number = 0.7
  ) => {
    if (context.value) {
      return {
        model: model,
        messages: ChatContext.value,
        options: { temperature: temperature },
        stream: stream.value,
      };
    } else {
      return {
        model: model,
        prompt: prompt,
        images: image,
        options: { temperature: temperature },
        stream: stream.value,
      };
    }
  };

  //// Function to format the message
  const formatMessage = (message: string): string => {
    // Bold between double *
    let formattedMessage = message.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );
    // Rigth arrow instead of * preceded by a space and a line break before
    formattedMessage = formattedMessage.replace(/\n\* /g, "\n   &#10140; ");
    return formattedMessage;
  };

  //// This function initializes the chat store
  const initializeChat = (model: Models) => {
    chat.value = [];
    ChatContext.value = [];
    if (model) {
      // Add first message with the selected model
      addMessageToChat(
        "Hello, I'm " +
          model.name.charAt(0).toUpperCase() +
          model.name.slice(1) +
          ", how can I help you?",
        null,
        model.name,
        model.avatar,
        "Model AI"
      );
      // Load the model in server
      useModelsStore().loadModelInServer();
      // Request if model is available for vision
      useModelsStore().visionlAvailableInModel();
    } else {
      addMessageToChat(
        "Choose your first model from the list or a specific one, just click on « ⁝ » and then « Add model »",
        null,
        "Support",
        "/support.svg",
        "Bot"
      );
    }
  };

  //// This function reads the response from the stream
  const readStreamResponse = async (value: any) => {
    loading.value.state = false;
    // Adding each chunk of the answer according to the context value
    if (context.value) {
      chat.value[chat.value.length - 1].message += value.message.content;
    } else {
      chat.value[chat.value.length - 1].message += value.response;
    }
    // Format the message before adding it to the chat
    chat.value[chat.value.length - 1].message = formatMessage(
      chat.value[chat.value.length - 1].message
    );

    // If the context is activated in settings, added model response
    if (context.value) {
      ChatContext.value[ChatContext.value.length - 1].content =
        chat.value[chat.value.length - 1].message;
    }
  };

  // This function sends a request to the AI with the user's prompt and adds the request user and response to the chat
  const requestToTheModel = async (
    userPompt: string,
    model: Models,
    userImage: string | null = null,
    temperature: number
  ) => {
    loading.value.state = true;
    loading.value.message =
      "The " +
      model.name.charAt(0).toUpperCase() +
      model.name.slice(1) +
      " model is thinking";
    let imageTemp = null;
    // Request with image or not
    if (userImage) {
      imageTemp = [userImage];
    }
    const userPromptTrim = userPompt.trim();
    // Add user's message to the chat
    addMessageToChat(userPromptTrim, imageTemp);
    // Prepare request
    const request = createRequest(
      userPromptTrim,
      model.name,
      userImage,
      temperature
    );
    // Conditions stream active or not
    if (stream.value) {
      // Prepare assistant's message to the chat
      addMessageToChat(
        "",
        null,
        useModelsStore().model.name,
        useModelsStore().model.avatar,
        "Model AI"
      );
      // Request the model with the stream enabled
      await api.post(
        context.value ? "/api/chat" : "/api/generate",
        request,
        readStreamResponse
      );
    } else {
      // If the stream is disabled in the settings
      const response = (await api.post(
        context.value ? "/api/chat" : "/api/generate",
        request
      )) as any;
      // Add AI's response to the chat
      addMessageToChat(
        context.value ? response.message.content : response.response,
        null,
        model.name,
        model.avatar,
        "Model AI"
      );
    }
    loading.value.state = false;
    loading.value.message = "";
  };

  return {
    addMessageToChat,
    requestToTheModel,
    initializeChat,
    chat,
    context,
    loading,
    stream,
  };
});
