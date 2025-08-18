import { HubSpotFormProps, PardotFormProps } from "@aces/features";
import {
  CfBaseComponent,
  CfComponentBaseProps,
  CfFetchById,
  CfImageProps,
  CfRenderMode,
} from "@aces/types";

import { CfFormServer } from "./server";
import { CfFormClient } from "./client";
import { CfFormUI } from "./ui";
import { CfFormSkeleton } from "./skeleton";

export type CfFormProps =
  | ({ render?: "server" | "client" } & CfComponentBaseProps)
  | ({ render: "ui" } & CfFormUIProps)
  | { render: "skeleton" };

export interface CfFormUIProps extends CfBaseComponent {
  form: PardotFormProps | HubSpotFormProps;
  headline?: string;
  subhead?: string;
  media?: CfImageProps;
}

export const CfForm = ({
  render = "server",
  ...props
}: CfFormProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfFormServer {...(props as CfFetchById)} />;
    case "client":
      return <CfFormClient {...(props as CfFetchById)} />;
    case "ui":
      return <CfFormUI {...(props as CfFormUIProps)} />;
    case "skeleton":
      return <CfFormSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
