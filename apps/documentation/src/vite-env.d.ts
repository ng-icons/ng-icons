/// <reference types="vite/client" />

declare module 'virtual:icon-stats' {
  /** Emitted by the icon-data Vite plugin from the workspace's packages. */
  export const iconStats: {
    iconCount: number;
    setCount: number;
    version: string;
  };
}
