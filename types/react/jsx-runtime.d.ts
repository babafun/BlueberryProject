declare module 'react/jsx-runtime' {
  export interface JSXElementConstructor<P> {
    (props: P): any;
  }

  export interface JSXElement {
    // minimal stub; adjust as needed
  }

  // Minimal implementations for the new JSX transform functions
  export function jsx(type: any, props: any, key?: string | number): any;
  export function jsxs(type: any, props: any, key?: string | number): any;
  export function jsxDEV(type: any, props: any, key: string | number | undefined, isStaticChildren: boolean, source: any): any;
}