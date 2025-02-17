// Minimal React type definitions
declare module "react" {
  // Basic types for React nodes and elements
  export type ReactText = string | number;
  export type ReactChild = ReactElement | ReactText;
  export type ReactFragment = {} | Iterable<ReactNode>;
  export type ReactNode = ReactChild | ReactFragment | boolean | null | undefined;

  export interface ReactElement<P = any> {
    type: any;
    props: P;
    key: string | number | null;
  }

  // Define FunctionComponent and alias as FC
  export interface FunctionComponent<P = {}> {
    (props: P & { children?: ReactNode }): ReactElement<any> | null;
    displayName?: string;
  }
  export { FunctionComponent as FC };

  // Define additional exports as needed
  export const Fragment: any;
  export const StrictMode: any;
}

// Extend the global JSX namespace with React's Element type
declare namespace JSX {
  interface IntrinsicElements {
    div: any;
    span: any;
    // Add more intrinsic elements as needed
  }
  // Use the React.ReactElement type from our module
  type Element = import("react").ReactElement;
}

declare module "https://cdn.skypack.dev/react" {
  export type ReactText = string | number;
  export type ReactChild = ReactElement | ReactText;
  export type ReactFragment = {} | Iterable<ReactNode>;
  export type ReactNode = ReactChild | ReactFragment | boolean | null | undefined;

  export interface ReactElement<P = any> {
    type: any;
    props: P;
    key: string | number | null;
  }

  export interface FC<P = {}> {
    (props: P & { children?: ReactNode }): ReactElement<any> | null;
  }

  export const Fragment: any;
  export const StrictMode: any;
}