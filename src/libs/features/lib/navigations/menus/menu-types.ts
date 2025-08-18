import { CfButtonUIProps } from "@aces/base";
import { CfLinkProps } from "@aces/types";

export type CfMenuItemType = {
  internalTitle: string;
  title: string;
  link: CfLinkProps;
  externalLinkIcon?: boolean;
  hideOnDesktop: boolean;
  hideOnMobile: boolean;
  __typename: string;
};

export type CfDropDownMenuType = {
  internalTitle: string;
  title: string;
  menuItemsCollection: {
    items: CfMenuItemType[];
  };
  __typename: string;
};

export const isCfMenuItem = (item: any): item is CfMenuItemType => {
  return "link" in item;
};

export const isCfDropDownMenu = (item: any): item is CfDropDownMenuType => {
  return "menuItemsCollection" in item;
};

export const isCfButton = (item: any): item is CfButtonUIProps => {
  return "buttonStyle" in item;
};
