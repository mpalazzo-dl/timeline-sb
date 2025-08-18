import { CfLinkTextWrapperProps } from ".";
import { CfTextLinkUI } from "./ui";
import { fetchLinkTextData } from "./services";
import { CfLinkTextSkeleton } from "./skeleton";

export const CfLinkTextServer = async ({
  id,
  preview,
  lang,
  alignment,
}: CfLinkTextWrapperProps) => {
  let data;

  try {
    data = await fetchLinkTextData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfLinkTextSkeleton />;
  }

  if (!data) {
    return <CfLinkTextSkeleton />;
  }

  return (
    <CfTextLinkUI
      internalTitle={data.internalTitle}
      link={data.link}
      title={data.title}
      externalLinkIcon={data.externalLinkIcon}
      __typename={data.__typename}
      alignment={alignment}
      id={data.sys.id}
      lang={lang}
      preview={preview}
    />
  );
};
