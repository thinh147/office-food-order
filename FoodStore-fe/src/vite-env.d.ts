/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALIAS: string;
  readonly VITE_API: string;
  readonly VITE_FACEBOOK_APPID: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}