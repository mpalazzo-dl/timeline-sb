import {
  CfBaseComponent,
  CfImageProps,
  CfMediaAlignment,
  CfMediaSize,
  CfRichText,
  CfFetchById,
  Nested,
  WithMock,
  CfRenderMode,
} from "@aces/types";

import { CfButtonUIProps } from "@aces/base";
import { CfVideoEmbedUIProps } from "../cf-video-embed";
import { CfButtonListUIProps } from "../cf-button-list";

import { CfLockupServer } from "./server";
import { CfLockupClient } from "./client";
import { CfLockupUI } from "./ui";
import { CfLockupSkeleton } from "./skeleton";

export type CfLockupProps =
  | ({ render?: "server" | "client" } & CfLockupWrapperProps)
  | ({ render: "ui" } & CfLockupUIProps)
  | { render: "skeleton" };

export interface CfLockupWrapperProps extends CfFetchById, Nested {}
export interface CfLockupUIProps extends CfBaseComponent, Nested, WithMock {
  headline?: string;
  subhead?: string;
  bodyCopy?: CfRichText;
  buttonsCollection?: {
    items: CfButtonUIProps[] | CfButtonListUIProps[];
  };
  media: CfImageProps | CfVideoEmbedUIProps;
  mediaSize: CfMediaSize;
  mediaAlignment: CfMediaAlignment;
  mediaBleed?: boolean;
}

export const CfLockup = ({
  render = "server",
  ...props
}: CfLockupProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfLockupServer {...(props as CfLockupWrapperProps)} />;
    case "client":
      return <CfLockupClient {...(props as CfLockupWrapperProps)} />;
    case "ui":
      return <CfLockupUI {...(props as CfLockupUIProps)} />;
    case "skeleton":
      return <CfLockupSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
