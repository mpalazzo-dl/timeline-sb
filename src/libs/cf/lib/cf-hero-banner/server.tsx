import type { CfFetchById } from "@aces/types";

import { fetchHeroBanner } from "./services";
import { CfHeroBannerUI } from "./ui";
import { CfHeroBannerSkeleton } from "./skeleton";

export const CfHeroBannerServer = async ({
  id,
  preview,
  lang,
}: CfFetchById) => {
  let data;

  try {
    data = await fetchHeroBanner(id, preview);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfHeroBannerSkeleton />;
  }

  if (!data) {
    return <CfHeroBannerSkeleton />;
  }

  return (
    <CfHeroBannerUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      subhead={data.subhead}
      buttonsCollection={data.buttonsCollection}
      image={data.image}
      fullOverlay={data.fullOverlay}
      slim={data.slim}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
