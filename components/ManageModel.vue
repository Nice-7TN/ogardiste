<script setup lang="ts">
// Imports
import { useApiStore } from "~/store/api";
import { useChatStore } from "~/store/chat";
import { useListModelsStore } from "~/store/listModels";
import { useModelsStore } from "~/store/models";
import { useDialogStore } from "~/store/dialog";

// Props
const dialogType = defineModel<string>("dialogType", { default: "Add model" });

// Store
const listModelsStore = useListModelsStore();
const modelsStore = useModelsStore();

// Variables
const context = ref(false);
const selectModelToManage = ref("");
const serverUrl = ref(useApiStore().url);
const stream = ref(false);

// Methods
const manageModels = async (action: string) => {
  if (action === "Settings") {
    if (useChatStore().context !== context.value) {
      useChatStore().context = context.value;
      useChatStore().initializeChat(modelsStore.model);
    }
    useChatStore().stream = stream.value;
    useApiStore().url = serverUrl.value;
    useDialogStore().dialogManage = false;
  } else {
    await modelsStore.manageModels(action, selectModelToManage.value);
    selectModelToManage.value = "";
  }
};

// Computed
const modelsCanBeInstalled = computed(() => {
  let modelsAvailable = listModelsStore.listModels.filter(function (
    modelAvailable
  ) {
    return !modelsStore.models.find(function (modelInstalled) {
      return modelAvailable.rawName === modelInstalled.rawName;
    });
  });
  return modelsAvailable;
});

watch(
  () => useDialogStore().dialogManage,
  () => {
    if (dialogType.value === "Settings") {
      context.value = useChatStore().context;
      stream.value = useChatStore().stream;
      serverUrl.value = useApiStore().url;
    }
  }
);
</script>

<template>
  <Dialog
    :dialog="useDialogStore().dialogManage"
    max-height="400"
    width="330"
    scrollable
  >
    <template v-slot:content>
      <Overlay
        v-if="useApiStore().loading.state"
        :title="useApiStore().loading.message"
        :loading="true"
        :value="useModelsStore().downloadedPercentageModel"
      />
      <Card
        @close="
          (useDialogStore().dialogManage = false), (selectModelToManage = '')
        "
        :disabled="useApiStore().loading.state"
        :card-text-style="'max-height: 300px'"
        :title="
          dialogType === 'Add model'
            ? 'Select a model to add'
            : dialogType === 'Remove model'
            ? 'Select a model to delete'
            : dialogType === 'Add a specific model'
            ? 'Add a specific model'
            : 'Settings'
        "
      >
        <template v-slot:cardText>
          <v-radio-group
            v-model="selectModelToManage"
            hide-details
            :disabled="!useApiStore().status"
          >
            <v-radio
              v-if="dialogType === 'Add model'"
              v-for="(model, i) in modelsCanBeInstalled"
              :label="model.name"
              :value="model.rawName"
            ></v-radio>
            <Button
              v-if="dialogType === 'Add model'"
              icon="mdi-plus"
              density="compact"
              variant="outlined"
              color="primary"
              class="mt-2"
              block
              location="bottom center"
              @click="dialogType = 'Add a specific model'"
            />
            <v-text-field
              v-if="dialogType === 'Add a specific model'"
              v-model="selectModelToManage"
              density="compact"
              label="Model name"
              placeholder="Model name"
              prepend-inner-icon="mdi-database-plus-outline"
              variant="outlined"
            />
            <v-radio
              v-if="dialogType === 'Remove model'"
              v-for="(model, i) in modelsStore.models"
              :label="model.name"
              :value="model.rawName"
            ></v-radio>
          </v-radio-group>
          <v-text-field
            v-if="dialogType === 'Settings'"
            v-model="serverUrl"
            density="compact"
            label="Server adress"
            placeholder="Server address"
            prepend-inner-icon="mdi-server-network-outline"
            variant="outlined"
          />
          <v-switch
            v-if="dialogType === 'Settings'"
            v-model="context"
            v-tooltip:top="
              'Activate this parameter for multi-turn conversations and maintains conversation history (context).'
            "
            label="Context (conversation history)"
            color="primary"
            inset
          />
          <v-switch
            v-if="dialogType === 'Settings'"
            v-model="stream"
            label="Stream"
            color="primary"
            inset
          />
        </template>
        <template v-slot:cardAction>
          <ButtonCancel
            @click="
              dialogType === 'Add a specific model'
                ? (dialogType = 'Add model')
                : (useDialogStore().dialogManage = false),
                (selectModelToManage = '')
            "
          />
          <ButtonSubmit
            :text="
              dialogType === 'Add model' ||
              dialogType === 'Add a specific model'
                ? 'Download'
                : dialogType === 'Remove model'
                ? 'Delete'
                : 'Save'
            "
            :disabled="dialogType === 'Settings' ? false : !selectModelToManage"
            @click="manageModels(dialogType)"
          />
        </template>
      </Card> </template
  ></Dialog>
</template>
