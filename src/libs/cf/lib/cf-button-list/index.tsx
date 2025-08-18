import {
  CfBaseComponent,
  CfComponentBaseProps,
  CfFetchById,
  CfRenderMode,
} from "@aces/types";

import { CfButtonListServer } from "./server";
import { CfButtonClient } from "./client";
import { CfButtonListingUIProps, CfButtonListUI } from "./ui";
import { CfButtonListSkeleton } from "./skeleton";
import { ButtonStyleType } from "@aces/base";

export type CfButtonListProps =
  | ({ render?: "server" | "client" } & CfComponentBaseProps)
  | ({ render: "ui" } & CfButtonListUIProps)
  | { render: "skeleton" };

export interface CfButtonListUIProps extends CfBaseComponent {
  buttonStyle: ButtonStyleType;
  buttonsCollection: {
    items: CfButtonListingUIProps[];
  };
}

export const CfButtonList = ({
  render = "server",
  ...props
}: CfButtonListProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfButtonListServer {...(props as CfFetchById)} />;
    case "client":
      return <CfButtonClient {...(props as CfFetchById)} />;
    case "ui":
      return <CfButtonListUI {...(props as CfButtonListUIProps)} />;
    case "skeleton":
      return <CfButtonListSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
