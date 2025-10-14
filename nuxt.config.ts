import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-05-15",
  css: ["~/assets/scss/main.scss"],
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  experimental: {
    payloadExtraction: false,
    appManifest: false,
  },
  app: {
    head: {
      title: "O-GARDISTE",
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      meta: [
        // Basic Open Graph tags
        {
          name: "description",
          content:
            "O-Gardiste is a feature-rich, user-friendly, fast and responsive client for Ollama.",
        },
        {
          property: "og:title",
          content: "O-GARDISTE",
        },
        {
          property: "og:description",
          content:
            "O-Gardiste is a feature-rich, user-friendly, fast and responsive client for Ollama.",
        },
        {
          property: "og:url",
          content: "https://o.gardiste.workers.dev",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content:
            "https://o.gardiste.workers.dev/images/desktop-screenshot-og-image.png",
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        // Twitter Card tags (often used alongside Open Graph)
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "O-GARDISTE" },
        {
          name: "twitter:description",
          content:
            "O-Gardiste is a feature-rich, user-friendly, fast and responsive client for Ollama.",
        },
        {
          name: "twitter:image",
          content:
            "https://o.gardiste.workers.dev/images/desktop-screenshot-twitter-card.png",
        },
        {
          name: "twitter:image:width",
          content: "1200",
        },
        {
          name: "twitter:image:height",
          content: "675",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "images/favicon.ico" }],
    },
  },
  pwa: {
    manifest: {
      name: "O-GARDISTE",
      short_name: "O Gardiste",
      description:
        "O-Gardiste is a feature-rich, user-friendly, fast and responsive client for Ollama.",
      start_url: "/",
      theme_color: "#6D6ACD",
      background_color: "#6D6ACD",
      display: "standalone",
      icons: [
        {
          src: "/images/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          src: "/images/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "/images/android-launchericon-48-48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: "/images/android-launchericon-72-72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/images/android-launchericon-96-96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/images/android-launchericon-144-144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/images/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "/images/android-launchericon-192-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/images/android-launchericon-512-512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/images/android-launchericon-512-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/images/apple-display.png",
          sizes: "1024x1024",
          type: "image/png",
        },
      ],
      screenshots: [
        {
          src: "/images/mobile-screenshot.png",
          type: "image/png",
          sizes: "750x1600",
          form_factor: "narrow",
          label: "Mobile View showing robot",
        },
        {
          src: "/images/mobile-screenshot-discussion.png",
          type: "image/png",
          sizes: "750x1600",
          form_factor: "narrow",
          label: "Mobile View showing the discussion with model",
        },
        {
          src: "/images/mobile-screenshot-settings.png",
          type: "image/png",
          sizes: "750x1600",
          form_factor: "narrow",
          label: "Mobile View showing adding a model",
        },
        {
          src: "/images/mobile-screenshot-add-model.png",
          type: "image/png",
          sizes: "750x1600",
          form_factor: "narrow",
          label: "Mobile View showing the settings",
        },
        {
          src: "/images/desktop-screenshot.png",
          sizes: "1920x1080",
          type: "image/png",
          form_factor: "wide",
          label: "Desktop View showing robot",
        },
        {
          src: "/images/desktop-screenshot-discussion.png",
          sizes: "1920x1080",
          type: "image/png",
          form_factor: "wide",
          label: "Desktop View showing the discussion with model",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: [],
      globIgnores: ["/_payload.json", "_nuxt/builds//.json", "/node_modules//"],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
