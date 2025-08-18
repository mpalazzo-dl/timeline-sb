import { ContentfulLivePreview } from "@contentful/live-preview";

import { CfBaseComponent } from "@aces/types";
import { Box, FlexBox, MenuItem } from "@aces/ui";
import { CfButton, CfButtonUIProps } from "@aces/base";

import {
  CfDropDownMenuType,
  CfMenuItemType,
  DropdownMenu,
  isCfButton,
  isCfDropDownMenu,
  isCfMenuItem,
  MenuLink,
} from "../menus";
import { headerFont, typography } from "@aces/theme";

interface MainNavigationProps extends Pick<CfBaseComponent, "id" | "lang"> {
  data: (CfMenuItemType | CfDropDownMenuType | CfButtonUIProps)[];
}

export const MainNavigation = ({ data, id, lang }: MainNavigationProps) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <FlexBox
      alignItems="center"
      {...ContentfulLivePreview.getProps({
        entryId: id,
        fieldId: "mainNavigation",
        locale: lang,
      })}
    >
      {data.map((item, index) => {
        if (!item.__typename) return null;

        switch (item.__typename) {
          case "MenuItem":
            if (isCfMenuItem(item)) {
              return (
                <MenuItem key={index} noPadding>
                  <MenuLink
                    link={item.link}
                    title={item.title}
                    hideOnDesktop={item.hideOnDesktop}
                    hideOnMobile={item.hideOnMobile}
                    externalLinkIcon={item.externalLinkIcon}
                    lang={lang}
                    fontSize={typography.subtitle2.fontSize}
                    fontFamily={headerFont.style.fontFamily}
                    style={{
                      display: "block",
                      padding: "1.5rem .25rem",
                    }}
                  />
                </MenuItem>
              );
            }
            break;
          case "DropdownMenu":
            if (isCfDropDownMenu(item)) {
              return (
                <DropdownMenu
                  key={index}
                  title={item.title}
                  menu={item.menuItemsCollection.items}
                  lang={lang}
                />
              );
            }
            break;
          case "Button":
            if (isCfButton(item)) {
              return (
                <Box key={index} marginY={2} paddingX={2}>
                  <CfButton
                    render="ui"
                    internalTitle={item.internalTitle}
                    buttonStyle={item.buttonStyle}
                    size="small"
                    title={item.title}
                    link={item.link}
                    rightIcon={item.rightIcon}
                    __typename={item.__typename}
                    id={item?.sys?.id || ""}
                    preview={item.preview}
                    lang={lang}
                  />
                </Box>
              );
            }
            break;
          default:
            return null;
        }
      })}
    </FlexBox>
  );
};
