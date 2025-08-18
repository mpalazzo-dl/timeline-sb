"use client";

import { useEffect, useState } from "react";
import { ContentfulLivePreview } from "@contentful/live-preview";

import { useMediaQuery } from "@aces/hooks";
import { CfImageProps } from "@aces/types";
import { generateId } from "@aces/utils";
import { componentSpacing } from "@aces/theme";
import { Box, Container, Image, ImageCover, ImageFill } from "@aces/ui";

import { CfImageCoverUIProps, CfImageFillUIProps } from ".";
import { CfImageSkeleton } from "./skeleton";

export const CfImageUI = ({
  internalTitle,
  image,
  mobileImage,
  altText = "",
  nativeImageSize,
  nested = false,
  responsive = true,
  maxWidth,
  maxHeight,
  style,
  __typename,
  id,
  lang,
}: CfImageProps) => {
  const [source, setSource] = useState(image);
  const { isSmallerThanMd } = useMediaQuery();

  useEffect(() => {
    if (isSmallerThanMd && mobileImage) {
      setSource(mobileImage);
    } else {
      setSource(image);
    }
  }, [image, mobileImage, isSmallerThanMd]);

  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      marginY={{
        xs: !nested ? componentSpacing.xs : 0,
        md: !nested ? componentSpacing.md : 0,
      }}
      style={{ width: !nativeImageSize && nested ? "100%" : "inherit" }}
    >
      <Container nested={nested}>
        {!source || !source.url ? (
          <CfImageSkeleton
            {...ContentfulLivePreview.getProps({
              entryId: id,
              fieldId: "image",
              locale: lang,
            })}
          />
        ) : (
          <Image
            url={source.url}
            alt={altText}
            width={source.width}
            height={source.height}
            responsive={nativeImageSize ? false : responsive}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            style={
              nativeImageSize
                ? {
                    ...style,
                    maxWidth: "100%",
                  }
                : style
            }
            {...ContentfulLivePreview.getProps({
              entryId: id,
              fieldId: "image",
              locale: lang,
            })}
          />
        )}
      </Container>
    </Box>
  );
};

export const CfImageCoverUI = ({
  internalTitle,
  image,
  mobileImage,
  altText = "",
  nested = false,
  coverWidth = "100%",
  coverHeight = "380px",
  objectFit = "cover",
  borderRadius,
  style,
  __typename,
  id,
  lang,
}: CfImageCoverUIProps) => {
  const [source, setSource] = useState(image);
  const { isSmallerThanMd } = useMediaQuery();

  useEffect(() => {
    if (isSmallerThanMd && mobileImage) {
      setSource(mobileImage);
    } else {
      setSource(image);
    }
  }, [image, mobileImage, isSmallerThanMd]);

  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      marginY={{
        xs: !nested ? componentSpacing.xs : "",
        md: !nested ? componentSpacing.md : "",
      }}
      style={{ height: coverHeight }}
    >
      <Container nested={nested} style={{ height: coverHeight }}>
        {!source || !source.url ? (
          <CfImageSkeleton
            {...ContentfulLivePreview.getProps({
              entryId: id,
              fieldId: "image",
              locale: lang,
            })}
          />
        ) : (
          <ImageCover
            url={source.url}
            alt={altText}
            width={source.width}
            height={source.height}
            coverWidth={coverWidth}
            coverHeight={coverHeight}
            objectFit={objectFit}
            borderRadius={borderRadius}
            style={style}
            {...ContentfulLivePreview.getProps({
              entryId: id,
              fieldId: "image",
              locale: lang,
            })}
          />
        )}
      </Container>
    </Box>
  );
};

export const CfImageFillUI = ({
  internalTitle,
  image,
  mobileImage,
  altText = "",
  containerMaxWidth = "100%",
  containerHeight = "100%",
  containerMinHeight,
  containerMaxHeight,
  borderRadius,
  style,
  __typename,
  id,
  lang,
}: CfImageFillUIProps) => {
  const [source, setSource] = useState(image);
  const { isSmallerThanMd } = useMediaQuery();

  useEffect(() => {
    if (isSmallerThanMd && mobileImage) {
      setSource(mobileImage);
    } else {
      setSource(image);
    }
  }, [image, mobileImage, isSmallerThanMd]);

  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      borderRadius={borderRadius}
      style={{
        position: "absolute",
        width: "100%",
        overflow: "hidden",
        maxWidth: containerMaxWidth,
        height: containerHeight,
        minHeight: containerMinHeight,
        maxHeight: containerMaxHeight,
      }}
      {...ContentfulLivePreview.getProps({
        entryId: id,
        fieldId: "image",
        locale: lang,
      })}
    >
      {!source || !source.url ? (
        <CfImageSkeleton />
      ) : (
        <ImageFill
          url={source.url}
          alt={altText}
          width={source.width}
          height={source.height}
          containerMaxWidth={containerMaxWidth}
          containerHeight={containerHeight}
          containerMinHeight={containerMinHeight}
          containerMaxHeight={containerMaxHeight}
          style={style}
        />
      )}
    </Box>
  );
};
