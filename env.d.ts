declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT: string;
        TOKEN_SECRET: string;
        MONGO_URI: string;
      }
    }
  }

  export {}