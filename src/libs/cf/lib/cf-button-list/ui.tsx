"use client";

import { ContentfulLivePreview } from "@contentful/live-preview";

import { useUIState } from "@aces/store";
import { CfBaseComponent, CfLinkProps } from "@aces/types";
import { generateId } from "@aces/utils";
import { palette } from "@aces/theme";
import {
  Button,
  ButtonColor,
  ButtonVariant,
  FlexBox,
  Icon,
  IconEnum,
} from "@aces/ui";

import { buttonStyles, CfLink, CfModal, CfModalUIProps } from "@aces/base";
import { CfButtonListUIProps } from ".";

export interface CfButtonListingUIProps extends CfBaseComponent {
  rightIcon?: IconEnum;
  title: string;
  link: CfLinkProps | CfModalUIProps;
  style: {
    color: ButtonColor;
    variant: ButtonVariant;
  };
}

export const CfButtonListingUI = ({
  lang,
  preview,
  internalTitle,
  __typename,
  rightIcon,
  title,
  link,
  style,
}: CfButtonListingUIProps) => {
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
        target={link.target}
        pageLink={link.pageLink}
        customLink={link.customLink}
      >
        <Button
          key={generateId(internalTitle)}
          id={generateId(internalTitle)}
          data-component={__typename}
          color={style.color}
          variant={style.variant}
          style={{
            justifyContent: "space-between",
            border: "none",
            borderRadius: 0,
            width: "100%",
          }}
          endIcon={
            rightIcon && (
              <Icon
                icon={rightIcon as IconEnum}
                color={palette.primary.main}
                marginLeft={4}
                style={{ transform: "rotate(-45deg)" }}
              />
            )
          }
        >
          {title}
        </Button>
      </CfLink>
    );
  }

  if (isCfModal(link)) {
    console.log(link);
    return (
      <Button
        key={generateId(internalTitle)}
        id={generateId(internalTitle)}
        data-component={__typename}
        color={style.color}
        variant={style.variant}
        onClick={() => setActiveModal(generateId(link.internalTitle))}
        style={{
          justifyContent: "space-between",
          border: "none",
          borderRadius: 0,
          width: "100%",
        }}
        endIcon={
          rightIcon && (
            <Icon
              icon={rightIcon as IconEnum}
              color={palette.primary.main}
              marginLeft={4}
              style={{ transform: "rotate(-45deg)" }}
            />
          )
        }
      >
        {title}
        <CfModal id={link?.sys?.id || ""} lang={lang} preview={preview} />
      </Button>
    );
  }
};

export const CfButtonListUI = ({
  internalTitle,
  buttonStyle,
  buttonsCollection,
  __typename,
  id,
  lang,
  preview,
}: CfButtonListUIProps) => {
  const style = buttonStyles[buttonStyle];

  if (!Button || !style) return null;

  const variantStyles =
    style.variant === "outlined"
      ? {
          border: "2px solid",
          borderRadius: "20px",
        }
      : {};

  const colorStyles =
    style.color === "primary"
      ? {
          borderColor: palette.primary.main,
        }
      : {};

  return (
    <FlexBox
      id={generateId(internalTitle)}
      data-component={__typename}
      style={{
        position: "relative",
        flexDirection: "column",
        overflow: "hidden",
        ...variantStyles,
        ...colorStyles,
      }}
      {...ContentfulLivePreview.getProps({
        entryId: id,
        fieldId: "buttons",
        locale: lang,
      })}
    >
      {buttonsCollection.items.map((button) => {
        return (
          <CfButtonListingUI
            key={generateId(button.internalTitle)}
            internalTitle={button.internalTitle}
            link={button.link}
            title={button.title}
            rightIcon={button.rightIcon}
            __typename={button.__typename}
            id={button.id}
            style={style}
            lang={lang}
            preview={preview}
          />
        );
      })}
    </FlexBox>
  );
};
