import {
  CfBaseComponent,
  CfComponentBaseProps,
  CfFetchById,
  CfImageProps,
  CfRenderMode,
} from "@aces/types";

import { CfHeroBannerServer } from "./server";
import { CfHeroBannerClient } from "./client";
import { CfHeroBannerUI } from "./ui";
import { CfHeroBannerSkeleton } from "./skeleton";
import { CfButtonUIProps } from "@aces/base";

export type CfHeroBannerProps =
  | ({ render?: "server" | "client" } & CfComponentBaseProps)
  | ({ render: "ui" } & CfHeroBannerUIProps)
  | { render: "skeleton" };

export interface CfHeroBannerUIProps extends CfBaseComponent {
  headline?: string;
  subhead?: string;
  buttonsCollection?: {
    items: CfButtonUIProps[];
  };
  image: CfImageProps;
  fullOverlay: boolean;
  slim: boolean;
}

export const CfHeroBanner = ({
  render = "server",
  ...props
}: CfHeroBannerProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfHeroBannerServer {...(props as CfFetchById)} />;
    case "client":
      return <CfHeroBannerClient {...(props as CfFetchById)} />;
    case "ui":
      return <CfHeroBannerUI {...(props as CfHeroBannerUIProps)} />;
    case "skeleton":
      return <CfHeroBannerSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
