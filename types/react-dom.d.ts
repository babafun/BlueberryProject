declare module 'react-dom' {
  import { ReactElement } from 'react';

  export function render(
    element: ReactElement,
    container: Element | DocumentFragment,
    callback?: () => void
  ): void;

  export function createPortal(
    children: ReactNode,
    container: Element,
    key?: null | string
  ): ReactPortal;

  export namespace createRoot {
    function createRoot(container: Element | DocumentFragment): Root;
  }

  interface Root {
    render(children: ReactNode): void;
  }
}

declare module 'https://cdn.skypack.dev/react-dom@17.0.2/client' {
  export * from 'react-dom/client';
  export { default } from 'react-dom/client';

  export function createRoot(rootElement: HTMLElement) {
    throw new Error('Function not implemented.');
  }
}