// / <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // 他の環境変数もここに追加できます
  }

interface ImportMeta { // eslint-disable-line
  readonly env: ImportMetaEnv;
}
