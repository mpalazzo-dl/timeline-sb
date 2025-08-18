import type { CfFetchById } from "@aces/types";

import { CfCalloutUI } from "./ui";
import { fetchCalloutData } from "./services";
import { CfCalloutSkeleton } from "./skeleton";

export interface CfCalloutServerProps extends CfFetchById {}

export const CfCalloutServer = async ({
  id,
  preview,
  lang,
}: CfCalloutServerProps) => {
  let data;

  try {
    data = await fetchCalloutData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfCalloutSkeleton />;
  }

  if (!data) {
    return <CfCalloutSkeleton />;
  }

  return (
    <CfCalloutUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      bodyCopy={data.bodyCopy}
      tags={data.tags}
      buttonsCollection={data.buttonsCollection}
      media={data.media}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
