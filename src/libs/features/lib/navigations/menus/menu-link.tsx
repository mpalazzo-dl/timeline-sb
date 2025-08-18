"use client";

import { CSSProperties, useState } from "react";

import { defaultLocale } from "@aces/i18n";
import { useMediaQuery } from "@aces/hooks";
import { CfLinkProps } from "@aces/types";
import { typography } from "@aces/theme";
import { FlexBox, Icon, Text } from "@aces/ui";
import { CfLink } from "@aces/base";

interface MenuLinkProps {
  link: CfLinkProps;
  title: string;
  hideOnDesktop: boolean;
  hideOnMobile: boolean;
  externalLinkIcon?: boolean;
  lang: string;
  fontSize?: string;
  fontFamily?: string;
  style?: CSSProperties;
  hoverEffect?: boolean;
}

export const MenuLink = ({
  link,
  title,
  hideOnDesktop,
  hideOnMobile,
  externalLinkIcon,
  lang = defaultLocale,
  fontSize,
  fontFamily,
  style,
  hoverEffect = false,
}: MenuLinkProps) => {
  const [hover, setHover] = useState(false);
  const { isSmallerThanMd, isLargerThanMd } = useMediaQuery();

  const handleHover = (hover: boolean) => {
    if (hoverEffect) {
      setHover(hover);
    }
  };

  if (isSmallerThanMd && hideOnMobile) {
    return null;
  }

  if (isLargerThanMd && hideOnDesktop) {
    return null;
  }

  return (
    <CfLink
      render="ui"
      linkType={link.linkType}
      target={link.target}
      pageLink={link.pageLink}
      customLink={link.customLink}
      lang={lang}
      style={style}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <FlexBox alignItems="center">
        <Text
          style={{
            fontSize: fontSize,
            fontFamily: fontFamily,
            transition: "color 100ms",
            color: hover ? typography.link.color : "inherit",
          }}
        >
          {title}
        </Text>
        {externalLinkIcon && (
          <Icon
            icon="OpenInNew"
            size={16}
            marginLeft={2}
            color={hover ? typography.link.color : "inherit"}
            aria-label="opens in new window"
            role="img"
            aria-hidden={false}
          />
        )}
      </FlexBox>
    </CfLink>
  );
};
