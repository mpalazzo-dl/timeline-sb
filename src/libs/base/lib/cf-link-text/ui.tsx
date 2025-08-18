"use client";

import { useState } from "react";
import { ContentfulLivePreview } from "@contentful/live-preview";

import { palette, typography } from "@aces/theme";
import { FlexBox, Icon, InlineBox } from "@aces/ui";

import { CfLink } from "../cf-link";
import { CfLinkTextUIProps } from ".";

export const CfTextLinkUI = ({
  link,
  title,
  externalLinkIcon,
  alignment,
  id,
  lang,
}: CfLinkTextUIProps) => {
  const [hover, setHover] = useState(false);
  const flexAlignment =
    alignment === "center"
      ? "center"
      : alignment === "right"
        ? "flex-end"
        : "flex-start";

  const handleHover = (hover: boolean) => {
    setHover(hover);
  };

  return (
    <CfLink
      render="ui"
      linkType={link.linkType}
      pageLink={link.pageLink}
      customLink={link.customLink}
      target={link.target}
      lang={lang}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      style={{ display: "inline-block" }}
    >
      <FlexBox
        alignItems="center"
        justifyContent={flexAlignment}
        component="span"
        style={typography.link}
        {...ContentfulLivePreview.getProps({
          entryId: id,
          fieldId: "title",
          locale: lang,
        })}
      >
        <InlineBox
          style={{
            color: hover ? typography.link.color : palette.text.primary,
            textDecoration: "underline",
          }}
        >
          {title}
        </InlineBox>
        {externalLinkIcon && (
          <Icon
            icon="OpenInNew"
            size={16}
            marginLeft={2}
            color={hover ? typography.link.color : "inherit"}
            aria-label="opens in new window"
            aria-hidden={false}
            role="img"
          />
        )}
      </FlexBox>
    </CfLink>
  );
};
