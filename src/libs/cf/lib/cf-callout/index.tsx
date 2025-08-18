import {
  CfBaseComponent,
  CfComponentBaseProps,
  CfFetchById,
  CfImageProps,
  CfRenderMode,
  CfRichText,
} from "@aces/types";

import { CfCalloutServer } from "./server";
import { CfCalloutClient } from "./client";
import { CfCalloutUI } from "./ui";
import { CfCalloutSkeleton } from "./skeleton";
import { CfButtonUIProps } from "@aces/base";

export type CfCalloutProps =
  | ({ render?: "server" | "client" } & CfComponentBaseProps)
  | ({ render: "ui" } & CfCalloutUIProps)
  | { render: "skeleton" };

export interface CfCalloutUIProps extends CfBaseComponent {
  headline?: string;
  bodyCopy?: CfRichText;
  tags?: string[];
  buttonsCollection?: {
    items: CfButtonUIProps[];
  };
  media?: CfImageProps;
}

export const CfCallout = ({
  render = "server",
  ...props
}: CfCalloutProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfCalloutServer {...(props as CfFetchById)} />;
    case "client":
      return <CfCalloutClient {...(props as CfFetchById)} />;
    case "ui":
      return <CfCalloutUI {...(props as CfCalloutUIProps)} />;
    case "skeleton":
      return <CfCalloutSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
