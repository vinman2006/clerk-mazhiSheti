import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  preview: {
    buckets: {
      "mazhi-sheti-storage": { access: "public_read" },
    },
  },
});
