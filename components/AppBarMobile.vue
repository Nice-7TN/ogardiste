<script setup lang="ts">
// Variables
const drawer = ref(false);
</script>
<template>
  <v-card>
    <v-app-bar color="transparent" flat class="mt-1">
      <v-app-bar-nav-icon
        color="white"
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-white font-weight-bold"
        >O GARDISTE</v-toolbar-title
      >
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    >
      <v-card class="mx-auto pa-2" color="transparent" flat>
        <v-list>
          <NuxtLink to="/" class="nuxt-link"
            ><v-list-item
              variant="tonal"
              rounded="pill"
              color="teal"
              base-color="black"
              :active="useRoute().name === 'index'"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-home" color="white"></v-icon>
              </template>

              <v-list-item-title class="text-white">Home</v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <NuxtLink to="/started" class="nuxt-link">
            <v-list-item
              variant="tonal"
              rounded="pill"
              class="mt-2"
              color="teal"
              base-color="black"
              :active="useRoute().name === 'started'"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-flag-checkered" color="white"></v-icon>
              </template>

              <v-list-item-title class="text-white">Started</v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <NuxtLink to="/about" class="nuxt-link"
            ><v-list-item
              variant="tonal"
              rounded="pill"
              class="mt-2"
              color="teal"
              base-color="black"
              :active="useRoute().name === 'about'"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-information-outline" color="white"></v-icon>
              </template>

              <v-list-item-title class="text-white">About</v-list-item-title>
            </v-list-item>
          </NuxtLink>
          <NuxtLink to="/contact" class="nuxt-link">
            <v-list-item
              variant="tonal"
              rounded="pill"
              class="mt-2"
              color="teal"
              base-color="black"
              :active="useRoute().name === 'contact'"
            >
              <template v-slot:prepend>
                <v-icon
                  icon="mdi-card-account-mail-outline"
                  color="white"
                ></v-icon>
              </template>

              <v-list-item-title class="text-white">Contact</v-list-item-title>
            </v-list-item>
          </NuxtLink>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </v-card>
</template>
