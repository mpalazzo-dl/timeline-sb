"use server";

import { CfRichTextSectionWrapperProps } from ".";
import { CfRichTextSectionUI } from "./ui";
import { fetchRichTextSectionData } from "./services";
import { CfRichTextSectionSkeleton } from "./skeleton";

export const CfRichTextSectionServer = async ({
  id,
  preview,
  lang,
  nested,
  smallPadding,
}: CfRichTextSectionWrapperProps) => {
  let data;

  try {
    data = await fetchRichTextSectionData(id, preview);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfRichTextSectionSkeleton />;
  }

  if (!data) {
    return <CfRichTextSectionSkeleton />;
  }

  return (
    <CfRichTextSectionUI
      internalTitle={data.internalTitle}
      alignment={data.alignment}
      containerWidth={data.containerWidth}
      cfComponentSpacing={data.componentSpacing}
      backgroundColor={data.backgroundColor}
      bodyCopy={data.bodyCopy}
      border={data.border}
      __typename={data.__typename}
      nested={nested}
      smallPadding={smallPadding}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
