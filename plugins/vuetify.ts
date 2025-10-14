import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { mdi } from "vuetify/iconsets/mdi";
import { aliases, fa } from "vuetify/iconsets/fa";
import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import { VFileUpload } from "vuetify/labs/VFileUpload";
import { VIconBtn } from "vuetify/labs/VIconBtn";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    button: "#e1c07fff",
    surface: "#FFFFFF",
    primary: "#9575CD",
    "primary-lighten-1": "#B388FF",
    "primary-darken-1": "#6200EA",
    secondary: "#42A5F5",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VFileUpload,
      VIconBtn,
    },
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
      },
    },
    icons: {
      defaultSet: "mdi",
      sets: {
        fa,
        mdi,
      },
    },
    ssr: false,
  });
  app.vueApp.use(vuetify);
});
