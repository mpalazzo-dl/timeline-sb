import {
  CfBaseComponent,
  CfComponentBaseProps,
  CfFetchById,
  CfImageProps,
  CfRenderMode,
  CfRichText,
} from "@aces/types";

import { CfFeatureHighlightServer } from "./server";
import { CfFeatureHighlightClient } from "./client";
import { CfFeatureHighlightUI } from "./ui";
import { CfFeatureHighlightSkeleton } from "./skeleton";

export type CfFeatureHighlightProps =
  | ({ render?: "server" | "client" } & CfComponentBaseProps)
  | ({ render: "ui" } & CfFeatureHighlightUIProps)
  | { render: "skeleton" };

export interface CfFeatureHighlightUIProps extends CfBaseComponent {
  headline: string;
  bodyCopy: CfRichText;
  media: CfImageProps;
}

export const CfFeatureHighlight = ({
  render = "server",
  ...props
}: CfFeatureHighlightProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfFeatureHighlightServer {...(props as CfFetchById)} />;
    case "client":
      return <CfFeatureHighlightClient {...(props as CfFetchById)} />;
    case "ui":
      return <CfFeatureHighlightUI {...(props as CfFeatureHighlightUIProps)} />;
    case "skeleton":
      return <CfFeatureHighlightSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
