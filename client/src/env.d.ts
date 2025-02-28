declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_SECRET_KEY?: string; // Optional
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};