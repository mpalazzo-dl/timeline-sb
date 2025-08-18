import React, { CSSProperties } from "react";
import NextLink from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";

import { CustomCssProps } from "@aces/types";
import { Box } from "@aces/ui";

export interface LinkProps
  extends Pick<
    MuiLinkProps,
    "color" | "variant" | "underline" | "aria-label" | "target" | "rel"
  > {
  href: string;
  passHref?: boolean;
  stretch?: boolean;
  endIcon?: React.ReactNode;
  linkComponent?: React.ElementType;
  style?: CustomCssProps;
  children: React.ReactNode;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void;
  onMouseLeave?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      target,
      stretch,
      color = "inherit",
      variant = "body1",
      underline = "none",
      linkComponent = MuiLink,
      endIcon,
      style,
      children,
      rel,
      onMouseEnter,
      onMouseLeave,
    },
    ref,
  ) => {
    const LinkComponent = linkComponent;

    return (
      <NextLink
        href={href}
        passHref={true}
        legacyBehavior={true}
        target={target}
      >
        <LinkComponent
          ref={ref}
          rel={rel}
          href={href}
          color={color}
          variant={variant}
          underline={underline}
          target={target}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            position: stretch ? "initial" : "relative",
            textDecoration: underline,
            ...style,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <span style={{ position: "absolute", inset: "0", zIndex: 1 }} />
          {children}
          {endIcon && (
            <Box
              style={{
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {endIcon}
            </Box>
          )}
        </LinkComponent>
      </NextLink>
    );
  },
);
Link.displayName = "Link";

export const LinkWrapper = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, passHref, children, style }, ref) => {
    return (
      <NextLink
        href={href}
        passHref={passHref}
        ref={ref}
        style={style as CSSProperties}
      >
        {children}
      </NextLink>
    );
  },
);
LinkWrapper.displayName = "LinkWrapper";
