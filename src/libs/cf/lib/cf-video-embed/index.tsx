import type {
  CfFetchById,
  Nested,
  CfBaseComponent,
  CfRenderMode,
} from "@aces/types";

import { CfVideoEmbedServer } from "./server";
import { CfVideoEmbedClient } from "./client";
import { CfVideoEmbedUI } from "./ui";
import { CfVideoEmbedSkeleton } from "./skeleton";

export type CfVideoEmbedProps =
  | ({ render?: "server" | "client" } & CfVideoEmbedWrapperProps)
  | ({ render: "ui" } & CfVideoEmbedUIProps)
  | { render: "skeleton" };

export interface CfVideoEmbedWrapperProps extends CfFetchById, Nested {}

export interface CfVideoEmbedUIProps extends CfBaseComponent, Nested {
  embedCode: string;
}

export const CfVideoEmbed = ({
  render = "server",
  ...props
}: CfVideoEmbedProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfVideoEmbedServer {...(props as CfVideoEmbedWrapperProps)} />;
    case "client":
      return <CfVideoEmbedClient {...(props as CfVideoEmbedWrapperProps)} />;
    case "ui":
      return <CfVideoEmbedUI {...(props as CfVideoEmbedUIProps)} />;
    case "skeleton":
      return <CfVideoEmbedSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
