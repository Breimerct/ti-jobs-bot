declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'prod' | 'test';
      PORT: string;
      BOT_TOKEN: string;
      CHANNEL_ID: string;
      CHANNEL_URL: string;
      MONGO_URI: string;
    }
  }
  