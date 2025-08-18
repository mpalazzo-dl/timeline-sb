"use server";

import type { CfFetchById } from "@aces/types";

import { fetchBannerData } from "./services";
import { CfBannerSkeleton } from "./skeleton";
import { CfBannerUI } from "./ui";

export const CfBannerServer = async ({ id, preview, lang }: CfFetchById) => {
  let data;

  try {
    data = await fetchBannerData(id, preview);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfBannerSkeleton />;
  }

  if (!data) {
    return <CfBannerSkeleton />;
  }

  return (
    <CfBannerUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      bodyCopy={data.bodyCopy}
      buttonsCollection={data.buttonsCollection}
      theme={data.theme}
      media={data.media}
      mediaAlignment={data.mediaAlignment}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
