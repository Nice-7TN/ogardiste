import type { Models } from "~/types/models";

export const useListModelsStore = defineStore("listModels", () => {
  const listModels = ref<Models[]>([
    { name: "deepcoder:1.5b", rawName: "deepcoder:1.5b" },
    { name: "deepcoder:14b", rawName: "deepcoder:latest" },
    { name: "deepseek-r1:1.5b", rawName: "deepseek-r1:1.5b" },
    { name: "deepseek-r1:7b", rawName: "deepseek-r1:7b" },
    { name: "deepseek-r1:8b", rawName: "deepseek-r1:latest" },
    { name: "deepseek-r1:14b", rawName: "deepseek-r1:14b" },
    { name: "deepseek-r1:32b", rawName: "deepseek-r1:32b" },
    { name: "deepseek-r1:70b", rawName: "deepseek-r1:70b" },
    { name: "deepseek-r1:671b", rawName: "deepseek-r1:671b" },
    { name: "gemma3:270m", rawName: "gemma3:270m" },
    { name: "gemma3:1b", rawName: "gemma3:1b" },
    { name: "gemma3:4b", rawName: "gemma3:latest" },
    { name: "gemma3:12b", rawName: "gemma3:12b" },
    { name: "gemma3:27b", rawName: "gemma3:27b" },
    { name: "gemma3n:e2b", rawName: "gemma3n:e2b" },
    { name: "gemma3n:e4b", rawName: "gemma3n:e4b" },
    { name: "gpt-oss:20b", rawName: "gpt-oss:latest" },
    { name: "gpt-oss:120b", rawName: "gpt-oss:120b" },
    { name: "llama3.2:1b", rawName: "llama3.2:1b" },
    { name: "llama3.2:3b", rawName: "llama3.2:latest" },
    { name: "llama3.2-vision:11b", rawName: "llama3.2-vision:latest" },
    { name: "llama3.2-vision:90b", rawName: "llama3.2-vision:90b" },
    { name: "llama4:16x17b", rawName: "llama4:latest" },
    { name: "llama4:128x17b", rawName: "llama4:128x17b" },
    { name: "mistral:7b", rawName: "mistral:latest" },
    { name: "mistral-nemo:12b", rawName: "mistral-nemo:latest" },
    { name: "mistral-small3.2:24b", rawName: "mistral-small3.2:latest" },
    { name: "phi4:14b", rawName: "phi4:latest" },
    { name: "phi4-mini:3.8b", rawName: "phi4-mini:latest" },
    { name: "phi4-mini-reasoning:3.8b", rawName: "phi4-mini-reasoning:latest" },
    { name: "phi4-reasoning:14b", rawName: "phi4-reasoning:latest" },
    { name: "qwen3:0.6b", rawName: "qwen3:0.6b" },
    { name: "qwen3:1.7b", rawName: "qwen3:1.7b" },
    { name: "qwen3:4b", rawName: "qwen3:4b" },
    { name: "qwen3:8b", rawName: "qwen3:latest" },
    { name: "qwen3:14b", rawName: "qwen3:14b" },
    { name: "qwen3:30b", rawName: "qwen3:30b" },
    { name: "qwen3:32b", rawName: "qwen3:32b" },
    { name: "qwen3:235b", rawName: "qwen3:235b" },
  ]);

  return {
    listModels,
  };
});
