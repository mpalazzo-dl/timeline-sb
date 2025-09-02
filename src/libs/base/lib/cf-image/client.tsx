"use client";

import { useTimelineState } from "@aces/store";
import { useEffect, useState } from "react";

import {
  CfImageCoverWrapperProps,
  CfImageFillWrapperProps,
  CfImageWrapperProps,
} from ".";
import { fetchImageData } from "./services";
import { CfImageSkeleton } from "./skeleton";
import { CfImageUI, CfImageCoverUI, CfImageFillUI } from "./ui";

export const CfImageClient = ({
  id,
  preview,
  lang,
  nested,
  responsive,
  style,
}: CfImageWrapperProps) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchImageData(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

  if (!data) return <CfImageSkeleton />;
  console.log(data);

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

export const CfImageCoverClient = ({
  id,
  preview,
  lang,
  borderRadius,
  coverWidth = "100%",
  coverHeight = "380px",
  nested,
  style,
}: CfImageCoverWrapperProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchImageData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfImageSkeleton />;
  console.log(data);

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

export const CfImageFillClient = ({
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
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchImageData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfImageSkeleton />;
  console.log(data);

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
