declare module 'react' {
  import * as CSS from 'csstype';
  import { DOMAttributes, ReactNode, ReactElement, ReactPortal, ReactFragment, ReactText } from 'react';

  export = React;
  export as namespace React;

  namespace React {
    interface Attributes {
      key?: Key;
    }

    interface ClassAttributes<T> extends Attributes {
      ref?: LegacyRef<T>;
    }

    interface HTMLAttributes<T> extends DOMAttributes<T> {
      className?: string;
      style?: CSS.Properties;
    }

    interface SVGAttributes<T> extends HTMLAttributes<T> {
      className?: string;
      style?: CSS.Properties;
    }

    interface IntrinsicElements {
      div: HTMLAttributes<HTMLDivElement>;
      span: HTMLAttributes<HTMLSpanElement>;
      svg: SVGAttributes<SVGSVGElement>;
      // Add more elements as needed
    }

    type Key = string | number;
    type LegacyRef<T> = string | ((instance: T | null) => void) | RefObject<T> | null;
    type RefObject<T> = { readonly current: T | null };
  }
}

declare module 'https://cdn.skypack.dev/react' {
  export * from 'react';
  export { default } from 'react';
}