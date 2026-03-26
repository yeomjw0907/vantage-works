import type { CSSProperties } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": {
        url?: string;
        loading?: string;
        style?: CSSProperties;
        className?: string;
        [key: string]: unknown;
      };
    }
  }
}
