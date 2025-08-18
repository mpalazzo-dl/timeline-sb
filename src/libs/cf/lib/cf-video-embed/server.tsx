"use server";

import { CfVideoEmbedWrapperProps } from ".";
import { CfVideoEmbedUI } from "./ui";
import { fetchVideoEmbedData } from "./services";
import { CfVideoEmbedSkeleton } from "./skeleton";

export const CfVideoEmbedServer = async ({
  id,
  preview,
  lang,
  nested,
}: CfVideoEmbedWrapperProps) => {
  let data;

  try {
    data = await fetchVideoEmbedData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfVideoEmbedSkeleton />;
  }

  if (!data) {
    return <CfVideoEmbedSkeleton />;
  }

  return (
    <CfVideoEmbedUI
      internalTitle={data.internalTitle}
      embedCode={data.embedCode}
      nested={nested}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
