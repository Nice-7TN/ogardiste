export const useDialogStore = defineStore("dialog", () => {
  const dialogChat = ref<boolean>(false);
  const dialogManage = ref<boolean>(false);

  return {
    dialogChat,
    dialogManage,
  };
});
