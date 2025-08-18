import {
  CfBaseComponent,
  CfComponentBaseProps,
  CfFetchById,
  CfLinkProps,
  CfRenderMode,
  CustomCssProps,
} from "@aces/types";

import { CfButtonServer } from "./server";
import { CfBannerClient } from "./client";
import { CfButtonUI } from "./ui";
import { CfButtonSkeleton } from "./skeleton";
import { CfModalUIProps } from "../cf-modal";
import { ButtonColor, ButtonVariant, IconEnum } from "@aces/ui";

export type CfButtonProps =
  | ({ render?: "server" | "client" } & CfComponentBaseProps)
  | ({ render: "ui" } & CfButtonUIProps)
  | { render: "skeleton" };

export interface CfButtonUIProps extends CfBaseComponent {
  title: string;
  link: CfLinkProps | CfModalUIProps;
  buttonStyle: ButtonStyleType;
  size?: "small" | "medium" | "large";
  rightIcon?: IconEnum;
  fullWidth?: boolean;
  fullWidthMobile?: boolean;
  customStyles?: CustomCssProps;
}

export enum ButtonStyleType {
  PrimaryOutline = "Primary Outline",
  Knockout = "Knockout",
  KnockoutOutline = "Knockout Outline",
}

export const buttonStyles: Record<
  ButtonStyleType,
  { color: ButtonColor; variant: ButtonVariant }
> = {
  [ButtonStyleType.PrimaryOutline]: { color: "primary", variant: "outlined" },
  [ButtonStyleType.Knockout]: {
    color: "secondary",
    variant: "contained",
  },
  [ButtonStyleType.KnockoutOutline]: {
    color: "secondary",
    variant: "outlined",
  },
};

export const CfButton = ({
  render = "server",
  ...props
}: CfButtonProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfButtonServer {...(props as CfFetchById)} />;
    case "client":
      return <CfBannerClient {...(props as CfFetchById)} />;
    case "ui":
      return <CfButtonUI {...(props as CfButtonUIProps)} />;
    case "skeleton":
      return <CfButtonSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
