// Declare global variables
declare var process: NodeJS.Process;
declare var __dirname: string;
declare var __filename: string;
declare var global: NodeJS.Global;

// Declare global interfaces
interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __INITIAL_STATE__?: any;
    ga: (command: string, ...fields: any[]) => void;
    dataLayer: any[];
}

// Declare global types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Dictionary<T> = { [key: string]: T };
type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

// Declare global modules
declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default value;
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.less" {
    const classes: { [key: string]: string };
    export default classes;
}

// Declare global functions
declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
declare function require(moduleName: string): any;
declare function setTimeout(handler: (...args: any[]) => void, timeout: number): NodeJS.Timeout;
declare function clearTimeout(timeoutId: NodeJS.Timeout): void;
declare function setInterval(handler: (...args: any[]) => void, timeout: number): NodeJS.Timeout;
declare function clearInterval(intervalId: NodeJS.Timeout): void;

// Extend existing global types
interface Array<T> {
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U | U[]): U[];
}

interface ReadonlyArray<T> {
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U | U[]): U[];
}

declare namespace JSX {
  // This is a simplified version. In a real project, use @types/react.
  type Element = any;
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}