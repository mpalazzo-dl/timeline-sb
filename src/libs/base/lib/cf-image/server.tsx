"use server";

import {
  CfImageCoverWrapperProps,
  CfImageFillWrapperProps,
  CfImageWrapperProps,
} from ".";
import { CfImageUI, CfImageCoverUI, CfImageFillUI } from "./ui";
import { fetchImageData } from "./services";
import { CfImageSkeleton } from "./skeleton";

export const CfImageServer = async ({
  id,
  preview,
  lang,
  nested,
  responsive,
  style,
}: CfImageWrapperProps) => {
  let data;

  try {
    data = await fetchImageData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfImageSkeleton />;
  }

  if (!data) {
    return <CfImageSkeleton />;
  }

  return (
    <CfImageUI
      internalTitle={data.internalTitle}
      image={data.image}
      mobileImage={data.mobileImage}
      altText={data.altText}
      nativeImageSize={data.nativeImageSize}
      __typename={data.__typename}
      nested={nested}
      responsive={responsive}
      style={style}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};

export const CfImageCoverServer = async ({
  id,
  preview,
  lang,
  borderRadius,
  coverWidth = "100%",
  coverHeight = "380px",
  nested,
  style,
}: CfImageCoverWrapperProps) => {
  let data;

  try {
    data = await fetchImageData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfImageSkeleton />;
  }

  if (!data) {
    return <CfImageSkeleton />;
  }

  return (
    <CfImageCoverUI
      internalTitle={data.internalTitle}
      image={data.image}
      mobileImage={data.mobileImage}
      borderRadius={borderRadius}
      coverWidth={coverWidth}
      coverHeight={coverHeight}
      nested={nested}
      style={style}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};

export const CfImageFillServer = async ({
  id,
  preview,
  lang,
  borderRadius,
  containerMaxWidth = "100%",
  containerHeight = "100%",
  containerMinHeight,
  containerMaxHeight,
  style,
}: CfImageFillWrapperProps) => {
  let data;

  try {
    data = await fetchImageData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfImageSkeleton />;
  }

  if (!data) {
    return <CfImageSkeleton />;
  }

  return (
    <CfImageFillUI
      internalTitle={data.internalTitle}
      image={data.image}
      containerMaxWidth={containerMaxWidth}
      containerHeight={containerHeight}
      containerMinHeight={containerMinHeight}
      containerMaxHeight={containerMaxHeight}
      borderRadius={borderRadius}
      style={style}
      __typename={data.__typename}
      id={data?.sys?.id || ""}
      lang={lang}
      preview={preview}
    />
  );
};
