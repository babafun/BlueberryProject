declare var process: NodeJS.Process;
declare var __dirname: string;
declare var __filename: string;
declare var global: NodeJS.Global;

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }

  interface ProcessEnv {
    [key: string]: string | undefined;
  }

  interface Global {
    [key: string]: any;
  }
}