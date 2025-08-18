import { CfListItemWrapperProps } from ".";
import { CfListItemUI } from "./ui";
import { fetchListItemData } from "./services";
import { CfListItemSkeleton } from "./skeleton";

export const CfListItemServer = async ({
  id,
  preview,
  lang,
}: CfListItemWrapperProps) => {
  let data;

  try {
    data = await fetchListItemData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfListItemSkeleton />;
  }

  if (!data) {
    return <CfListItemSkeleton />;
  }

  return (
    <CfListItemUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      bodyCopy={data.bodyCopy}
      listCopy={data.listCopy}
      columns={data.columns}
      media={data.media}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
