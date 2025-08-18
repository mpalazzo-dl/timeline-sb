"use server";

import { CfLinkWrapperProps } from ".";
import { CfLinkUI } from "./ui";
import { fetchLinkData } from "./services";
import { CfLinkSkeleton } from "./skeleton";

export const CfLinkServer = async ({
  id,
  preview,
  lang,
  children,
}: CfLinkWrapperProps) => {
  let data;

  try {
    data = await fetchLinkData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfLinkSkeleton />;
  }

  if (!data) {
    return <CfLinkSkeleton />;
  }

  return (
    <CfLinkUI
      linkType={data.linkType}
      pageLink={data.pageLink}
      customLink={data.customLink}
      target={data.target}
      lang={lang}
    >
      {children}
    </CfLinkUI>
  );
};
