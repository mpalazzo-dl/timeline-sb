"use client";

import { ContentfulLivePreview } from "@contentful/live-preview";

import { useUIState } from "@aces/store";
import { CfBaseComponent, CfLinkProps, CustomCssProps } from "@aces/types";
import { generateId } from "@aces/utils";
import { palette } from "@aces/theme";
import { Button, Icon, IconEnum } from "@aces/ui";

import { CfLink } from "../cf-link";
import { CfModal, CfModalUIProps } from "../cf-modal";
import { buttonStyles, CfButtonUIProps } from "./index";

export interface CfButtonRenderProps extends CfBaseComponent {
  title: string;
  style: {
    color: any;
    variant: any;
  };
  size?: "small" | "medium" | "large";
  rightIcon?: IconEnum;
  fullWidth?: boolean;
  fullWidthMobile?: boolean;
  customStyles?: CustomCssProps;
  onClick?: () => void;
}

export const CfButtonUI = ({
  internalTitle,
  title,
  link,
  buttonStyle,
  size,
  rightIcon,
  fullWidth,
  fullWidthMobile,
  customStyles,
  __typename,
  id,
  lang,
  preview,
}: CfButtonUIProps) => {
  const style = buttonStyles[buttonStyle];

  const { setActiveModal } = useUIState();

  const isCfLink = (link: any): link is CfLinkProps => {
    return "linkType" in link;
  };

  const isCfModal = (link: any): link is CfModalUIProps => {
    return "internalTitle" in link;
  };

  if (!Button || !style) return null;

  if (isCfLink(link)) {
    return (
      <CfLink
        render="ui"
        linkType={link.linkType}
        pageLink={link.pageLink}
        customLink={link.customLink}
        target={link.target}
        lang={lang}
        style={{
          width: fullWidth ? "100%" : "auto",
        }}
      >
        <CfButtonRender
          internalTitle={internalTitle}
          title={title}
          style={style}
          size={size}
          rightIcon={rightIcon}
          fullWidth={fullWidth}
          fullWidthMobile={fullWidthMobile}
          customStyles={customStyles}
          __typename={__typename}
          id={id}
          lang={lang}
          preview={preview}
        />
      </CfLink>
    );
  }

  if (isCfModal(link)) {
    return (
      <>
        <CfButtonRender
          internalTitle={internalTitle}
          title={title}
          style={style}
          size={size}
          rightIcon={rightIcon}
          fullWidth={fullWidth}
          fullWidthMobile={fullWidthMobile}
          customStyles={customStyles}
          onClick={() => setActiveModal(generateId(link.internalTitle))}
          __typename={__typename}
          id={id}
          lang={lang}
          preview={preview}
        />
        <CfModal id={link?.sys?.id || ""} lang={lang} preview={preview} />
      </>
    );
  }
};

const CfButtonRender = ({
  internalTitle,
  title,
  style,
  size,
  rightIcon,
  fullWidth,
  fullWidthMobile,
  customStyles,
  onClick,
  __typename,
  id,
  lang,
}: CfButtonRenderProps) => {
  return (
    <Button
      id={generateId(internalTitle)}
      data-component={__typename}
      color={style.color}
      variant={style.variant}
      size={size}
      fullWidth={fullWidth}
      fullWidthMobile={fullWidthMobile}
      onClick={onClick}
      endIcon={
        rightIcon && (
          <Icon
            icon={rightIcon as IconEnum}
            color={palette.primary.main}
            marginLeft={4}
            style={
              rightIcon === "ArrowForward"
                ? { transform: "rotate(-45deg)" }
                : {}
            }
          />
        )
      }
      style={customStyles}
      {...ContentfulLivePreview.getProps({
        entryId: id,
        fieldId: "title",
        locale: lang,
      })}
    >
      {title}
    </Button>
  );
};
