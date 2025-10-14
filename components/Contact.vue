<script setup lang="ts">
// Imports
import ButtonSubmit from "~/components/ButtonSubmit.vue";

// Variables
const dialog = ref(false);
const message = ref("");
const title = "Contact us";

// Methods
const sendEmail = () => {
  window.open(
    "mailto:nice7tn@gmail.com?subject=Contact us&body=" + message.value
  );
  message.value = "";
  dialog.value = false;
};
</script>
<template>
  <Button text="Contact" class="text-white mt-6" @click="dialog = true" />
  <Dialog max-width="500" :dialog="dialog">
    <template v-slot:content>
      <Card :title="title" @close="dialog = false">
        <template v-slot:cardText>
          <div class="text-medium-emphasis mb-4">
            If you would like to report a bug, an improvement or simply a
            message of support, this page is here for that &#128522;
          </div>

          <div class="mb-2">Message</div>
          <TextArea
            v-model="message"
            rows="2"
            :counter="300"
            placeholder="Write your message here"
          />

          <div class="text-overline mb-2">💎 Tips</div>

          <div class="text-medium-emphasis mb-1">
            To participate or encourage my work you can make a donation by
            following the link below &#128079;
          </div>

          <Button
            class="ml-n4"
            color="primary-lighten-1"
            text="Make a donation"
            :variant="'plain'"
            target="_blank"
            href="https://www.paypal.com/donate/?hosted_button_id=F8HFRZ7ZX3GP6"
          />
        </template>
        <template v-slot:cardAction>
          <ButtonCancel @click="dialog = false" />
          <ButtonSubmit @click="sendEmail" />
        </template>
      </Card>
    </template>
  </Dialog>
</template>
