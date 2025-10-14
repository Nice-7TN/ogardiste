<script setup lang="ts">
// Imports
import { useButtonsStore } from "~/store/buttons";
import { useChatStore } from "~/store/chat";
import { useModelsStore } from "~/store/models";
import { useApiStore } from "~/store/api";
import { useDisplay } from "vuetify";
import { useDialogStore } from "~/store/dialog";

// Props
const transition = defineModel("transition", { default: "fab-transition" });

// Store
const chatStore = useChatStore();
const modelsStore = useModelsStore();
const apiStore = useApiStore();

// Variables
const buttonsManage = useButtonsStore().buttonsManage;
const fileInput = ref();
const image = ref<File | File[] | undefined>(undefined);
const isDragging = ref(false);
const prompt = ref<string>("");
const temperature = ref<number>(0.8);
const title = ref("Select your model:");
const dialogType = ref("Add model");

// Methods
// Ask AI with a text message
const requestToTheModel = async (userRequest: string) => {
  prompt.value = "";
  fileInput.value.value = "";
  let imageBase64 = null;
  // If a picture is provided, convert it to base64
  if (image.value) {
    imageBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      // Remove the base64 prefix
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(image.value as Blob);
    });
    image.value = undefined;
  }
  // Request to AI
  await chatStore.requestToTheModel(
    userRequest,
    modelsStore.model,
    imageBase64,
    temperature.value
  );
};

const onDragOver = (event: DragEvent) => {
  // Shows the overlay only if hovered with an image file
  if (event.dataTransfer?.types.includes("Files")) {
    isDragging.value = true;
  }
};

// Handle drag leave
const onDragLeave = () => {
  isDragging.value = false;
};

// Handle image upload via drag and drop
const uploadImage = (dropFiles: DragEvent) => {
  isDragging.value = false;
  if (modelsStore.model.vision) {
    const files = dropFiles.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        image.value = file;
      }
    }
  }
};

onMounted(() => {});

// Watchers
watch(
  () => modelsStore.model,
  async () => {
    // Initialize chat with new model
    if (useDialogStore().dialogChat) {
      chatStore.initializeChat(modelsStore.model);
    }
  }
);
</script>
<template>
  <Dialog
    :dialog="useDialogStore().dialogChat"
    :transition="transition"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="uploadImage"
  >
    <template v-slot:content>
      <Overlay
        v-if="isDragging && modelsStore.model.vision"
        icon="mdi-file-image-plus-outline"
        title="Drop your image"
      />
      <ManageModel
        v-model="useDialogStore().dialogManage"
        :dialogType="dialogType"
      />
      <Card
        :title="useDisplay().smAndDown.value ? '' : title"
        :input="true"
        @close="useDialogStore().dialogChat = false"
      >
        <template v-slot:cardTitleCenter>
          <ChipGroup
            v-if="!useDisplay().smAndDown.value"
            v-model="modelsStore.model"
            class="ml-3"
            :items="modelsStore.models"
            :disabled="apiStore.loading.state || !apiStore.status"
          />
          <Select
            v-else
            v-model="modelsStore.model"
            :items="modelsStore.models"
            :disabled="apiStore.loading.state || !apiStore.status"
            item-title="name"
            item-value="name"
            label="Select your model"
            variant="outlined"
            class="mb-n5 pt-2 mr-3"
            density="compact"
            return-object
            chips
          />
        </template>
        <template v-slot:cardTitleBottom>
          <Menus
            :buttons="buttonsManage"
            @click-button="
              (dialogType = $event), (useDialogStore().dialogManage = true)
            "
            :disabled="apiStore.loading.state || !apiStore.status"
        /></template>

        <template v-slot:cardText>
          <Messages
            :messages="chatStore.chat"
            :disabled="apiStore.loading.state"
            :loading="chatStore.loading"
            class="mt-2"
          />
        </template>
        <template v-slot:cardTextArea>
          <TextArea
            v-model="prompt"
            placeholder="Ask your question here"
            class="mb-n2"
            :disabled="apiStore.loading.state || !apiStore.status"
            :loading="apiStore.loading.state"
            @submit="requestToTheModel(prompt)"
          >
            <template v-slot:prepend-inner>
              <ButtonPreviewAttachment
                v-if="modelsStore.model.vision"
                v-model="image"
                @clear="(fileInput.value = ''), (image = undefined)"
                @click="fileInput.click()"
              />
            </template>
          </TextArea>
          <InputAttachement
            v-model="fileInput"
            @click-attachment="fileInput.click()"
            @change="(updateImage: File) => (image = updateImage)"
          />
        </template>
        <template v-slot:cardAction>
          <Slider
            v-model="temperature"
            :disabled="apiStore.loading.state || !apiStore.status"
          />
          <ButtonCancel @click="useDialogStore().dialogChat = false" />
          <ButtonSubmit
            :disabled="
              apiStore.loading.state || !prompt.trim() || !apiStore.status
            "
            @click="requestToTheModel(prompt)"
          />
        </template>
      </Card>
    </template>
  </Dialog>
</template>
