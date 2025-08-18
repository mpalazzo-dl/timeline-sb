import {
  CfAlignment,
  CfBaseComponent,
  CfComponentBaseProps,
  CfFetchById,
  CfImageProps,
  CfRenderMode,
  CfRichText,
} from "@aces/types";

import { CfBannerServer } from "./server";
import { CfBannerClient } from "./client";
import { CfBannerUI } from "./ui";
import { CfBannerSkeleton } from "./skeleton";
import { CfButtonUIProps } from "@aces/base";

export type CfBannerProps =
  | ({ render?: "server" | "client" } & CfComponentBaseProps)
  | ({ render: "ui" } & CfBannerUIProps)
  | { render: "skeleton" };

export interface CfBannerUIProps extends CfBaseComponent {
  headline?: string;
  bodyCopy?: CfRichText;
  buttonsCollection?: {
    items: CfButtonUIProps[];
  };
  media: CfImageProps | null;
  mediaAlignment: CfAlignment;
  theme: string;
}

export const CfBanner = ({
  render = "server",
  ...props
}: CfBannerProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfBannerServer {...(props as CfFetchById)} />;
    case "client":
      return <CfBannerClient {...(props as CfFetchById)} />;
    case "ui":
      return <CfBannerUI {...(props as CfBannerUIProps)} />;
    case "skeleton":
      return <CfBannerSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
