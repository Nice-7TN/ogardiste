<script setup lang="ts"></script>
<template>
  <v-app class="app">
    <Header />
    <Animation />
    <Ai />
    <v-main>
      <slot />
    </v-main>
    <Footer />
    <SnackBar />
  </v-app>
</template>
