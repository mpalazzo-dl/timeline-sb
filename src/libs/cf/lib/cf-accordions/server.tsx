"use server";

import { CfAccordionsUI } from "./ui";
import { fetchAccordionsData } from "./services";
import { CfAccordionsSkeleton } from "./skeleton";
import { CfFetchByIdNested } from "@aces/types";

export const CfAccordionsServer = async ({
  id,
  preview,
  lang,
  nested,
}: CfFetchByIdNested) => {
  let data;

  try {
    data = await fetchAccordionsData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfAccordionsSkeleton />;
  }

  if (!data) {
    return <CfAccordionsSkeleton />;
  }

  return (
    <CfAccordionsUI
      internalTitle={data.internalTitle}
      hideOnDesktop={data.hideOnDesktop}
      defaultOpen={data.defaultOpen}
      accordionsCollection={data.accordionsCollection}
      __typename={data.__typename}
      nested={nested}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
