import React from "react";
import NextLink from "next/link";

import { CfLinkTypes, RouteDirectory, SpecialtyPages } from "@aces/types";

import { BaseLinkUIProps } from ".";

const LinkInheritStyles = {
  fontSize: "inherit",
  color: "inherit",
  textDecoration: "inherit",
};

export const BaseLink = ({
  linkType,
  pageLink,
  customLink,
  target,
  className,
  style,
  children,
  lang,
  onMouseEnter,
  onMouseLeave,
}: BaseLinkUIProps) => {
  if (
    linkType === CfLinkTypes.PageLink &&
    pageLink &&
    pageLink.__typename === "Page"
  ) {
    if (pageLink.specialtyPage) {
      if (pageLink.specialtyPage === SpecialtyPages.Homepage) {
        return (
          <NextLink
            href={RouteDirectory.Homepage}
            hrefLang={lang}
            target={target}
            className={className}
            style={{ ...LinkInheritStyles, ...style }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {children}
          </NextLink>
        );
      }
      if (pageLink.specialtyPage === SpecialtyPages.Articles) {
        return (
          <NextLink
            href={RouteDirectory.Articles}
            hrefLang={lang}
            target={target}
            className={className}
            style={{ ...LinkInheritStyles, ...style }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {children}
          </NextLink>
        );
      }
    }

    return (
      <NextLink
        href={`/${pageLink.parentPage ? `${pageLink.parentPage.slug}/` : ""}${
          pageLink.slug
        }`}
        hrefLang={lang}
        target={target}
        className={className}
        style={{ ...LinkInheritStyles, ...style }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </NextLink>
    );
  }

  if (
    linkType === CfLinkTypes.PageLink &&
    pageLink &&
    pageLink.__typename === "Article"
  ) {
    return (
      <NextLink
        href={`${RouteDirectory.Articles}/${pageLink.slug}`}
        hrefLang={lang}
        target={target}
        className={className}
        style={{ ...LinkInheritStyles, ...style }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </NextLink>
    );
  }

  if (
    linkType === CfLinkTypes.PageLink &&
    pageLink &&
    pageLink.__typename === "PdfDocument"
  ) {
    return (
      <NextLink
        href={`${RouteDirectory.PDF}/${pageLink.slug}`}
        hrefLang={lang}
        target={target}
        className={className}
        style={{ ...LinkInheritStyles, ...style }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </NextLink>
    );
  }

  if (linkType === CfLinkTypes.CustomLink && customLink) {
    return (
      <NextLink
        href={customLink}
        hrefLang={lang}
        target={target}
        className={className}
        style={{ ...LinkInheritStyles, ...style }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </NextLink>
    );
  }

  return (
    <NextLink
      href="#"
      hrefLang={lang}
      target={target}
      className={className}
      style={{ ...LinkInheritStyles, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </NextLink>
  );
};

export const CfLinkUI = ({
  linkType,
  pageLink,
  customLink,
  target,
  className,
  style,
  children,
  lang,
  onMouseEnter,
  onMouseLeave,
}: BaseLinkUIProps) => {
  return (
    <BaseLink
      linkType={linkType}
      pageLink={pageLink}
      customLink={customLink}
      target={target}
      className={className}
      style={style}
      lang={lang}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </BaseLink>
  );
};
