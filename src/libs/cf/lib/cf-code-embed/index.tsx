import {
  CfBaseComponent,
  CfComponentBaseNestedProps,
  CfFetchById,
  CfRenderMode,
  Nested,
} from "@aces/types";

import { CfCodeEmbedServer } from "./server";
import { CfCodeEmbedClient } from "./client";
import { CfCodeEmbedUI } from "./ui";
import { CfCodeEmbedSkeleton } from "./skeleton";

export type CfCodeEmebedProps =
  | ({ render?: "server" | "client" } & CfComponentBaseNestedProps)
  | ({ render: "ui" } & CfCodeEmbedUIProps)
  | { render: "skeleton" };

export interface CfCodeEmbedUIProps extends CfBaseComponent, Nested {
  embedCode: string;
}

export const CfCodeEmbed = ({
  render = "server",
  ...props
}: CfCodeEmebedProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfCodeEmbedServer {...(props as CfFetchById)} />;
    case "client":
      return <CfCodeEmbedClient {...(props as CfFetchById)} />;
    case "ui":
      return <CfCodeEmbedUI {...(props as CfCodeEmbedUIProps)} />;
    case "skeleton":
      return <CfCodeEmbedSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
