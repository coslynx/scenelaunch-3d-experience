/// <reference types="vite/client" />

/**
 * @file src/vite-env.d.ts
 * @description Provides type safety for Vite environment variables accessed through `import.meta.env`.
 */

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string; // The title of the application
  readonly BASE_URL: string; // The base URL for the application
  readonly VITE_ENABLE_ANALYTICS?: boolean; // Whether to enable analytics (optional)
  // Add other environment variables here (e.g., VITE_API_ENDPOINT)
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}