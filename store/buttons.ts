export const useButtonsStore = defineStore("buttons", () => {
  const buttonsManage = ref([
    {
      title: "Add model",
      color: "success",
      class: "text-success",
      icon: "mdi-database-plus-outline",
    },
    {
      title: "Remove model",
      color: "error",
      class: "text-error",
      icon: "mdi-database-remove-outline",
    },
    {
      title: "Settings",
      color: "warning",
      class: "text-warning",
      icon: "mdi-database-cog-outline",
    },
  ]);

  const buttonsSocialMedia = ref([
    {
      icon: "fa:fa-brands fa-github",
      href: "https://github.com/Nice-7TN",
    },
    {
      icon: "fa:fa-solid fa-at",
      href: "mailto:nice7tn@email.com?subject=Contact Nice7-TN&body=Hi, don't hesitate to contact me at this address :)",
    },
    {
      icon: "fa:fa-brands fa-paypal",
      href: "https://www.paypal.com/donate/?hosted_button_id=F8HFRZ7ZX3GP6",
    },
    {
      icon: "fa:fa-brands fa-x-twitter",
      href: "https://x.com/Nice7Tn",
    },
  ]);

  const buttonsSpeedDial = ref([
    { icon: "mdi-forum-outline", color: "success", action: "message" },
    { icon: "mdi-image-search-outline", color: "info", action: "picture" },
    { icon: "mdi-microphone-message", color: "warning", action: "audio" },
    { icon: "mdi-close-circle-outline", color: "error", action: "close" },
  ]);

  return {
    buttonsManage,
    buttonsSocialMedia,
    buttonsSpeedDial,
  };
});
